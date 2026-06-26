(function () {
  const MEDIA = {
    "cv-en": { src: "assets/img/portfolio/cv_en.png", titleKey: "resume_cv_en", gallery: "resume-cv" },
    "cv-fr": { src: "assets/img/portfolio/cv_fr.png", titleKey: "resume_cv_fr", gallery: "resume-cv" },
    "embedded-systems": {
      src: "assets/img/dossiers/es.jpg",
      titleKey: "resume_cert_es_title",
      gallery: "resume-cert"
    },
    leadership: {
      src: "assets/img/dossiers/leadership.jpg",
      titleKey: "resume_cert_leadership_title",
      gallery: "resume-cert"
    }
  };

  const GALLERIES = {
    "resume-cv": ["cv-en", "cv-fr"],
    "resume-cert": ["embedded-systems", "leadership"]
  };

  let currentId = null;
  let scale = 1;
  let dialogEl = null;
  let imgEl = null;
  let titleEl = null;
  let toastEl = null;
  let lastFocus = null;

  function translate(key) {
    if (typeof t === "function") return t(key);
    return key;
  }

  function absoluteAssetUrl(path) {
    return new URL(path, window.location.href).href;
  }

  function galleryIdsFor(id) {
    const item = MEDIA[id];
    if (!item) return [id];
    return GALLERIES[item.gallery] || [id];
  }

  function setScale(next) {
    scale = Math.min(4, Math.max(0.5, next));
    if (imgEl) imgEl.style.transform = "scale(" + scale + ")";
  }

  function updateNavButtons(prevBtn, nextBtn) {
    const ids = galleryIdsFor(currentId);
    const idx = ids.indexOf(currentId);
    const showNav = ids.length > 1;
    prevBtn.hidden = !showNav || idx <= 0;
    nextBtn.hidden = !showNav || idx >= ids.length - 1;
  }

  function renderSlide(id) {
    const item = MEDIA[id];
    if (!item || !dialogEl) return;
    currentId = id;
    titleEl.textContent = translate(item.titleKey);
    imgEl.src = item.src;
    imgEl.alt = translate(item.titleKey);
    setScale(1);
    const downloadEl = dialogEl.querySelector("[data-media-download]");
    if (downloadEl) {
      downloadEl.href = item.src;
      downloadEl.setAttribute("download", item.src.split("/").pop() || "image");
    }
    updateNavButtons(
      dialogEl.querySelector("[data-media-prev]"),
      dialogEl.querySelector("[data-media-next]")
    );
    location.hash = "cert/" + id;
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(function () {
      toastEl.hidden = true;
    }, 2200);
  }

  function copyImageLink() {
    const item = MEDIA[currentId];
    if (!item) return;
    const url = absoluteAssetUrl(item.src);
    const onCopied = function () {
      showToast(translate("media_viewer_copied"));
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(onCopied).catch(function () {
        showToast(translate("media_viewer_copy_failed"));
      });
      return;
    }
    showToast(translate("media_viewer_copy_failed"));
  }

  function stepGallery(delta) {
    const ids = galleryIdsFor(currentId);
    const idx = ids.indexOf(currentId);
    const next = ids[idx + delta];
    if (next) renderSlide(next);
  }

  function openViewer(id) {
    if (!MEDIA[id] || !dialogEl) return;
    lastFocus = document.activeElement;
    renderSlide(id);
    if (!dialogEl.open) dialogEl.showModal();
  }

  function closeViewer() {
    if (!dialogEl || !dialogEl.open) return;
    dialogEl.close();
    if (location.hash.startsWith("#cert/")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function openFromHash() {
    const match = location.hash.match(/^#cert\/([a-z0-9-]+)$/i);
    if (match && MEDIA[match[1]]) openViewer(match[1]);
  }

  function bindControls() {
    dialogEl.querySelector("[data-media-close]").addEventListener("click", closeViewer);
    dialogEl.querySelector("[data-media-zoom-in]").addEventListener("click", function () {
      setScale(scale + 0.25);
    });
    dialogEl.querySelector("[data-media-zoom-out]").addEventListener("click", function () {
      setScale(scale - 0.25);
    });
    dialogEl.querySelector("[data-media-zoom-reset]").addEventListener("click", function () {
      setScale(1);
    });
    dialogEl.querySelector("[data-media-copy]").addEventListener("click", copyImageLink);
    dialogEl.querySelector("[data-media-prev]").addEventListener("click", function () {
      stepGallery(-1);
    });
    dialogEl.querySelector("[data-media-next]").addEventListener("click", function () {
      stepGallery(1);
    });
    dialogEl.addEventListener("click", function (e) {
      if (e.target === dialogEl) closeViewer();
    });
    dialogEl.addEventListener("close", function () {
      currentId = null;
    });
    window.addEventListener("hashchange", openFromHash);
  }

  function bindTriggers() {
    document.addEventListener("click", function (e) {
      const trigger = e.target.closest("[data-media-open]");
      if (!trigger) return;
      e.preventDefault();
      const id = trigger.getAttribute("data-media-id");
      if (id) openViewer(id);
    });
  }

  function refreshTitle() {
    if (!currentId || !titleEl) return;
    const item = MEDIA[currentId];
    if (item) titleEl.textContent = translate(item.titleKey);
  }

  function init() {
    dialogEl = document.getElementById("mediaViewer");
    if (!dialogEl) return;
    imgEl = dialogEl.querySelector("[data-media-image]");
    titleEl = dialogEl.querySelector("[data-media-title]");
    toastEl = dialogEl.querySelector("[data-media-toast]");
    bindControls();
    bindTriggers();
    openFromHash();
    document.getElementById("langToggle")?.addEventListener("click", function () {
      window.setTimeout(refreshTitle, 0);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.openMediaViewer = openViewer;
})();
