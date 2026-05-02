/**
 * Thinking essays: load locale + show FR notice that body is in English.
 * Requires i18n.js before this file; main.js may call applyI18n again later.
 */
(function () {
  "use strict";

  function run() {
    if (typeof applyI18n === "function") applyI18n();
    if (typeof getLang !== "function" || typeof t !== "function") return;
    var el = document.getElementById("thinking-essay-lang-banner");
    if (!el || getLang() !== "fr") return;
    var msg = t("thinking_essay_en_notice");
    if (!msg) return;
    el.textContent = msg;
    el.classList.remove("d-none");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
