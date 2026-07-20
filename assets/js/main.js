(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const s = select(el, all);
    if (s) {
      if (all) s.forEach(e => e.addEventListener(type, listener));
      else s.addEventListener(type, listener);
    }
  };

  const onscroll = (el, listener) => el.addEventListener("scroll", listener);

  // Navbar active state (in-page anchors only)
  let navbarlinks = select("#navbar .scrollto[href^='#']", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", () => {
    if (navbarlinks.length) navbarlinksActive();
  });
  if (navbarlinks.length) onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({ top: elementPos, behavior: "smooth" });
  };

  // Back to top
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggle = () => {
      backtotop.classList.toggle("active", window.scrollY > 100);
    };
    window.addEventListener("load", toggle);
    onscroll(document, toggle);
  }

  // Mobile nav
  on("click", ".mobile-nav-toggle", function (e) {
    const isOpen = select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
    this.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Scrollto links
  on("click", ".scrollto", function (e) {
    if (!this.hash || this.hash.length < 2 || !select(this.hash)) return;
      e.preventDefault();
    let body = select("body");
    if (body.classList.contains("mobile-nav-active")) {
      body.classList.remove("mobile-nav-active");
      let toggle = select(".mobile-nav-toggle");
      toggle.classList.toggle("bi-list");
      toggle.classList.toggle("bi-x");
      toggle.setAttribute("aria-expanded", "false");
      }
      scrollto(this.hash);
  }, true);

  // Hash on load
  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  // After the first full load in this tab, skip the preloader on later navigations (MPA).
  window.addEventListener(
    "load",
    () => {
      try {
        sessionStorage.setItem("sama_booted", "1");
      } catch (_e) {
        /* private mode or quota */
      }
    },
    { once: true }
  );

  function shouldSkipPreloader() {
    try {
      const nav = performance.getEntriesByType("navigation")[0];
      if (nav && nav.type === "reload") return false;
      return sessionStorage.getItem("sama_booted") === "1";
    } catch (_e) {
      return false;
    }
  }

  // Preloader with safety timeout
  let preloader = select("#preloader");
  if (preloader) {
    const remove = () => {
      if (preloader.parentNode) preloader.remove();
    };
    if (shouldSkipPreloader()) {
      remove();
    } else {
      if (!preloader.querySelector(".loader")) {
        const loader = document.createElement("span");
        loader.className = "loader";
        loader.setAttribute("aria-hidden", "true");
        preloader.appendChild(loader);
      }
      // Hide when the full page load finishes; if that never fires, force-remove after 4s max.
      window.addEventListener("load", remove);
      setTimeout(remove, 4000);
    }
  }

  // Typed.js hero: deferred to DOMContentLoaded via the init block below
  function reinitHeroRoleTyped() {
    if (typeof Typed === "undefined" || typeof t !== "function") return;
    const el = select(".hero-role-typed");
    if (!el) return;
    const prev = el._typed;
    if (prev && typeof prev.destroy === "function") prev.destroy();
    const raw = t("hero_role_typed_items");
    const strings = raw.split("|").map((s) => s.trim()).filter(Boolean);
    if (!strings.length) return;
    el._typed = new Typed(".hero-role-typed", {
      strings,
      loop: true,
      typeSpeed: 75,
      backSpeed: 40,
      backDelay: 2200,
      smartBackspace: true
    });
  }

  // GLightbox
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".portfolio-lightbox" });
    GLightbox({ selector: ".portfolio-details-lightbox", width: "90%", height: "90vh" });
  }

  // Swiper testimonials
  if (typeof Swiper !== "undefined" && select(".testimonials-slider")) {
    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      slidesPerView: "auto",
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: true }
    });
  }

  function initPortfolioDetailSwipers() {
    if (typeof Swiper === "undefined") return;
    document.querySelectorAll(".portfolio-details-slider.swiper").forEach(root => {
      const wrapper = root.querySelector(".swiper-wrapper");
      const pagination = root.querySelector(".swiper-pagination");
      const slides = root.querySelectorAll(".swiper-slide");
      if (!wrapper || !pagination || !slides.length) return;

      const multi = slides.length > 1;
      let navPrev = null;
      let navNext = null;
      let scrollbarEl = null;

      if (multi) {
        scrollbarEl = document.createElement("div");
        scrollbarEl.className = "swiper-scrollbar portfolio-slider-scrollbar";
        scrollbarEl.setAttribute("data-i18n-title", "project_slider_scroll_hint");
        scrollbarEl.title = typeof t === "function" ? t("project_slider_scroll_hint") : "";

        const navRow = document.createElement("div");
        navRow.className = "portfolio-slider-nav";
        navPrev = document.createElement("button");
        navPrev.type = "button";
        navPrev.className = "swiper-button-prev portfolio-slider-btn";
        navPrev.setAttribute("aria-label", typeof t === "function" ? t("project_slider_prev") : "Previous");
        navPrev.innerHTML = '<i class="bi bi-chevron-left" aria-hidden="true"></i>';
        navNext = document.createElement("button");
        navNext.type = "button";
        navNext.className = "swiper-button-next portfolio-slider-btn";
        navNext.setAttribute("aria-label", typeof t === "function" ? t("project_slider_next") : "Next");
        navNext.innerHTML = '<i class="bi bi-chevron-right" aria-hidden="true"></i>';
        navRow.append(navPrev, pagination, navNext);
        root.insertBefore(scrollbarEl, wrapper);
        root.insertBefore(navRow, scrollbarEl);
      }

      const config = {
        speed: 500,
        loop: multi,
        slidesPerView: 1,
        autoHeight: true,
        grabCursor: multi,
        pagination: { el: pagination, clickable: true }
      };
      if (multi && navPrev && navNext && scrollbarEl) {
        config.navigation = { prevEl: navPrev, nextEl: navNext };
        config.scrollbar = { el: scrollbarEl, draggable: true };
      }
      new Swiper(root, config);
    });
  }

  initPortfolioDetailSwipers();

  // AOS: init on DOM ready so scroll animations work before window "load" (images/fonts).
  // Overview felt slow because init waited for full load; other pages benefited less visibly.
  function initAOS() {
    if (typeof AOS === "undefined") return;
    AOS.init({ duration: 400, easing: "ease-out", once: true, mirror: false });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAOS);
  } else {
    initAOS();
  }
  window.addEventListener("load", () => {
    if (typeof AOS !== "undefined") AOS.refresh();
  });

  // PureCounter
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  // Language toggle
  function initLangToggle() {
    const btn = document.getElementById("langToggle");
    if (!btn) return;
    btn.textContent = getLang().toUpperCase();

    btn.addEventListener("click", () => {
      const next = getLang() === "en" ? "fr" : "en";
      setLang(next);
      btn.textContent = next.toUpperCase();
      applyI18n();
      applyLiveCatalogBadges();
      refreshProjectsRepoI18n();
      if (typeof refreshImpactContributionLocale === "function") {
        refreshImpactContributionLocale();
      }
      reinitHeroRoleTyped();
      // Re-init typed with new language
      const typedEl = select(".typed");
      if (typedEl && typeof Typed !== "undefined") {
        const instance = typedEl._typed;
        if (instance) instance.destroy();
        let items = t("hero_typed_items").split(",").map(s => s.trim());
        const newTyped = new Typed(".typed", {
          strings: items,
          loop: true,
          typeSpeed: 80,
          backSpeed: 40,
          backDelay: 2000
        });
        typedEl._typed = newTyped;
      }
    });
  }

  // Color theme toggle
  function updateThemeToggleIcon(btn) {
    const isLight = (typeof getTheme === "function" ? getTheme() : "dark") === "light";
    const icon = btn.querySelector("i");
    if (icon) {
      icon.className = isLight ? "bi bi-moon-stars" : "bi bi-sun";
    }
  }

  function initThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn || typeof getTheme !== "function" || typeof setTheme !== "function") return;
    updateThemeToggleIcon(btn);
    btn.addEventListener("click", () => {
      const next = getTheme() === "light" ? "dark" : "light";
      setTheme(next);
      updateThemeToggleIcon(btn);
      if (typeof AOS !== "undefined") AOS.refresh();
    });
  }

  // Contact form
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const status = document.getElementById("form-status");
      if (!status) return;
      status.textContent = "";
      const fd = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: fd,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = t("contact_success");
            form.reset();
            return null;
          }
          return response
            .json()
            .catch(function () {
              return null;
            })
            .then(function (body) {
              if (body && Array.isArray(body.errors)) {
                const parts = body.errors
                  .map(function (e) {
                    return e && e.message != null ? String(e.message) : "";
                  })
                  .filter(Boolean);
                status.textContent = parts.length ? parts.join(" - ") : t("contact_error");
              } else {
                status.textContent = t("contact_error");
              }
            });
        })
        .catch(function () {
          status.textContent = t("contact_error");
        });
    });
  }

  function languageLabelKey(canonical) {
    if (canonical === "Python") return "code_lang_python";
    if (canonical === "Dart") return "code_lang_dart";
    if (canonical === "TypeScript") return "code_lang_typescript";
    return null;
  }

  function displayLanguageLabel(canonical) {
    const k = languageLabelKey(canonical);
    return k ? t(k) : canonical;
  }

  function filterTypeDisplay(v) {
    if (v === "All") return t("repo_filter_value_all");
    if (v === "AI") return t("repo_filter_type_ai");
    if (v === "Mobile") return t("repo_filter_type_mobile");
    if (v === "Web") return t("repo_filter_type_web");
    return v;
  }

  function filterLanguageDisplay(v) {
    if (v === "All") return t("repo_filter_value_all");
    const k = languageLabelKey(v);
    return k ? t(k) : v;
  }

  function filterSortDisplay(v) {
    if (v === "Updated") return t("repo_sort_updated");
    if (v === "Name") return t("repo_sort_name");
    return v;
  }

  function repoTypeLabelKey(type) {
    if (type === "AI") return "repo_filter_type_ai";
    if (type === "Mobile") return "repo_filter_type_mobile";
    if (type === "Web") return "repo_filter_type_web";
    return "repo_filter_value_all";
  }

  function getProjectMetaConfig() {
    return {
      proj_kirundi_title: { language: "Python", type: "AI", status: "repo_status_flagship", tags: ["tag_data_eng", "tag_open_source"], order: 1 },
      proj_velora_title: { language: "Dart", type: "Mobile", status: "repo_status_revenue", tags: ["tag_dart", "tag_productivity", "tag_mobile", "tag_flutter"], order: 2 },
      proj_esama_title: { language: "Dart", type: "Mobile", status: "repo_status_revenue", tags: ["tag_flutter", "tag_saas", "tag_paying_users"], order: 3 },
      proj_fabwash_title: { language: "Dart", type: "Mobile", status: "repo_status_revenue", tags: ["tag_flutter", "tag_b2b", "tag_deployed"], order: 4 },
      proj_notifspy_title: { language: "Dart", type: "Mobile", status: "repo_status_dev", tags: ["tag_mobile", "tag_flutter", "tag_utility"], order: 5 },
      proj_contrib_title: { language: "TypeScript", type: "Web", status: "repo_status_deployed", tags: ["tag_ai", "tag_data_eng"], order: 6 },
      proj_langid_title: { language: "Python", type: "AI", status: "repo_status_deployed", tags: ["tag_nlp", "tag_classification"], order: 7 },
      proj_tasky_title: { language: "TypeScript", type: "Web", status: "repo_status_deployed", tags: ["tag_browser_ext"], order: 8 },
      proj_interview_title: { language: "Python", type: "AI", status: "repo_status_deployed", tags: ["tag_ai", "tag_chatbot", "tag_hr_tech"], order: 9 },
      proj_devswarm_title: { language: "Python", type: "AI", status: "repo_status_learning", tags: ["tag_multi_agent"], order: 10 },
      proj_rag_title: { language: "Python", type: "AI", status: "repo_status_learning", tags: ["tag_enterprise_ai"], order: 11 },
      proj_sdr_title: { language: "Python", type: "AI", status: "repo_status_learning", tags: ["tag_autonomous_agent"], order: 12 },
      proj_opsmanager_title: { language: "Python", type: "AI", status: "repo_status_learning", tags: ["tag_multi_agent", "tag_autonomous_agent"], order: 13 },
      proj_scholarship_title: { language: "Python", type: "AI", status: "repo_status_learning", tags: ["tag_autonomous_agent", "tag_ai"], order: 14 },
      proj_ade_title: { language: "Python", type: "AI", status: "repo_status_learning", tags: ["tag_autonomous_agent", "tag_ai"], order: 15 },
      proj_sentinel_title: { language: "Python", type: "AI", status: "repo_status_learning", tags: ["tag_cybersecurity"], order: 16 },
      proj_aiclone_title: { language: "Python", type: "AI", status: "repo_status_learning", tags: ["tag_ai", "tag_rag"], order: 17 },
      proj_llmsem_title: { language: "Python", type: "AI", status: "repo_status_research", tags: ["tag_nlp", "tag_research"], order: 18 },
      proj_samakod_title: { language: "TypeScript", type: "Web", status: "repo_status_deployed", tags: ["tag_utility", "tag_deployed", "tag_open_source"], order: 19 },
      proj_samaapps_title: { language: "Dart", type: "Mobile", status: "repo_status_deployed", tags: ["tag_flutter", "tag_saas", "tag_deployed"], order: 98 },
      proj_samaweb_title: { language: "TypeScript", type: "Web", status: "repo_status_deployed", tags: ["tag_saas", "tag_deployed"], order: 99 }
    };
  }

  function getPortfolioProjectCount() {
    return Object.keys(getProjectMetaConfig()).length;
  }

  function initNavProjectCountBadge() {
    const n = getPortfolioProjectCount();
    document.querySelectorAll('#navbar a.gh-tab[href$="projects.html"]').forEach(tab => {
      let badge = tab.querySelector(".gh-tab-count");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "gh-tab-count";
        badge.setAttribute("aria-hidden", "true");
        tab.appendChild(badge);
      }
      badge.textContent = String(n);
    });
  }

  function buildGraphPath() {
    const pts = [];
    const steps = 20;
    const w = 155;
    const maxH = 28;
    for (let i = 0; i <= steps; i++) {
      const x = Math.round((i / steps) * w);
      const y = Math.round(4 + Math.random() * (maxH - 4));
      pts.push(`${x},${y}`);
    }
    return "M" + pts.join(" L");
  }

  function fetchLiveUserCounts() {
    const gists = [
      { gistId: "0250417d63c891faf03a52909d6010e4", file: "e_sama_admin_sync.json", cls: "esama-user-badge" },
      { gistId: "b806e5a54d4cf1a24b23ce2bfc4c5116", file: "velora_admin_sync.json", cls: "velora-user-badge" }
    ];
    function gistUserCount(src) {
      return fetch("https://api.github.com/gists/" + src.gistId)
        .then(r => (r.ok ? r.json() : null))
        .then(gist => {
          if (!gist || !gist.files || !gist.files[src.file]) return 0;
          const data = JSON.parse(gist.files[src.file].content);
          return Array.isArray(data) ? data.length : 0;
        })
        .catch(() => 0);
    }
    Promise.all(gists.map(gistUserCount)).then(counts => {
      let sum = 0;
      counts.forEach((count, i) => {
        sum += count;
        if (count > 0) {
          document.querySelectorAll("." + gists[i].cls).forEach(el => {
            el.textContent = String(count);
          });
        }
      });
      if (sum > 0) {
        document.querySelectorAll(".sama-apps-user-badge").forEach(el => {
          if (!el.closest(".gh-achievement-count")) {
            el.textContent = String(sum);
          }
        });
      }
    });
  }

  const SAMA_MOBILE_APPS_URL = "https://apps.samandari.dev/assets/js/apps.js";
  const SAMA_WEB_APPS_URL = "https://web.samandari.dev/assets/js/apps.js";
  let cachedSamaAppsCatalogCount = 0;
  let cachedSamaWebSiteCount = 0;

  function applyLiveCatalogBadges() {
    if (cachedSamaAppsCatalogCount > 0) {
      document.querySelectorAll(".sama-apps-catalog-badge").forEach(el => {
        el.textContent = String(cachedSamaAppsCatalogCount);
      });
    }
    if (cachedSamaWebSiteCount > 0) {
      document.querySelectorAll(".sama-web-site-badge").forEach(el => {
        el.textContent = String(cachedSamaWebSiteCount);
      });
    }
  }

  function countSamaAppsFromCatalog(text) {
    if (!text) return 0;
    const metaMatch = text.match(/SAMA_APPS_CATALOG\s*=\s*\{[^}]*appCount:\s*(\d+)/);
    if (metaMatch) return Number(metaMatch[1]) || 0;
    const appsBlock = text.match(/const\s+APPS\s*=\s*\[([\s\S]*?)\];/);
    if (!appsBlock) return 0;
    return (appsBlock[1].match(/^\s+id:\s*"/gm) || []).length;
  }

  function countSamaWebSitesFromCatalog(text) {
    if (!text) return 0;
    const metaMatch = text.match(/SAMA_WEB_CATALOG\s*=\s*\{[^}]*websiteCount:\s*(\d+)/);
    if (metaMatch) return Number(metaMatch[1]) || 0;
    const byType = (text.match(/productType:\s*"website"/g) || []).length;
    if (byType) return byType;
    // Fallback: count entries in the `APPS` array (const or var declaration).
    const appsBlock = text.match(/(?:const|var)\s+APPS\s*=\s*\[([\s\S]*?)\];/);
    if (!appsBlock) return 0;
    return (appsBlock[1].match(/^\s+id:\s*"/gm) || []).length;
  }

  function fetchSamaAppsCatalogCount() {
    fetch(SAMA_MOBILE_APPS_URL)
      .then(r => (r.ok ? r.text() : ""))
      .then(text => {
        const count = countSamaAppsFromCatalog(text);
        if (count > 0) {
          cachedSamaAppsCatalogCount = count;
          applyLiveCatalogBadges();
        }
      })
      .catch(() => {});
  }

  function fetchSamaWebSiteCount() {
    fetch(SAMA_WEB_APPS_URL)
      .then(r => (r.ok ? r.text() : ""))
      .then(text => {
        const count = countSamaWebSitesFromCatalog(text);
        if (count > 0) {
          cachedSamaWebSiteCount = count;
          applyLiveCatalogBadges();
        }
      })
      .catch(() => {});
  }

  function clearRepoDecorationNodes(body) {
    body.querySelector(".gh-repo-head")?.remove();
    body.querySelector(".gh-repo-tags")?.remove();
    body.querySelector(".gh-repo-meta")?.remove();
    body.querySelector(".gh-repo-links")?.remove();
  }

  function wireRepoCardClick(card, primaryLink) {
    if (!card || card.dataset.ghRepoClickBound === "1") return;
    card.dataset.ghRepoClickBound = "1";
    card.style.cursor = "pointer";
    card.addEventListener("click", e => {
      if (e.target.closest("a, button")) return;
      window.open(primaryLink.href, primaryLink.target || "_self");
    });
  }

  function buildRepoStarRow() {
    const starRow = document.createElement("div");
    starRow.className = "gh-star-row";
    const starBtn = document.createElement("button");
    starBtn.type = "button";
    starBtn.className = "gh-star-btn";
    const svgStar =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>';
    starBtn.innerHTML = svgStar;
    const starLbl = document.createElement("span");
    starLbl.textContent = t("repo_star_btn");
    starBtn.appendChild(starLbl);
    const caretBtn = document.createElement("button");
    caretBtn.type = "button";
    caretBtn.className = "gh-star-caret";
    caretBtn.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path></svg>';
    starRow.append(starBtn, caretBtn);
    return starRow;
  }

  function buildRepoTagsRow(tags) {
    const wrap = document.createElement("div");
    wrap.className = "gh-repo-tags";
    (tags || []).forEach(tagKey => {
      const chip = document.createElement("span");
      chip.className = "gh-repo-tag";
      chip.setAttribute("data-i18n", tagKey);
      chip.textContent = t(tagKey);
      wrap.appendChild(chip);
    });
    return wrap;
  }

  function collectProjectActionLinks(body, actionsEl) {
    const existingLinks = body.querySelector(".gh-repo-links");
    if (existingLinks) {
      return Array.from(existingLinks.querySelectorAll("a[href]"));
    }
    if (!actionsEl) return [];
    return Array.from(actionsEl.querySelectorAll("a[href]"));
  }

  function buildRepoActionsRow(actionsEl, item, metaRow, actionAnchors) {
    const anchors = actionAnchors?.length
      ? actionAnchors
      : Array.from(actionsEl.querySelectorAll("a[href]"));
    const primaryLink = anchors[0];
    if (primaryLink) wireRepoCardClick(item.querySelector(".project-card"), primaryLink);

    const linksWrap = document.createElement("div");
    linksWrap.className = "gh-repo-links";
    anchors.forEach(anchor => linksWrap.appendChild(anchor.cloneNode(true)));
    metaRow.insertAdjacentElement("afterend", linksWrap);

    actionsEl.innerHTML = "";
    const graphSvg = document.createElement("span");
    graphSvg.className = "gh-repo-graph";
    graphSvg.innerHTML = `<svg width="155" height="28" viewBox="0 0 155 28"><path d="${buildGraphPath()}" fill="none" stroke="#2ea043" stroke-width="1.5" opacity="0.5"/></svg>`;
    actionsEl.append(buildRepoStarRow(), graphSvg);
  }

  function renderRepoDecorations(item, meta) {
    const body = item.querySelector(".project-card__body");
    const titleEl = item.querySelector(".project-card__title");
    const catEl = item.querySelector(".project-card__category");
    if (!body || !titleEl || !catEl) return;

    const actionsEl = body.querySelector(".project-card__actions");
    const actionAnchors = collectProjectActionLinks(body, actionsEl);

    clearRepoDecorationNodes(body);
    catEl.style.display = "none";

    const head = document.createElement("div");
    head.className = "gh-repo-head";
    const badge = document.createElement("span");
    badge.className = "gh-repo-visibility";
    badge.setAttribute("data-i18n", meta.status);
    badge.textContent = t(meta.status);
    head.append(titleEl, badge);
    body.insertBefore(head, body.firstChild);

    const tagsWrap = buildRepoTagsRow(meta.tags);
    const desc = body.querySelector(".project-card__desc");
    if (desc) desc.insertAdjacentElement("afterend", tagsWrap);

    const langLabel = displayLanguageLabel(meta.language);
    const metaRow = document.createElement("div");
    metaRow.className = "gh-repo-meta";
    metaRow.innerHTML = `<span class="gh-lang-dot" data-lang="${meta.language}"></span><span class="gh-repo-lang-label"></span>`;
    metaRow.querySelector(".gh-repo-lang-label").textContent = langLabel;
    const typeKey = repoTypeLabelKey(meta.type);
    const typeBadge = document.createElement("span");
    typeBadge.className = "gh-repo-type";
    typeBadge.dataset.type = meta.type;
    typeBadge.setAttribute("data-i18n", typeKey);
    typeBadge.textContent = t(typeKey);
    metaRow.appendChild(typeBadge);
    tagsWrap.insertAdjacentElement("afterend", metaRow);

    if (actionsEl) buildRepoActionsRow(actionsEl, item, metaRow, actionAnchors);

    item.dataset.repoLanguage = meta.language;
    item.dataset.repoType = meta.type;
    item.dataset.repoOrder = String(meta.order);
    item.dataset.repoText = [
      titleEl.textContent || "",
      desc ? desc.textContent || "" : "",
      (meta.tags || []).map(k => t(k)).join(" ")
    ].join(" ").toLowerCase();
  }

  function closeRepoFilterDropdowns(dropdowns) {
    dropdowns.forEach((d) => d.classList.remove("is-open"));
  }

  function syncRepoFilterButtonLabels(state, typeBtn, languageBtn, sortBtn) {
    typeBtn.textContent = `${t("repo_filter_type")}: ${filterTypeDisplay(state.type)}`;
    languageBtn.textContent = `${t("repo_filter_language")}: ${filterLanguageDisplay(state.language)}`;
    sortBtn.textContent = `${t("repo_filter_sort")}: ${filterSortDisplay(state.sort)}`;
  }

  function applyRepoFiltersAndSort(container, state) {
    const items = [...container.querySelectorAll(".portfolio-item")];
    items.forEach((item) => {
      const matchesQuery = (item.dataset.repoText || "").includes(state.query);
      const matchesType = state.type === "All" || item.dataset.repoType === state.type;
      const matchesLanguage = state.language === "All" || item.dataset.repoLanguage === state.language;
      item.style.display = matchesQuery && matchesType && matchesLanguage ? "" : "none";
    });
    const visible = items.filter((item) => item.style.display !== "none");
    visible.sort((a, b) => {
      if (state.sort === "Name") {
        const aName = a.querySelector(".project-card__title")?.textContent || "";
        const bName = b.querySelector(".project-card__title")?.textContent || "";
        return aName.localeCompare(bName);
      }
      return Number(a.dataset.repoOrder || "999") - Number(b.dataset.repoOrder || "999");
    });
    visible.forEach((item) => container.appendChild(item));
  }

  function setupRepoFilters(container) {
    const searchInput = document.querySelector(".gh-repo-search");
    const typeDropdown = document.querySelector(".gh-repo-dropdown[data-filter-kind='type']");
    const languageDropdown = document.querySelector(".gh-repo-dropdown[data-filter-kind='language']");
    const sortDropdown = document.querySelector(".gh-repo-dropdown[data-filter-kind='sort']");
    if (!searchInput || !typeDropdown || !languageDropdown || !sortDropdown) return;

    const typeBtn = typeDropdown.querySelector(".gh-repo-filter");
    const languageBtn = languageDropdown.querySelector(".gh-repo-filter");
    const sortBtn = sortDropdown.querySelector(".gh-repo-filter");
    const allDropdowns = [typeDropdown, languageDropdown, sortDropdown];
    const state = { query: "", type: "All", language: "All", sort: "Updated" };

    const runFilters = () => applyRepoFiltersAndSort(container, state);

    searchInput.addEventListener("input", (e) => {
      state.query = e.target.value.trim().toLowerCase();
      runFilters();
    });

    allDropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".gh-repo-filter");
      const menuButtons = dropdown.querySelectorAll(".gh-repo-menu button");
      trigger.addEventListener("click", () => {
        closeRepoFilterDropdowns(allDropdowns);
        dropdown.classList.toggle("is-open");
      });
      menuButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const value = btn.getAttribute("data-value") || "All";
          const kind = dropdown.getAttribute("data-filter-kind");
          if (kind === "type") state.type = value;
          if (kind === "language") state.language = value;
          if (kind === "sort") state.sort = value;
          dropdown.classList.remove("is-open");
          syncRepoFilterButtonLabels(state, typeBtn, languageBtn, sortBtn);
          runFilters();
        });
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".gh-repo-dropdown")) closeRepoFilterDropdowns(allDropdowns);
    });

    syncRepoFilterButtonLabels(state, typeBtn, languageBtn, sortBtn);
    container._samaRepoFilters = { state, typeBtn, languageBtn, sortBtn };
    runFilters();
  }

  function refreshProjectsRepoI18n() {
    const container = document.querySelector(
      "html[data-app-page='projects'] #projects .portfolio-container"
    );
    if (!container || !container._samaRepoFilters) return;
    const { state, typeBtn, languageBtn, sortBtn } = container._samaRepoFilters;
    const config = getProjectMetaConfig();
    syncRepoFilterButtonLabels(state, typeBtn, languageBtn, sortBtn);
    container.querySelectorAll(".portfolio-item").forEach(item => {
      const key = item.querySelector(".project-card__title")?.getAttribute("data-i18n");
      if (!key || !config[key]) return;
      renderRepoDecorations(item, config[key]);
    });
    applyRepoFiltersAndSort(container, state);
  }

  function initGhServicesMoreHint() {
    const wrap = document.querySelector(".gh-svc-more-wrap");
    const thinking = document.getElementById("thinking");
    if (!wrap || !thinking) return;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.some((e) => e.isIntersecting);
        wrap.classList.toggle("gh-svc-more-wrap--concealed", seen);
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );
    io.observe(thinking);
  }

  function initProjectsRepositoryUI() {
    const container = document.querySelector("html[data-app-page='projects'] #projects .portfolio-container");
    if (!container) return;
    const config = getProjectMetaConfig();
    const items = Array.from(container.querySelectorAll(".portfolio-item"));
    items.forEach(item => {
      const key = item.querySelector(".project-card__title")?.getAttribute("data-i18n");
      if (!key || !config[key]) return;
      renderRepoDecorations(item, config[key]);
    });
    items.sort((a, b) => Number(a.dataset.repoOrder || "999") - Number(b.dataset.repoOrder || "999"));
    items.forEach(item => container.appendChild(item));
    setupRepoFilters(container);
  }

  // Init on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    applyI18n();
    initNavProjectCountBadge();
    initLangToggle();
    initThemeToggle();
    initContactForm();
    initGhServicesMoreHint();
    initProjectsRepositoryUI();
    fetchLiveUserCounts();
    fetchSamaAppsCatalogCount();
    fetchSamaWebSiteCount();

    const impactRoot = document.getElementById("impact-section");
    if (impactRoot) {
      impactRoot.dataset.projectCount = String(getPortfolioProjectCount());
    }
    if (typeof initOverviewImpact === "function") {
      initOverviewImpact();
    }

    // Typed.js hero (legacy `.typed` blocks)
    const heroTyped = select(".typed");
    if (heroTyped && typeof Typed !== "undefined") {
      let items = t("hero_typed_items").split(",").map(s => s.trim());
      let heroTypedInstance = new Typed(".typed", {
        strings: items,
        loop: true,
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000
      });
      heroTyped._typed = heroTypedInstance;
    }

    reinitHeroRoleTyped();

    // Languages typed in About section
    const langTyped = select(".lang-typed");
    if (langTyped && typeof Typed !== "undefined") {
      const langStrings = t("hero_langs_typed_items")
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
      if (langStrings.length) {
        new Typed(".lang-typed", {
          strings: langStrings,
          typeSpeed: 70,
          backSpeed: 35,
          backDelay: 1800,
          loop: true
        });
      }
    }

    // Asyst tech typed
    const asystTyped = select(".asyst-tech");
    if (asystTyped && typeof Typed !== "undefined") {
      new Typed(".asyst-tech", {
        strings: ["Python", "NestJS", "FastAPI", "Vector Databases", "OpenAI", "Swagger"],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
      });
    }
  });
})();

// Dynamic year and experience
const currentYear = new Date().getFullYear();
const yearEl = document.getElementById("current_year");
if (yearEl) yearEl.innerText = currentYear;

document.querySelectorAll(".it_experience").forEach(el => {
  el.innerText = currentYear - 2022;
});

