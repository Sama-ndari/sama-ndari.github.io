/**
 * Types the overview code blob in place, keeping existing token spans.
 */
(function () {
  "use strict";

  const CHAR_MS = 28;
  const LINE_PAUSE_MS = 240;
  const START_DELAY_MS = 320;
  const originals = new WeakMap();
  let timer = 0;

  function prefersReducedMotion() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function stop() {
    if (!timer) return;
    window.clearTimeout(timer);
    timer = 0;
  }

  function collectTextNodes(root, skipEmpty) {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (!skipEmpty || node.textContent.length > 0) nodes.push(node);
      node = walker.nextNode();
    }
    return nodes;
  }

  function isI18nText(node) {
    const parent = node.parentElement;
    return Boolean(parent && parent.closest("[data-i18n-text]"));
  }

  function clearCaret(canvas) {
    canvas.querySelectorAll(".gh-typer-caret").forEach((caret) => caret.remove());
  }

  function placeCaret(textNode) {
    const caret = document.createElement("span");
    caret.className = "gh-typer-caret";
    caret.setAttribute("aria-hidden", "true");
    textNode.parentNode.insertBefore(caret, textNode.nextSibling);
  }

  function rememberStatic(node) {
    if (isI18nText(node) || originals.has(node)) return;
    originals.set(node, node.textContent);
  }

  function restoreStatic(canvas) {
    collectTextNodes(canvas, false).forEach((node) => {
      if (isI18nText(node)) return;
      const saved = originals.get(node);
      if (saved !== undefined) node.textContent = saved;
    });
  }

  function setLineState(gutter, activeIndex) {
    if (!gutter) return;
    [...gutter.children].forEach((num, index) => {
      num.classList.toggle("is-pending", index > activeIndex);
      num.classList.toggle("is-active", index === activeIndex);
    });
  }

  function clearLineState(gutter) {
    if (!gutter) return;
    [...gutter.children].forEach((num) => {
      num.classList.remove("is-pending", "is-active");
    });
  }

  function segmentsFor(line) {
    return collectTextNodes(line, true).map((node) => {
      rememberStatic(node);
      return { node, full: node.textContent };
    });
  }

  function hideSegments(plan) {
    plan.forEach((segments) => {
      segments.forEach((segment) => {
        segment.node.textContent = "";
      });
    });
  }

  function revealChar(state) {
    const segment = state.plan[state.lineIndex][state.segIndex];
    state.charIndex += 1;
    segment.node.textContent = segment.full.slice(0, state.charIndex);
    clearCaret(state.canvas);
    placeCaret(segment.node);
    if (state.charIndex < segment.full.length) return CHAR_MS;
    state.segIndex += 1;
    state.charIndex = 0;
    return CHAR_MS;
  }

  function advance(state) {
    if (state.lineIndex >= state.plan.length) {
      clearCaret(state.canvas);
      clearLineState(state.gutter);
      const lastLine = state.lines[state.lines.length - 1];
      const lastNodes = lastLine ? collectTextNodes(lastLine, true) : [];
      const lastNode = lastNodes[lastNodes.length - 1];
      if (lastNode) placeCaret(lastNode);
      state.canvas.removeAttribute("aria-busy");
      return;
    }

    setLineState(state.gutter, state.lineIndex);
    if (state.segIndex >= state.plan[state.lineIndex].length) {
      state.lineIndex += 1;
      state.segIndex = 0;
      state.charIndex = 0;
      clearCaret(state.canvas);
      timer = window.setTimeout(() => advance(state), LINE_PAUSE_MS);
      return;
    }

    const delay = revealChar(state);
    timer = window.setTimeout(() => advance(state), delay);
  }

  function play(canvas, gutter) {
    const lines = [...canvas.children];
    const plan = lines.map(segmentsFor);
    canvas.removeAttribute("aria-busy");
    clearCaret(canvas);
    if (prefersReducedMotion()) {
      clearLineState(gutter);
      return;
    }
    hideSegments(plan);
    setLineState(gutter, -1);
    canvas.setAttribute("aria-busy", "true");
    const state = {
      canvas,
      gutter,
      lines,
      plan,
      lineIndex: 0,
      segIndex: 0,
      charIndex: 0
    };
    timer = window.setTimeout(() => advance(state), START_DELAY_MS);
  }

  /** Replay the overview code blob after i18n text is applied. */
  function reinitGhBlobTyper() {
    const canvas = document.querySelector(".gh-code-canvas");
    const gutter = document.querySelector(".gh-line-gutter");
    if (!canvas) return;
    stop();
    clearCaret(canvas);
    restoreStatic(canvas);
    play(canvas, gutter);
  }

  window.reinitGhBlobTyper = reinitGhBlobTyper;
})();
