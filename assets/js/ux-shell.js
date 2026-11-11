/**
 * Shared UX shell: offline, top progress, pull-to-refresh, permission modal.
 */
(function () {
  "use strict";

  function t(key, fallback) {
    if (typeof window.t === "function") {
      const value = window.t(key);
      if (value && value !== key) return value;
    }
    return fallback || key;
  }

  function ensureTopProgress() {
    let host = document.getElementById("ux-top-progress");
    if (host) return host;
    host = document.createElement("div");
    host.id = "ux-top-progress";
    host.className = "ux-top-progress";
    host.setAttribute("aria-hidden", "true");
    host.innerHTML = '<div class="ux-top-progress__bar"></div>';
    document.body.prepend(host);
    return host;
  }

  let progressInterval = 0;
  let progressHideTimer = 0;
  let progressValue = 0;

  function setProgress(value) {
    const host = ensureTopProgress();
    const bar = host.querySelector(".ux-top-progress__bar");
    progressValue = Math.max(0, Math.min(100, value));
    host.classList.toggle("is-active", progressValue > 0 && progressValue < 100);
    if (bar) bar.style.width = progressValue + "%";
    if (progressValue >= 100) {
      window.clearTimeout(progressHideTimer);
      progressHideTimer = window.setTimeout(() => {
        host.classList.remove("is-active");
        if (bar) bar.style.width = "0%";
        progressValue = 0;
      }, 280);
    }
  }

  /** Show indeterminate top progress for slow network / fetches. */
  function startProgress() {
    window.clearInterval(progressInterval);
    window.clearTimeout(progressHideTimer);
    setProgress(12);
    let step = 12;
    progressInterval = window.setInterval(() => {
      step += Math.max(1, (90 - step) * 0.08);
      if (step >= 90) {
        window.clearInterval(progressInterval);
        progressInterval = 0;
        setProgress(90);
        return;
      }
      setProgress(step);
    }, 320);
  }

  function doneProgress() {
    window.clearInterval(progressInterval);
    progressInterval = 0;
    setProgress(100);
  }

  function ensureOfflineBanner() {
    let banner = document.getElementById("ux-offline-banner");
    if (banner) return banner;
    banner = document.createElement("div");
    banner.id = "ux-offline-banner";
    banner.className = "ux-offline-banner";
    banner.setAttribute("role", "status");
    banner.innerHTML =
      '<span data-ux-offline-text></span>' +
      '<button type="button" data-ux-offline-retry></button>';
    document.body.prepend(banner);
    banner.querySelector("[data-ux-offline-retry]").addEventListener("click", () => {
      if (navigator.onLine) {
        syncOfflineBanner();
        window.location.reload();
      } else {
        syncOfflineBanner();
      }
    });
    return banner;
  }

  function syncOfflineBanner() {
    const banner = ensureOfflineBanner();
    const online = navigator.onLine !== false;
    banner.classList.toggle("is-visible", !online);
    const text = banner.querySelector("[data-ux-offline-text]");
    const retry = banner.querySelector("[data-ux-offline-retry]");
    if (text) text.textContent = t("ux_offline_text", "You are offline. Some features need the internet.");
    if (retry) retry.textContent = t("ux_offline_retry", "Retry");
  }

  function ensurePtr() {
    let el = document.getElementById("ux-ptr");
    if (el) return el;
    el = document.createElement("div");
    el.id = "ux-ptr";
    el.className = "ux-ptr";
    el.innerHTML =
      '<span class="ux-ptr__spinner" aria-hidden="true"></span>' +
      '<span data-ux-ptr-text></span>';
    document.body.appendChild(el);
    return el;
  }

  function initPullToRefresh() {
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    const ptr = ensurePtr();
    const label = ptr.querySelector("[data-ux-ptr-text]");
    let startY = 0;
    let pulling = false;

    function setLabel(key, fallback) {
      if (label) label.textContent = t(key, fallback);
    }

    document.addEventListener(
      "touchstart",
      (event) => {
        if (window.scrollY > 2) return;
        startY = event.touches[0].clientY;
        pulling = true;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchmove",
      (event) => {
        if (!pulling) return;
        const delta = event.touches[0].clientY - startY;
        if (delta < 70) {
          ptr.classList.remove("is-visible");
          return;
        }
        ptr.classList.add("is-visible");
        setLabel("ux_ptr_release", "Release to refresh");
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      (event) => {
        if (!pulling) return;
        pulling = false;
        const delta = event.changedTouches[0].clientY - startY;
        if (delta < 90) {
          ptr.classList.remove("is-visible");
          return;
        }
        setLabel("ux_ptr_refreshing", "Refreshing…");
        startProgress();
        window.setTimeout(() => window.location.reload(), 450);
      },
      { passive: true }
    );
  }

  function ensurePermissionModal() {
    let root = document.getElementById("ux-permission");
    if (root) return root;
    root = document.createElement("div");
    root.id = "ux-permission";
    root.className = "ux-permission";
    root.innerHTML =
      '<div class="ux-permission__card" role="dialog" aria-modal="true" aria-labelledby="ux-permission-title">' +
      '<h2 id="ux-permission-title"></h2>' +
      "<p data-ux-permission-body></p>" +
      '<div class="ux-permission__actions">' +
      '<a class="is-primary" data-ux-permission-home href="index.html"></a>' +
      '<button type="button" data-ux-permission-close></button>' +
      "</div></div>";
    document.body.appendChild(root);
    root.querySelector("[data-ux-permission-close]").addEventListener("click", () => {
      root.classList.remove("is-open");
    });
    root.addEventListener("click", (event) => {
      if (event.target === root) root.classList.remove("is-open");
    });
    return root;
  }

  /** Show permission-denied dialog with reason and way back. */
  function showPermissionDenied(reason) {
    const root = ensurePermissionModal();
    root.querySelector("#ux-permission-title").textContent = t(
      "ux_permission_title",
      "Access denied"
    );
    root.querySelector("[data-ux-permission-body]").textContent =
      reason ||
      t(
        "ux_permission_body",
        "You do not have permission for this action. Go back home or try again later."
      );
    root.querySelector("[data-ux-permission-home]").textContent = t(
      "ux_permission_home",
      "Back home"
    );
    root.querySelector("[data-ux-permission-close]").textContent = t(
      "ux_permission_close",
      "Close"
    );
    root.classList.add("is-open");
  }

  function setButtonLoading(button, isLoading) {
    if (!button) return;
    button.classList.toggle("ux-btn-loading", isLoading);
    button.disabled = Boolean(isLoading);
    button.setAttribute("aria-busy", isLoading ? "true" : "false");
    let spinner = button.querySelector(".ux-btn-spinner");
    if (isLoading && !spinner) {
      spinner = document.createElement("span");
      spinner.className = "ux-btn-spinner";
      spinner.setAttribute("aria-hidden", "true");
      button.appendChild(spinner);
    }
    if (!isLoading && spinner) spinner.remove();
  }

  const nativeFetch = window.fetch.bind(window);
  window.fetch = function uxFetch(input, init) {
    startProgress();
    return nativeFetch(input, init).finally(doneProgress);
  };

  function init() {
    ensureTopProgress();
    syncOfflineBanner();
    window.addEventListener("online", syncOfflineBanner);
    window.addEventListener("offline", syncOfflineBanner);
    initPullToRefresh();
    startProgress();
    window.addEventListener("load", doneProgress);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.SamaUx = {
    startProgress,
    doneProgress,
    setButtonLoading,
    showPermissionDenied,
    syncOfflineBanner
  };
})();
