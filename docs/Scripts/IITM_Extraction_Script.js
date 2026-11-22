(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const norm = s => (s || '').replace(/\s+/g, ' ').trim();

  function toFileSafe(s) {
    return (s || '').replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim().replace(/\s+/g, '_');
  }
  const guessedName = toFileSafe(norm(document.title)) || 'iitm-questions';
  let filenameInput = prompt('Filename for the downloaded HTML (without .html):', guessedName);
  if (filenameInput === null) filenameInput = guessedName;
  let outputFilename = toFileSafe(filenameInput) || 'iitm-questions';
  if (!/\.html?$/i.test(outputFilename)) outputFilename += '.html';

  const seen = new Set();
  const collected = [];
  const stats = { texExtracted: 0, mathFallback: 0, imagesInlined: 0, imagesFailed: 0 };
  const globalDefsMap = new Map();

  function qHeader() {
    const candidates = [...document.querySelectorAll('h1,h2,h3,h4,p,div,span')]
      .filter(el => /Question\s+\d+\s*\/\s*\d+/i.test(norm(el.textContent)));
    if (!candidates.length) return null;
    return candidates.reduce((best, el) => el.textContent.length < best.textContent.length ? el : best);
  }

  function qRoot() {
    const h = qHeader();
    if (!h) return null;

    const panelGroup = document.querySelector('app-resizable-panel-group');
    if (panelGroup && panelGroup.contains(h)) return panelGroup;

    let el = h.closest('section, article, main, form, div');
    while (el && el.parentElement && norm(el.innerText).length < 250) {
      el = el.parentElement;
    }
    return el;
  }

  function nextButton() {
    return [...document.querySelectorAll('button, a, div[role="button"], span[role="button"]')]
      .find(el => /next/i.test(norm(el.textContent)));
  }

  function absolutizeUrl(url) {
    try {
      return new URL(url, location.href).href;
    } catch {
      return url || '';
    }
  }

  async function waitForQuestionContentReady(timeout = 8000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const root = qRoot();
      if (root) {
        const optsList = root.querySelector('[role="radiogroup"], ul.choices, fieldset.choices-fieldset ul');
        const optionsOk = !optsList || !!optsList.querySelector('li, label, [role="radio"], input');
        const imgsOk = [...root.querySelectorAll('img')].every(img =>
          !!(img.getAttribute('src') || img.currentSrc || img.getAttribute('data-src')));
        if (optionsOk && imgsOk) {
          await sleep(250);
          return true;
        }
      }
      await sleep(150);
    }
    console.warn('[extract] Timed out waiting for question content to fully render — options or images on this question may be incomplete.');
    return false;
  }

  async function waitForMathJaxIdle() {
    try {
      if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
        await Promise.race([window.MathJax.startup.promise, sleep(3000)]);
      }
    } catch {}
  }

  async function waitForNextQuestion(prevNum, timeout = 8000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const h = qHeader();
      const m = h && norm(h.textContent).match(/Question\s+(\d+)\s*\/\s*(\d+)/i);
      if (m && Number(m[1]) !== prevNum) return true;
      await sleep(150);
    }
    return false;
  }

  function extractTexSource(el) {
    const ann = el.querySelector('annotation[encoding="application/x-tex"]');
    if (!ann) return null;
    const tex = ann.textContent.trim();
    if (!tex) return null;
    const display = !!(el.closest('mjx-container[display="true"]') || el.closest('.katex-display'));
    return { tex, display };
  }

  function wrapTex(tex, display) {
    return ` ${display ? '\\[' : '\\('}${tex}${display ? '\\]' : '\\)'} `;
  }

  function replaceMathNodes(clone) {
    clone.querySelectorAll('script[type^="math/tex"]').forEach(node => {
      const tex = node.textContent.trim();
      if (!tex) return;
      const display = /mode\s*=\s*display/i.test(node.getAttribute('type') || '');
      const rendered = node.nextElementSibling;
      if (rendered && /MathJax/i.test(rendered.className || '')) rendered.remove();
      node.replaceWith(document.createTextNode(wrapTex(tex, display)));
      stats.texExtracted++;
    });

    clone.querySelectorAll('mjx-container').forEach(node => {
      const res = extractTexSource(node);
      if (res) {
        node.replaceWith(document.createTextNode(wrapTex(res.tex, res.display)));
        stats.texExtracted++;
      } else {
        stats.mathFallback++;
        console.warn('[extract] No TeX source found for a <mjx-container>; kept rendered markup as a fallback.');
      }
    });

    clone.querySelectorAll('.katex').forEach(node => {
      if (node.closest('mjx-container')) return;
      const res = extractTexSource(node);
      const outer = node.closest('.katex-display') || node;
      if (res) {
        outer.replaceWith(document.createTextNode(wrapTex(res.tex, res.display)));
        stats.texExtracted++;
      } else {
        stats.mathFallback++;
        console.warn('[extract] No TeX source found for a .katex node; kept rendered markup as a fallback.');
      }
    });
  }

  function collectGlobalSvgDefsNow() {
    document.querySelectorAll('mjx-container defs > *').forEach(node => {
      const id = node.id || `d${globalDefsMap.size}`;
      if (!globalDefsMap.has(id)) globalDefsMap.set(id, node.outerHTML);
    });
  }

  function collectMathStylesheetLinks() {
    return [...document.querySelectorAll('link[rel="stylesheet"]')]
      .filter(l => /katex/i.test(l.href))
      .map(l => `<link rel="stylesheet" href="${absolutizeUrl(l.href)}">`)
      .join('\n  ');
  }

  function resolveRealSrc(img) {
    const lazy = img.getAttribute('data-src') || img.getAttribute('data-original') ||
                 img.getAttribute('data-lazy-src') || img.getAttribute('data-lazy') || '';
    const current = img.currentSrc || img.getAttribute('src') || '';
    const isBlankPlaceholder = !current || /^data:image\/gif;base64,R0lGOD/i.test(current);
    return (isBlankPlaceholder && lazy) ? lazy : (current || lazy);
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  }

  function fetchWithTimeout(url, ms) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { credentials: 'include', signal: ctrl.signal }).finally(() => clearTimeout(t));
  }

  async function urlToDataUrl(absUrl) {
    if (!absUrl) return null;
    if (absUrl.startsWith('data:')) return absUrl;

    try {
      const res = await fetchWithTimeout(absUrl, 8000);
      if (res.ok) {
        const blob = await res.blob();
        const looksLikeImage = blob && blob.size > 0 && (!blob.type || blob.type.startsWith('image/'));
        if (looksLikeImage) return await blobToDataUrl(blob);
      }
    } catch (e) {}

    try {
      return await new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            if (!canvas.width || !canvas.height) return reject(new Error('empty image'));
            canvas.getContext('2d').drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
          } catch (err) { reject(err); }
        };
        img.onerror = () => reject(new Error('image load failed'));
        img.src = absUrl;
      });
    } catch (e) {}

    return null;
  }

  async function inlineImages(clone) {
    const imgs = [...clone.querySelectorAll('img')];
    for (const img of imgs) {
      const abs = absolutizeUrl(resolveRealSrc(img));
      ['data-src', 'data-original', 'data-lazy-src', 'data-lazy', 'srcset', 'sizes'].forEach(a => img.removeAttribute(a));
      img.setAttribute('loading', 'eager');
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.display = 'block';
      img.style.margin = '12px 0';

      if (!abs) { stats.imagesFailed++; continue; }

      const dataUrl = await urlToDataUrl(abs);
      if (dataUrl) {
        img.setAttribute('src', dataUrl);
        stats.imagesInlined++;
      } else {
        img.setAttribute('src', abs);
        stats.imagesFailed++;
        console.warn('[extract] Could not embed image bytes, kept remote link:', abs);
      }
    }
  }

  async function cleanupQuestionClone(clone) {
    replaceMathNodes(clone);

    clone.querySelectorAll('script, noscript, iframe, canvas').forEach(el => el.remove());

    clone.querySelectorAll('.shortcut-hint').forEach(el => el.remove());

    clone.querySelectorAll('legend').forEach(el => {
      const txt = norm(el.textContent);
      if (el.classList.contains('choices-legend') || /^<[a-z]/i.test(txt)) {
        el.remove();
      }
    });

    clone.querySelectorAll('button[role="radio"], button[role="checkbox"]').forEach(btn => {
      const marker = btn.querySelector('.choice-indicator');
      if (marker) marker.textContent = btn.getAttribute('role') === 'radio' ? '◯ ' : '☐ ';
      const div = document.createElement('div');
      div.className = btn.className;
      while (btn.firstChild) div.appendChild(btn.firstChild);
      btn.replaceWith(div);
    });

    clone.querySelectorAll('button, textarea, select').forEach(el => el.remove());

    clone.querySelectorAll('input').forEach(el => {
      const marker = document.createElement('span');
      const t = (el.type || '').toLowerCase();
      marker.textContent = t === 'checkbox' ? '☐ ' : t === 'radio' ? '◯ ' : '';
      el.replaceWith(marker);
    });

    clone.querySelectorAll('*').forEach(el => {
      const txt = norm(el.textContent);

      if (
        /flag for review/i.test(txt) ||
        /^previous$/i.test(txt) ||
        /^next$/i.test(txt) ||
        /clear selection/i.test(txt) ||
        /toggle calculator/i.test(txt) ||
        /^submit$/i.test(txt)
      ) {
        if (txt.length < 80) {
          el.remove();
          return;
        }
      }

      [...el.attributes].forEach(attr => {
        if (/^(ng-|_ng|on)/i.test(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    await inlineImages(clone);

    return clone;
  }

  async function extractCurrentQuestion() {
    const h = qHeader();
    if (!h) return null;

    const m = norm(h.textContent).match(/Question\s+(\d+)\s*\/\s*(\d+)/i);
    if (!m) return null;

    const num = Number(m[1]);
    const total = Number(m[2]);

    if (!seen.has(num)) {
      seen.add(num);

      await waitForQuestionContentReady();
      await waitForMathJaxIdle();
      collectGlobalSvgDefsNow();

      const root = qRoot();
      if (!root) {
        console.warn('[extract] Could not locate a root element for question', num);
        return { num, total };
      }

      const clone = await cleanupQuestionClone(root.cloneNode(true));

      collected.push({ num, html: clone.innerHTML });
      console.log(`Captured ${num}/${total}`);
    }

    return { num, total };
  }

  for (let i = 0; i < 250; i++) {
    const info = await extractCurrentQuestion();
    if (!info) {
      alert('Could not detect question content. Open the first question and try again.');
      return;
    }

    if (info.num >= info.total) break;

    const btn = nextButton();
    if (!btn) break;

    btn.click();
    await waitForNextQuestion(info.num);
  }

  collected.sort((a, b) => a.num - b.num);

  const globalDefs = [...globalDefsMap.values()].join('');
  const katexLinks = collectMathStylesheetLinks();

  const finalHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>IITM Questions</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${katexLinks}
  <style>
    body{
      font-family: Arial, sans-serif;
      color:#111;
      background:#fff;
      max-width:900px;
      margin:24px auto;
      padding:0 18px;
      line-height:1.5;
    }
    h1{font-size:24px;margin-bottom:24px}
    .q{
      margin:0 0 24px;
      padding:16px;
      border:1px solid #ddd;
      break-inside:avoid;
      page-break-inside:avoid;
    }
    .q h2{font-size:18px;margin:0 0 12px}
    img{
      max-width:100%;
      height:auto;
      display:block;
      margin:12px 0;
      break-inside:avoid;
      page-break-inside:avoid;
    }
    table{
      width:100%;
      border-collapse:collapse;
      margin:10px 0;
    }
    td,th{
      border:1px solid #ccc;
      padding:6px 8px;
      vertical-align:top;
    }
    .MathJax, mjx-container { overflow-x: auto; overflow-y: hidden; }

    .options-header h3{ font-size:16px; margin:0 0 8px; }
    .choices{ list-style:none; margin:0; padding:0; }
    .choice{
      border:1px solid #ddd;
      border-radius:8px;
      padding:10px 12px;
      margin:0 0 10px;
      background:#fafafa;
      break-inside:avoid;
      page-break-inside:avoid;
    }
    .choice:last-child{ margin-bottom:0; }
    .choice .row{ display:flex; align-items:flex-start; gap:8px; }
    .choice-indicator{ flex:0 0 auto; color:#666; }
    .choice-letter{ flex:0 0 auto; font-weight:600; min-width:1.4em; }
    .choice-text{ flex:1 1 auto; min-width:0; }
    .choice-text p{ margin:0 0 4px; }
    .choice-text p:last-child{ margin-bottom:0; }

    @media print{
      body{margin:0;max-width:none;padding:0}
      .q{border:none;padding:0 0 12px;margin:0 0 18px}
      .choice{background:#fff}
    }
  </style>

  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
      },
      svg: { fontCache: 'global' },
      startup: { typeset: true }
    };
  </script>
  <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
</head>
<body>
  <svg style="position:absolute;width:0;height:0" aria-hidden="true"><defs>${globalDefs}</defs></svg>
  <h1>Questions Only</h1>
  ${collected.map(q => `<section class="q"><h2>Question ${q.num}</h2>${q.html}</section>`).join('\n')}
</body>
</html>`;

  const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = outputFilename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);

  console.log('Extraction stats:', stats);
  alert(`Done. Downloaded HTML with ${collected.length} questions.\nMath: ${stats.texExtracted} re-typeset from source, ${stats.mathFallback} kept as rendered fallback.\nImages: ${stats.imagesInlined} embedded, ${stats.imagesFailed} failed.`);
})();