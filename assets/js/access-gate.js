/**
 * Site availability gate — fetches sama_killswitch.json (≤1s).
 * Checks sites.<key>.enabled only (optional top-level enabled still honored).
 * Fail-open on timeout/error/missing data.
 */
(function () {
  "use strict";

  const SITE_KEY = "portfolio";
  const GIST_URL =
    "https://gist.githubusercontent.com/Sama-ndari/f8862a3c7b0415485dd35b6d8efd31e2/raw/sama_killswitch.json";
  const TIMEOUT_MS = 1000;
  const LANG_KEY = "sama-lang";
  const THEME_KEY = "sama-theme";
  const SCRIPT_EL = document.currentScript;

  const COPY = {
    en: {
      title: "Temporarily unavailable",
      body: "This site is paused for maintenance. Please check back shortly.",
      brand: "Samandari"
    },
    fr: {
      title: "Temporairement indisponible",
      body: "Ce site est en pause pour maintenance. Revenez un peu plus tard.",
      brand: "Samandari"
    }
  };

  const GATE_CSS =
    "#sama-access-gate{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;" +
    "padding:24px;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;" +
    "background:#0d1117;color:#e6edf3}" +
    "#sama-access-gate[data-theme=light]{background:#ffffff;color:#1f2328}" +
    "#sama-access-gate .gate-card{max-width:420px;width:100%;padding:28px 24px;border-radius:6px;" +
    "border:1px solid #30363d;background:#161b22;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}" +
    "#sama-access-gate[data-theme=light] .gate-card{border-color:#d0d7de;background:#f6f8fa;" +
    "box-shadow:0 8px 24px rgba(31,35,40,.08)}" +
    "#sama-access-gate img{width:48px;height:48px;border-radius:50%;margin-bottom:16px;object-fit:cover;background:transparent}" +
    "#sama-access-gate .gate-brand{font-size:13px;font-weight:600;letter-spacing:.02em;" +
    "color:#e8976c;margin:0 0 8px}" +
    "#sama-access-gate h1{font-size:1.35rem;font-weight:700;margin:0 0 10px;line-height:1.3}" +
    "#sama-access-gate p{margin:0;font-size:.95rem;line-height:1.55;color:#9ba3ae}" +
    "#sama-access-gate[data-theme=light] p{color:#656d76}";

  const html = document.documentElement;
  html.classList.add("sama-gate-checking");

  function resolveAsset(relFromJsDir) {
    try {
      if (SCRIPT_EL && SCRIPT_EL.src) {
        return new URL(relFromJsDir, SCRIPT_EL.src).href;
      }
    } catch (error) {
      /* keep relative fallback */
    }
    return relFromJsDir;
  }

  function ensureFavicon() {
    const href = resolveAsset("../img/favicon.ico");
    const head = document.head || document.documentElement;
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "icon");
      link.setAttribute("sizes", "any");
      head.appendChild(link);
    }
    link.setAttribute("href", href);
    const apple = document.querySelector('link[rel="apple-touch-icon"]');
    if (apple) apple.setAttribute("href", resolveAsset("../img/icon.png"));
  }

  ensureFavicon();

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function resolveLang() {
    return readStorage(LANG_KEY) === "fr" ? "fr" : "en";
  }

  function isSiteAllowed(data) {
    if (!data || typeof data !== "object") return true;
    if (data.enabled === false) return false;
    const site = data.sites && data.sites[SITE_KEY];
    if (site && site.enabled === false) return false;
    return true;
  }

  function allowAccess() {
    html.classList.remove("sama-gate-checking", "sama-gate-blocked");
  }

  function buildOfflineMarkup(copy) {
    const iconSrc = resolveAsset("../img/icon.png");
    return (
      "<style>" +
      GATE_CSS +
      "</style>" +
      '<div class="gate-card">' +
      '<img class="gate-logo-img" src="' +
      iconSrc +
      '" width="48" height="48" alt="">' +
      '<p class="gate-brand">' +
      copy.brand +
      "</p>" +
      '<h1 id="sama-gate-title">' +
      copy.title +
      "</h1>" +
      "<p>" +
      copy.body +
      "</p></div>"
    );
  }

  function attachGate(root) {
    if (document.getElementById("sama-access-gate")) return;
    document.body.appendChild(root);
    document.body.style.overflow = "hidden";
    const img = root.querySelector(".gate-logo-img");
    if (img) {
      img.addEventListener("error", function onIconError() {
        img.removeEventListener("error", onIconError);
        img.src = resolveAsset("../img/favicon.ico");
      });
    }
  }

  function mountOfflineUi() {
    html.classList.remove("sama-gate-checking");
    html.classList.add("sama-gate-blocked");
    const copy = COPY[resolveLang()] || COPY.en;
    const theme = readStorage(THEME_KEY) === "light" ? "light" : "dark";
    const root = document.createElement("div");
    root.id = "sama-access-gate";
    root.setAttribute("role", "alertdialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "sama-gate-title");
    root.setAttribute("data-theme", theme);
    root.innerHTML = buildOfflineMarkup(copy);
    if (document.body) attachGate(root);
    else document.addEventListener("DOMContentLoaded", function () {
      attachGate(root);
    });
  }

  function fetchAccessConfig() {
    const controller = new AbortController();
    const timer = setTimeout(function () {
      controller.abort();
    }, TIMEOUT_MS);
    return fetch(GIST_URL + "?t=" + Date.now(), {
      signal: controller.signal,
      cache: "no-store"
    })
      .then(function (response) {
        clearTimeout(timer);
        if (!response.ok) throw new Error("access-gate http " + response.status);
        return response.json();
      })
      .catch(function () {
        clearTimeout(timer);
        return null;
      });
  }

  fetchAccessConfig().then(function (data) {
    if (isSiteAllowed(data)) allowAccess();
    else mountOfflineUi();
  });
})();
