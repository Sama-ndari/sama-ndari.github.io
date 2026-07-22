/**
 * Floating CTA → dedicated AI clone page (ai.html).
 * Resolves href from this script's path so nested pages work.
 */
(function () {
  "use strict";

  if (document.body.classList.contains("page-ai-clone")) {
    return;
  }

  function scriptSrc() {
    const nodes = document.querySelectorAll('script[src*="clone-launcher"]');
    const last = nodes[nodes.length - 1];
    return last ? last.getAttribute("src") || "" : "assets/js/clone-launcher.js";
  }

  function rootPrefix() {
    return scriptSrc().replace(/assets\/js\/clone-launcher\.js(?:\?.*)?$/i, "");
  }

  function labelText() {
    return typeof t === "function" ? t("clone_launcher_label") : "Talk to my clone";
  }

  function ariaText() {
    return typeof t === "function" ? t("clone_launcher_aria") : labelText();
  }

  const prefix = rootPrefix();
  const link = document.createElement("a");
  link.href = prefix + "ai.html";
  link.className = "clone-launcher";
  link.setAttribute("data-i18n-aria-label", "clone_launcher_aria");
  link.setAttribute("data-i18n-title", "clone_launcher_label");
  link.setAttribute("aria-label", ariaText());
  link.title = labelText();

  const img = document.createElement("img");
  img.src = prefix + "assets/img/icon.png";
  img.alt = "";
  img.width = 36;
  img.height = 36;
  img.decoding = "async";
  img.className = "clone-launcher__avatar";

  const label = document.createElement("span");
  label.className = "clone-launcher__label";
  label.setAttribute("data-i18n-text", "clone_launcher_label");
  label.textContent = labelText();

  const status = document.createElement("span");
  status.className = "clone-launcher__status";
  status.setAttribute("aria-hidden", "true");

  link.appendChild(img);
  link.appendChild(label);
  link.appendChild(status);
  document.body.appendChild(link);
})();
