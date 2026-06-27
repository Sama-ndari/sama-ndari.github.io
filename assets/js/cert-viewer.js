(function () {
  const MEDIA = {
    "cv-en": { src: "assets/img/portfolio/cv_en.webp", titleKey: "resume_cv_en", gallery: "resume-cv" },
    "cv-fr": { src: "assets/img/portfolio/cv_fr.webp", titleKey: "resume_cv_fr", gallery: "resume-cv" },
    "embedded-systems": {
      src: "assets/img/dossiers/es.webp",
      titleKey: "resume_cert_es_title",
      gallery: "resume-cert"
    },
    leadership: {
      src: "assets/img/dossiers/leadership.webp",
      titleKey: "resume_cert_leadership_title",
      gallery: "resume-cert"
    },
    "diplome-etat": {
      src: "assets/img/dossiers/diplome-etat.webp",
      titleKey: "resume_diploma_etat_title",
      gallery: "resume-diploma"
    },
    "diplome-humanites": {
      src: "assets/img/dossiers/diplome-humanites-a2.webp",
      titleKey: "resume_diploma_humanites_title",
      gallery: "resume-diploma"
    },
    "asyst-attestation": {
      src: "assets/docs/attestation-asyst.pdf",
      titleKey: "resume_exp_asyst_attestation_title",
      type: "pdf"
    }
  };

  const GALLERIES = {
    "resume-cv": ["cv-en", "cv-fr"],
    "resume-cert": ["embedded-systems", "leadership"],
    "resume-diploma": ["diplome-etat", "diplome-humanites"]
  };

  let currentId = null;
  let scale = 1;
  let dialogEl = null;
  let imgEl = null;
  let pdfEl = null;
  let pdfFallbackEl = null;
  let canvasEl = null;
  let toolbarEl = null;
  let titleEl = null;
  let toastEl = null;
  let lastFocus = null;
  let imageRequestId = 0;

  function translate(key) {
    if (typeof t === "function") return t(key);
    return key;
  }

  function absoluteAssetUrl(path) {
    return new URL(path, window.location.href).href;
  }

  function isPdfItem(item) {
    return item && (item.type === "pdf" || /\.pdf$/i.test(item.src));
  }

  function isMobilePdfFallback() {
    return window.matchMedia("(max-width: 767px)").matches;
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

  function setCanvasLoading(loading) {
    if (canvasEl) canvasEl.classList.toggle("media-viewer__canvas--loading", loading);
  }

  function clearImageMedia() {
    if (!imgEl) return;
    imageRequestId += 1;
    imgEl.onload = null;
    imgEl.onerror = null;
    imgEl.removeAttribute("src");
    imgEl.alt = "";
    imgEl.hidden = true;
    imgEl.style.transform = "";
  }

  function loadImageMedia(src, label) {
    const requestId = imageRequestId + 1;
    imageRequestId = requestId;
    imgEl.alt = label;
    imgEl.hidden = true;
    setCanvasLoading(true);
    imgEl.onload = function () {
      if (requestId !== imageRequestId) return;
      imgEl.hidden = false;
      setCanvasLoading(false);
      setScale(1);
      imgEl.onload = null;
      imgEl.onerror = null;
    };
    imgEl.onerror = function () {
      if (requestId !== imageRequestId) return;
      imgEl.hidden = false;
      setCanvasLoading(false);
      imgEl.onload = null;
      imgEl.onerror = null;
    };
    imgEl.src = src;
  }

  function setPdfMode(active, label, src) {
    if (toolbarEl) toolbarEl.hidden = active;
    const mobilePdf = active && isMobilePdfFallback();
    if (canvasEl) {
      canvasEl.classList.toggle("media-viewer__canvas--pdf", active && !mobilePdf);
      canvasEl.classList.toggle("media-viewer__canvas--pdf-fallback", mobilePdf);
    }
    if (!imgEl || !pdfEl) return;
    if (active) {
      clearImageMedia();
      if (mobilePdf && pdfFallbackEl) {
        pdfEl.hidden = true;
        pdfEl.removeAttribute("src");
        pdfFallbackEl.hidden = false;
        const labelEl = pdfFallbackEl.querySelector("[data-media-pdf-label]");
        if (labelEl) labelEl.textContent = label || "";
        const downloadBtn = pdfFallbackEl.querySelector("[data-media-pdf-download]");
        if (downloadBtn && src) {
          downloadBtn.href = src;
          downloadBtn.setAttribute("download", src.split("/").pop() || "document");
        }
      } else {
        if (pdfFallbackEl) pdfFallbackEl.hidden = true;
        pdfEl.hidden = false;
        if (src) {
          pdfEl.src = src;
          pdfEl.title = label || "";
        }
      }
      return;
    }
    pdfEl.hidden = true;
    pdfEl.removeAttribute("src");
    if (pdfFallbackEl) pdfFallbackEl.hidden = true;
    if (canvasEl) {
      canvasEl.classList.remove("media-viewer__canvas--pdf-fallback");
    }
    setCanvasLoading(false);
  }

  function renderSlide(id) {
    const item = MEDIA[id];
    if (!item || !dialogEl) return;
    currentId = id;
    const label = translate(item.titleKey);
    titleEl.textContent = label;
    setScale(1);

    const downloadEl = dialogEl.querySelector("[data-media-download]");
    if (downloadEl) {
      downloadEl.href = item.src;
      downloadEl.setAttribute("download", item.src.split("/").pop() || "document");
    }

    if (isPdfItem(item)) {
      setPdfMode(true, label, item.src);
      location.hash = "cert/" + id;
      return;
    }

    setPdfMode(false);
    loadImageMedia(item.src, label);
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
    dialogEl.querySelector("[data-media-pdf-open]")?.addEventListener("click", function () {
      const item = MEDIA[currentId];
      if (!item) return;
      window.open(absoluteAssetUrl(item.src), "_blank", "noopener,noreferrer");
    });
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
      setPdfMode(false);
      clearImageMedia();
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
    if (!item) return;
    const label = translate(item.titleKey);
    titleEl.textContent = label;
    if (isPdfItem(item) && isMobilePdfFallback() && pdfFallbackEl) {
      const labelEl = pdfFallbackEl.querySelector("[data-media-pdf-label]");
      if (labelEl) labelEl.textContent = label;
    }
  }

  function init() {
    dialogEl = document.getElementById("mediaViewer");
    if (!dialogEl) return;
    imgEl = dialogEl.querySelector("[data-media-image]");
    pdfEl = dialogEl.querySelector("[data-media-pdf]");
    pdfFallbackEl = dialogEl.querySelector("[data-media-pdf-fallback]");
    canvasEl = dialogEl.querySelector("[data-media-canvas]");
    toolbarEl = dialogEl.querySelector("[data-media-toolbar]");
    titleEl = dialogEl.querySelector("[data-media-title]");
    toastEl = dialogEl.querySelector("[data-media-toast]");
    clearImageMedia();
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
