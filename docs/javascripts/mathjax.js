window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    ignoreHtmlClass: ".*",
    processHtmlClass: "arithmatex",
  },
  chtml: {
    // The privacy plugin mirrors this <script src> to this origin, but
    // MathJax computes its webfont URLs at runtime by string-concatenation
    // relative to wherever its own script loaded from -- there's no literal
    // font URL in the JS source for the plugin's static scanner to find and
    // mirror too. Left alone, every glyph request 404s and every equation
    // renders as an empty box. Point fonts at the same jsdelivr release the
    // script itself came from: font loading happens off the critical path
    // (after typesetting, async), so this doesn't reintroduce the
    // render-blocking round trip the privacy plugin exists to avoid.
    fontURL:
      "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
  },
};

/* `navigation.instant` swaps page content in over XHR, so MathJax's own
   startup typeset only ever fires for the first page you land on — every
   page reached by clicking a link was left showing raw \(...\) LaTeX.
   Material publishes an observable that emits on each swap; re-typeset from it.

   Only the spans that don't already hold a rendered <mjx-container> are passed
   in. Typesetting the whole document a second time would find the assistive
   MathML that MathJax itself emits and render *that* too, giving every
   equation on the first-loaded page a duplicate. */
(function () {
  // A click can land (and `document$` can fire) before tex-chtml.js — the
  // last of three render-blocking scripts — has finished loading, e.g. on a
  // slow connection or an instant-navigation swap that completes unusually
  // fast. Bailing out unconditionally here meant that page's math never got
  // a second chance: nothing re-triggers `document$` just because MathJax
  // finished loading afterwards. Wait for MathJax instead of giving up.
  var readyPromise = null;
  function whenMathJaxReady() {
    if (!readyPromise) {
      readyPromise = new Promise(function (resolve) {
        (function poll() {
          if (window.MathJax && window.MathJax.typesetPromise && window.MathJax.startup) {
            resolve();
          } else {
            setTimeout(poll, 30);
          }
        })();
      });
    }
    return readyPromise;
  }

  document$.subscribe(function () {
    whenMathJaxReady().then(function () {
      var pending = Array.prototype.filter.call(
        document.querySelectorAll(".arithmatex"),
        function (el) {
          return !el.querySelector("mjx-container");
        }
      );
      if (!pending.length) return;

      MathJax.startup.promise = MathJax.startup.promise
        .then(function () {
          // Drop the previous page's math items so they don't accumulate across
          // a long browsing session, then reset equation numbering and labels.
          MathJax.typesetClear();
          MathJax.texReset();
          return MathJax.typesetPromise(pending);
        })
        .catch(function (err) {
          console.error("MathJax typeset failed:", err);
        });
    });
  });

  // Safety net for the CSS below: if MathJax never loads at all (offline,
  // the CDN font request blocked, a broken future release), don't leave the
  // raw \(...\) source permanently invisible -- reveal it after a few
  // seconds regardless of typesetting state.
  setTimeout(function () {
    document.documentElement.classList.add("mjx-timeout");
  }, 4000);
})();
