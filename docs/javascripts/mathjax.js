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
};

/* `navigation.instant` swaps page content in over XHR, so MathJax's own
   startup typeset only ever fires for the first page you land on — every
   page reached by clicking a link was left showing raw \(...\) LaTeX.
   Material publishes an observable that emits on each swap; re-typeset from it.

   Only the spans that don't already hold a rendered <mjx-container> are passed
   in. Typesetting the whole document a second time would find the assistive
   MathML that MathJax itself emits and render *that* too, giving every
   equation on the first-loaded page a duplicate. */
document$.subscribe(function () {
  if (!window.MathJax || !window.MathJax.typesetPromise) return;

  var pending = Array.prototype.filter.call(
    document.querySelectorAll(".arithmatex"),
    function (el) {
      return !el.querySelector("mjx-container");
    }
  );
  if (!pending.length) return;

  MathJax.startup.promise = MathJax.startup.promise
    .then(function () {
      // Drop the previous page's math items so they don't accumulate across a
      // long browsing session, then reset equation numbering and labels.
      MathJax.typesetClear();
      MathJax.texReset();
      return MathJax.typesetPromise(pending);
    })
    .catch(function (err) {
      console.error("MathJax typeset failed:", err);
    });
});
