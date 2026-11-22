(async () => {
  console.log("%c[QuizSaver]%c Starting extraction...", "color:#38bdf8;font-weight:bold", "");

  // 1. Locate Inertia data payload
  let dataPage = document.getElementById("app")?.getAttribute("data-page");
  if (!dataPage) {
    console.log("[QuizSaver] Fetching page HTML to read raw data-page payload...");
    const res = await fetch(window.location.href);
    const html = await res.text();
    const match = html.match(/id="app"\s+data-page="([^"]+)"/);
    if (!match) {
      alert("Error: Could not locate question paper data on this page.");
      return;
    }
    dataPage = match[1];
  }

  const decoded = dataPage
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'");

  const inertiaData = JSON.parse(decoded);
  const props = inertiaData.props || {};
  const qp = props.question_paper;
  if (!qp || !qp.questions) {
    alert("Error: No questions found in the question paper data.");
    return;
  }

  const baseUrl = props.file_url || props.file_do_url || "https://saram.blr1.cdn.digitaloceanspaces.com";
  console.log(`%c[QuizSaver]%c Found: "${qp.question_paper_name || 'Question Paper'}" with ${qp.questions.length} questions.`, "color:#22c55e;font-weight:bold", "");

  // Canonicalize URLs to avoid duplicate downloads and multiple renders
  function canonicalImageUrl(imgItem) {
    if (!imgItem) return null;
    let p = typeof imgItem === "string" ? imgItem.trim() : (imgItem.url || imgItem.path || "").trim();
    if (!p) return null;
    if (p.startsWith("http://") || p.startsWith("https://") || p.startsWith("data:")) return p;
    const cleanBase = baseUrl.replace(/\/+$/, "");
    const cleanPath = p.replace(/^\/+/, "");
    if (cleanPath.startsWith("question_images/")) return `${cleanBase}/${cleanPath}`;
    return `${cleanBase}/question_images/${cleanPath}`;
  }

  async function fetchImageBase64(url) {
    if (!url || url.startsWith("data:")) return url;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const blob = await res.blob();
        return await new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => resolve(url);
          reader.readAsDataURL(blob);
        });
      }
    } catch (e) {}

    // Fallback using Image + Canvas
    try {
      return await new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          } catch (e) {
            resolve(url);
          }
        };
        img.onerror = () => resolve(url);
        img.src = url;
      });
    } catch (e) {
      return url;
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Preserve valid HTML (like formula images, tables, spans) while escaping plain text
  function renderContent(text, imageCache) {
    if (!text) return "";
    let str = String(text).trim();

    const hasHtmlTag = /<\/?(img|p|div|span|table|thead|tbody|tr|td|th|b|i|strong|em|br|ul|ol|li|code|pre|sub|sup|font|svg|h[1-6])[^>]*>/i.test(str);

    if (hasHtmlTag) {
      str = str.replace(/<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi, (match, prefix, src, suffix) => {
        let resolvedSrc = src;
        if (imageCache[src]) {
          resolvedSrc = imageCache[src];
        } else {
          const canonical = canonicalImageUrl(src);
          if (canonical && imageCache[canonical]) resolvedSrc = imageCache[canonical];
          else if (canonical) resolvedSrc = canonical;
        }
        return `<img ${prefix}src="${resolvedSrc}"${suffix}>`;
      });

      if (!/<(p|br|div|tr|li)[^>]*>/i.test(str)) {
        str = str.replace(/\n\n+/g, "<br/><br/>").replace(/\n/g, "<br/>");
      }
      return str;
    }

    const escaped = str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return `<p>${escaped.replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br/>")}</p>`;
  }

  function renderInlineContent(text, imageCache) {
    if (!text) return "";
    const str = String(text).trim();
    if (/<\/?(img|p|div|span|table|b|i|strong|em|br|ul|ol|li|code|sub|sup)[^>]*>/i.test(str)) {
      return renderContent(str, imageCache);
    }
    return escapeHtml(str);
  }

  // 2. Collect and download images
  console.log("[QuizSaver] Scanning for images...");
  const imageUrls = new Set();
  function scanImg(raw) {
    const c = canonicalImageUrl(raw);
    if (c && !c.startsWith("data:")) imageUrls.add(c);
  }
  function scanHtml(htmlStr) {
    if (!htmlStr) return;
    const re = /<img\s+[^>]*?src=["']([^"']+)["'][^>]*?>/gi;
    let m;
    while ((m = re.exec(htmlStr)) !== null) {
      if (m[1]) scanImg(m[1]);
    }
  }

  qp.questions.forEach(q => {
    if (q.question_image_1) scanImg(q.question_image_1);
    if (Array.isArray(q.question_image_url)) q.question_image_url.forEach(scanImg);
    if (Array.isArray(q.question_images_json)) q.question_images_json.forEach(scanImg);

    const texts = [q.question_text_1, q.question_text_2, q.question_text_3, ...(q.question_texts || [])];
    texts.forEach(scanHtml);

    (q.options || []).forEach(opt => {
      if (opt.option_image) scanImg(opt.option_image);
      if (opt.option_image_url) scanImg(opt.option_image_url);
      scanHtml(opt.option_text);
    });

    if (q.solution_text) scanHtml(q.solution_text);
    if (Array.isArray(q.solutions)) {
      q.solutions.forEach(s => {
        if (s.solution_text) scanHtml(s.solution_text);
        if (s.image || s.solution_image) scanImg(s.image || s.solution_image);
      });
    }
  });

  console.log(`[QuizSaver] Downloading ${imageUrls.size} unique image(s)... please wait.`);
  const imageCache = {};
  for (const url of imageUrls) {
    try {
      const b64 = await fetchImageBase64(url);
      if (b64) imageCache[url] = b64;
    } catch (e) {}
  }
  console.log(`%c[QuizSaver]%c Downloaded ${Object.keys(imageCache).length} images as Base64.`, "color:#22c55e", "");

  // 3. Render questions
  const comprehensionMap = {};
  qp.questions.forEach(q => {
    if (q.question_type === "COMPREHENSION") comprehensionMap[q.id] = q;
  });

  let questionsHtml = "";
  let renderedIndex = 0;

  for (const q of qp.questions) {
    renderedIndex++;
    const isComp = q.question_type === "COMPREHENSION";
    const isSub = q.parent_question_id && comprehensionMap[q.parent_question_id];
    const qNum = q.question_number || renderedIndex;

    const rawTexts = (q.question_texts && q.question_texts.length > 0)
      ? q.question_texts
      : [q.question_text_1, q.question_text_2, q.question_text_3].filter(Boolean);
    const textList = [...new Set(rawTexts.map(t => String(t).trim()))].filter(Boolean);

    // Question images (canonical deduplication)
    const rawImages = [];
    if (q.question_image_1) rawImages.push(q.question_image_1);
    if (Array.isArray(q.question_image_url)) rawImages.push(...q.question_image_url);
    if (Array.isArray(q.question_images_json)) rawImages.push(...q.question_images_json);

    const uniqueImages = [...new Set(rawImages.map(img => canonicalImageUrl(img)).filter(Boolean))];
    let imagesHtml = "";
    for (const imgUrl of uniqueImages) {
      const src = imageCache[imgUrl] || imgUrl;
      imagesHtml += `
        <div class="image-box">
          <img src="${src}" alt="Question Image" loading="lazy" />
        </div>
      `;
    }

    // Options HTML (MCQ / MSQ)
    let optionsHtml = "";
    if (q.options && q.options.length > 0) {
      optionsHtml += `<div class="options-container">`;
      const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
      q.options.forEach((opt, optIdx) => {
        const label = optionLabels[optIdx] || (optIdx + 1);
        const isCorrect = opt.is_correct === 1 || parseFloat(opt.score) > 0;

        let optImgHtml = "";
        const optImgPath = opt.option_image_url || opt.option_image;
        if (optImgPath) {
          const c = canonicalImageUrl(optImgPath);
          const optSrc = (c && imageCache[c]) ? imageCache[c] : (c || optImgPath);
          optImgHtml = `<div class="option-image"><img src="${optSrc}" alt="Option ${label}" /></div>`;
        }

        optionsHtml += `
          <div class="option-item ${isCorrect ? 'correct-option' : ''}">
            <div class="option-header">
              <span class="option-badge">${label}</span>
              ${isCorrect ? '<span class="correct-tag">&#10003; Correct Answer</span>' : ''}
              ${opt.score && parseFloat(opt.score) > 0 ? `<span class="score-tag">+${opt.score} Mark${parseFloat(opt.score) !== 1 ? 's' : ''}</span>` : ''}
            </div>
            <div class="option-body">
              <div class="option-text">${renderContent(opt.option_text, imageCache)}</div>
              ${optImgHtml}
            </div>
          </div>
        `;
      });
      optionsHtml += `</div>`;
    }

    // Short Answer / Numeric / NAT Answer Card
    let saAnswerHtml = "";
    if (q.value_start !== null && q.value_start !== undefined && String(q.value_start).trim() !== "") {
      let valStr = String(q.value_start).trim();
      if (q.value_end !== null && q.value_end !== undefined && String(q.value_end).trim() !== "" && String(q.value_end).trim() !== valStr) {
        valStr = `${valStr} to ${String(q.value_end).trim()}`;
      }

      saAnswerHtml = `
        <div class="sa-answer-card">
          <div class="sa-header">
            <span class="correct-tag">&#10003; Correct Answer</span>
            ${q.total_mark ? `<span class="score-tag">+${q.total_mark} Mark${parseFloat(q.total_mark) !== 1 ? 's' : ''}</span>` : ''}
            ${q.response_type ? `<span class="info-tag">${escapeHtml(q.response_type)}</span>` : ''}
            ${q.answer_type ? `<span class="info-tag">${escapeHtml(q.answer_type)}</span>` : ''}
          </div>
          <div class="sa-answer-value">
            <span class="sa-label">Answer:</span>
            <span class="sa-text">${renderInlineContent(valStr, imageCache)}</span>
          </div>
          <div class="sa-practice-placeholder">
            <span class="sa-label">Your Answer:</span>
            <span class="sa-placeholder-line">____________________________________</span>
          </div>
        </div>
      `;
    }

    // Solutions / Explanations
    let solutionsHtml = "";
    const solTexts = [];
    if (q.solution_text) solTexts.push(q.solution_text);
    if (Array.isArray(q.solutions)) {
      q.solutions.forEach(s => {
        if (s.solution_text) solTexts.push(s.solution_text);
        if (s.text) solTexts.push(s.text);
      });
    }
    if (solTexts.length > 0) {
      solutionsHtml = `
        <div class="solution-card">
          <div class="solution-header">&#128161; Solution / Explanation:</div>
          ${solTexts.map(st => `<div class="solution-content">${renderContent(st, imageCache)}</div>`).join('')}
        </div>
      `;
    }

    questionsHtml += `
      <section class="question-card ${isComp ? 'comprehension-card' : ''}" id="q-${q.id}">
        <div class="card-header">
          <div class="badge-group">
            <span class="badge badge-num">${isComp ? 'Reading Comprehension' : `Question ${qNum}`}</span>
            <span class="badge badge-type">${escapeHtml(q.question_type)}</span>
            ${q.total_mark ? `<span class="badge badge-mark">${escapeHtml(String(q.total_mark))} Mark${parseFloat(q.total_mark) !== 1 ? 's' : ''}</span>` : ''}
            ${isSub ? `<span class="badge badge-sub">Subquestion of Passage</span>` : ''}
          </div>
        </div>

        <div class="question-content">
          ${textList.map(t => `<div class="text-block">${renderContent(t, imageCache)}</div>`).join('')}
          ${imagesHtml}
        </div>

        ${optionsHtml}
        ${saAnswerHtml}
        ${solutionsHtml}
      </section>
    `;
  }

  // Full HTML
  const title = qp.question_paper_name || "Question Paper";
  const duration = qp.duration ? `${qp.duration} Hours` : "Not specified";
  const totalScore = qp.total_score || "N/A";

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>

  <!-- KaTeX for LaTeX Math Rendering -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      function renderMath() {
        if (window.renderMathInElement) {
          window.renderMathInElement(document.body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\\\(', right: '\\\\)', display: false},
              {left: '\\\\[', right: '\\\\]', display: true}
            ],
            throwOnError: false
          });
        } else {
          setTimeout(renderMath, 100);
        }
      }
      renderMath();
    });
  </script>

  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --card-border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --primary: #38bdf8;
      --success: #22c55e;
      --success-bg: rgba(34, 197, 94, 0.12);
      --success-border: rgba(34, 197, 94, 0.4);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      padding: 24px;
    }

    .container { max-width: 900px; margin: 0 auto; }

    .paper-header {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }
    .paper-title { font-size: 1.65rem; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .meta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
    .meta-tag {
      background: #0f172a;
      border: 1px solid var(--card-border);
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .meta-tag strong { color: var(--primary); }

    .actions-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--card-border);
      padding-top: 16px;
      gap: 12px;
    }
    .btn {
      background: var(--primary);
      color: #0f172a;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.9rem;
      transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.9; }
    .toggle-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      user-select: none;
    }
    .toggle-label input { cursor: pointer; width: 16px; height: 16px; }

    .question-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 22px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    .comprehension-card {
      border-color: #3b82f6;
      background: linear-gradient(180deg, #1e293b 0%, #172554 100%);
    }

    .card-header { margin-bottom: 14px; }
    .badge-group { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .badge {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .badge-num { background: #38bdf8; color: #0f172a; }
    .badge-type { background: #334155; color: #f8fafc; }
    .badge-mark { background: #818cf8; color: #0f172a; }
    .badge-sub { background: #f59e0b; color: #0f172a; }

    .question-content {
      font-size: 1.05rem;
      margin-bottom: 18px;
      color: #f1f5f9;
    }
    .question-content p { margin-bottom: 10px; }
    .question-content p:last-child { margin-bottom: 0; }

    .image-box {
      text-align: center;
      margin: 16px 0;
      background: #0f172a;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
    }
    .image-box img {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      display: inline-block;
    }

    .options-container { display: flex; flex-direction: column; gap: 10px; }
    .option-item {
      background: #0f172a;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 12px 16px;
      transition: all 0.2s;
    }
    .option-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .option-badge {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #334155;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.8rem;
    }
    .option-text {
      font-size: 1rem;
      color: #e2e8f0;
      line-height: 1.5;
    }
    .option-text img {
      vertical-align: middle;
      max-height: 2.2em;
      max-width: 100%;
    }
    .option-image {
      margin-top: 8px;
    }
    .option-image img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }

    .correct-tag {
      display: none;
      background: var(--success);
      color: #0f172a;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
    }
    .score-tag {
      display: none;
      background: #059669;
      color: #fff;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .info-tag {
      background: #334155;
      color: #cbd5e1;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 4px;
    }

    /* Short Answer / Numeric Answer Card */
    .sa-answer-card {
      margin-top: 14px;
      padding: 14px 18px;
      border-radius: 8px;
      background: #0b1120;
      border: 1px solid var(--card-border);
    }
    .sa-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .sa-answer-value {
      display: none;
      align-items: center;
      gap: 10px;
      font-size: 1.15rem;
      font-weight: 600;
      color: #86efac;
      padding: 8px 14px;
      background: rgba(34, 197, 94, 0.12);
      border-radius: 6px;
      border: 1px solid rgba(34, 197, 94, 0.3);
      width: fit-content;
      margin-top: 6px;
    }
    .sa-answer-value .sa-label {
      color: #4ade80;
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .sa-answer-value .sa-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    .sa-answer-value .sa-text p {
      display: inline;
      margin: 0;
    }
    .sa-practice-placeholder {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-top: 6px;
    }
    .sa-placeholder-line {
      letter-spacing: 2px;
      color: #475569;
    }

    /* Solutions */
    .solution-card {
      display: none;
      margin-top: 14px;
      padding: 14px 18px;
      border-radius: 8px;
      background: #172554;
      border: 1px solid #3b82f6;
    }
    .solution-header {
      font-weight: 700;
      color: #93c5fd;
      margin-bottom: 8px;
    }
    .solution-content {
      color: #e0f2fe;
      font-size: 0.95rem;
    }

    /* Answers Visible State */
    body.show-answers .option-item.correct-option {
      background: var(--success-bg);
      border-color: var(--success-border);
    }
    body.show-answers .option-item.correct-option .option-badge {
      background: var(--success);
      color: #0f172a;
    }
    body.show-answers .sa-answer-card {
      border-color: rgba(34, 197, 94, 0.4);
      background: rgba(34, 197, 94, 0.04);
    }
    body.show-answers .sa-answer-value {
      display: inline-flex;
    }
    body.show-answers .solution-card {
      display: block;
    }
    body.show-answers .sa-practice-placeholder {
      display: none;
    }
    body.show-answers .correct-tag,
    body.show-answers .score-tag {
      display: inline-block;
    }

    /* Print & PDF styling */
    @media print {
      body { background: #fff !important; color: #000 !important; padding: 0 !important; }
      .actions-bar { display: none !important; }
      .paper-header, .question-card, .option-item, .sa-answer-card, .solution-card, .image-box {
        background: #fff !important;
        color: #000 !important;
        border: 1px solid #ccc !important;
        box-shadow: none !important;
        page-break-inside: avoid;
      }
      .question-content, .option-text, .solution-content { color: #000 !important; }
      .badge-type, .meta-tag { background: #eee !important; color: #000 !important; }
      .sa-answer-value {
        color: #15803d !important;
        background: #f0fdf4 !important;
        border: 1px solid #bbf7d0 !important;
      }
    }
  </style>
</head>
<body class="show-answers">
  <div class="container">
    <header class="paper-header">
      <h1 class="paper-title">${escapeHtml(title)}</h1>
      <div class="meta-row">
        <span class="meta-tag"><strong>Questions:</strong> ${qp.questions.length}</span>
        <span class="meta-tag"><strong>Duration:</strong> ${escapeHtml(duration)}</span>
        <span class="meta-tag"><strong>Total Marks:</strong> ${escapeHtml(String(totalScore))}</span>
      </div>
      <div class="actions-bar">
        <label class="toggle-label">
          <input type="checkbox" checked onchange="document.body.classList.toggle('show-answers', this.checked)">
          Show Answers & Solutions
        </label>
        <button class="btn" onclick="window.print()">Print / Save PDF</button>
      </div>
    </header>

    <main>
      ${questionsHtml}
    </main>
  </div>
</body>
</html>`;

  // 4. Download file
  const filename = (title.replace(/[^a-zA-Z0-9_-]/g, "_") || "question_paper") + ".html";
  const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);

  console.log(`%c[QuizSaver]%c Successfully saved to "${filename}"! (Size: ${(blob.size / 1024).toFixed(1)} KB)`, "color:#22c55e;font-weight:bold", "");
})();