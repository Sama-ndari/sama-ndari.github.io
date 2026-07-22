/**
 * GitHub-style command palette: / shortcut, navigation, projects, externals.
 * Requires global t() and getLang() from i18n.js.
 */
(function () {
  "use strict";

  const NAV_PAGES = [
    { id: "nav-overview", i18n: "gh_tab_overview", page: "index.html", icon: "bi-book", group: "command_group_nav" },
    { id: "nav-projects", i18n: "nav_projects", page: "projects.html", icon: "bi-kanban", group: "command_group_nav" },
    { id: "nav-resume", i18n: "nav_resume", page: "resume.html", icon: "bi-file-earmark-text", group: "command_group_nav" },
    { id: "nav-services", i18n: "nav_services", page: "services.html", icon: "bi-briefcase", group: "command_group_nav" },
    { id: "nav-contact", i18n: "nav_contact", page: "contact.html", icon: "bi-envelope", group: "command_group_nav" },
    { id: "nav-clone", i18n: "nav_clone", page: "ai.html", icon: "bi-chat-dots", group: "command_group_nav", keywords: "ai clone chat assistant" }
  ];

  const PROJECT_TITLE_KEYS = [
    "proj_kirundi_title",
    "proj_esama_title",
    "proj_tasky_title",
    "proj_samakod_title",
    "proj_velora_title",
    "proj_fabwash_title",
    "proj_contrib_title",
    "proj_langid_title",
    "proj_notifspy_title",
    "proj_devswarm_title",
    "proj_rag_title",
    "proj_sdr_title",
    "proj_opsmanager_title",
    "proj_scholarship_title",
    "proj_ade_title",
    "proj_sentinel_title",
    "proj_llmsem_title",
    "proj_aiclone_title",
    "proj_interview_title",
    "proj_samaapps_title",
    "proj_samaweb_title"
  ];

  const EXTERNAL_LINKS = [
    { id: "ext-github", i18n: "command_ext_github", href: "https://github.com/Sama-ndari", icon: "bi-github", group: "command_group_external", keywords: "github code repo" },
    { id: "ext-hf", i18n: "command_ext_hf", href: "https://huggingface.co/samandari", icon: "bi-robot", group: "command_group_external", keywords: "huggingface hf model" },
    { id: "ext-apps", i18n: "command_ext_apps", href: "https://apps.samandari.dev/", icon: "bi-phone", group: "command_group_external", keywords: "samaapps mobile android" },
    { id: "ext-web", i18n: "command_ext_web", href: "https://web.samandari.dev/", icon: "bi-globe", group: "command_group_external", keywords: "samaweb website" },
    { id: "ext-linkedin", i18n: "gh_link_linkedin", href: "https://www.linkedin.com/in/jules-cesar-junior-ndayisenga-8b79592a8", icon: "bi-linkedin", group: "command_group_external", keywords: "linkedin" }
  ];

  const ACTION_COMMANDS = [
    { id: "action-lang", i18n: "command_action_lang", icon: "bi-translate", group: "command_group_actions", action: "lang" },
    { id: "action-theme", i18n: "command_action_theme", icon: "bi-moon-stars", group: "command_group_actions", action: "theme" }
  ];

  let dialog = null;
  let inputEl = null;
  let resultsEl = null;
  let allItems = [];
  let filteredItems = [];
  let activeIndex = 0;

  function translate(key) {
    return typeof t === "function" ? t(key) : key;
  }

  function getBasePath() {
    const logo = document.querySelector("a.gh-logo");
    if (!logo) return "";
    return (logo.getAttribute("href") || "index.html").replace(/index\.html$/i, "");
  }

  function resolvePageHref(page) {
    return getBasePath() + page;
  }

  function buildSearchText(parts) {
    return parts.filter(Boolean).join(" ").toLowerCase();
  }

  function buildAllItems() {
    const items = [];

    NAV_PAGES.forEach(entry => {
      items.push({
        id: entry.id,
        group: entry.group,
        icon: entry.icon,
        label: translate(entry.i18n),
        hint: entry.page,
        href: resolvePageHref(entry.page),
        search: buildSearchText([entry.i18n, entry.page, translate(entry.i18n)])
      });
    });

    PROJECT_TITLE_KEYS.forEach(key => {
      const label = translate(key);
      items.push({
        id: "project-" + key,
        group: "command_group_projects",
        icon: "bi-kanban",
        label,
        hint: "projects.html",
        href: resolvePageHref("projects.html#" + key),
        search: buildSearchText([key, label, "project repo"])
      });
    });

    EXTERNAL_LINKS.forEach(entry => {
      items.push({
        id: entry.id,
        group: entry.group,
        icon: entry.icon,
        label: translate(entry.i18n),
        hint: entry.href.replace(/^https?:\/\//, ""),
        href: entry.href,
        external: true,
        search: buildSearchText([entry.i18n, entry.keywords, translate(entry.i18n), entry.href])
      });
    });

    ACTION_COMMANDS.forEach(entry => {
      if (entry.action === "theme" && !document.getElementById("themeToggle")) return;
      items.push({
        id: entry.id,
        group: entry.group,
        icon: entry.icon,
        label: translate(entry.i18n),
        hint: "",
        action: entry.action,
        search: buildSearchText([entry.i18n, entry.action, translate(entry.i18n)])
      });
    });

    return items;
  }

  function filterItems(query) {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice();
    const tokens = q.split(/\s+/).filter(Boolean);
    return allItems.filter(item => tokens.every(token => item.search.includes(token)));
  }

  function groupOrder(groupKey) {
    const order = [
      "command_group_nav",
      "command_group_projects",
      "command_group_external",
      "command_group_actions"
    ];
    return order.indexOf(groupKey);
  }

  function renderResults(list) {
    if (!resultsEl) return;
    resultsEl.innerHTML = "";

    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "gh-command-palette__empty";
      empty.textContent = translate("command_no_results");
      resultsEl.appendChild(empty);
      return;
    }

    const groups = new Map();
    list.forEach(item => {
      if (!groups.has(item.group)) groups.set(item.group, []);
      groups.get(item.group).push(item);
    });

    Array.from(groups.entries())
      .sort((a, b) => groupOrder(a[0]) - groupOrder(b[0]))
      .forEach(([groupKey, groupItems]) => {
        const label = document.createElement("div");
        label.className = "gh-command-palette__group-label";
        label.textContent = translate(groupKey);
        resultsEl.appendChild(label);

        groupItems.forEach(item => {
          const idx = list.indexOf(item);
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "gh-command-palette__item" + (idx === activeIndex ? " is-active" : "");
          btn.id = "command-item-" + item.id;
          btn.dataset.index = String(idx);
          btn.innerHTML =
            `<i class="bi ${item.icon}" aria-hidden="true"></i>` +
            `<span class="gh-command-palette__item-label">${item.label}</span>` +
            (item.hint ? `<span class="gh-command-palette__item-hint">${item.hint}</span>` : "");
          btn.addEventListener("click", () => {
            activeIndex = idx;
            executeItem(list[activeIndex]);
          });
          resultsEl.appendChild(btn);
        });
      });
  }

  function syncResults() {
    filteredItems = filterItems(inputEl ? inputEl.value : "");
    if (activeIndex >= filteredItems.length) activeIndex = 0;
    renderResults(filteredItems);
  }

  function isOnProjectsPage() {
    return document.documentElement.getAttribute("data-app-page") === "projects";
  }

  function tryRevealProjectFromHref(href) {
    const hashMatch = href.match(/#(proj_[A-Za-z0-9_]+)$/);
    if (!hashMatch || !isOnProjectsPage() || !href.includes("projects.html")) return false;
    if (typeof window.revealProjectCommandTarget === "function") {
      return window.revealProjectCommandTarget(hashMatch[1]);
    }
    return false;
  }

  function executeItem(item) {
    if (!item) return;
    closePalette();

    if (item.action === "lang") {
      document.getElementById("langToggle")?.click();
      return;
    }
    if (item.action === "theme") {
      document.getElementById("themeToggle")?.click();
      return;
    }
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (tryRevealProjectFromHref(item.href)) return;
    window.location.href = item.href;
  }

  function openPalette() {
    if (!dialog) return;
    allItems = buildAllItems();
    activeIndex = 0;
    if (inputEl) {
      inputEl.value = "";
      inputEl.placeholder = translate("command_palette_input_placeholder");
    }
    syncResults();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "open");
    window.setTimeout(() => inputEl?.focus(), 0);
  }

  function closePalette() {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function isTypingContext(target) {
    if (!target) return false;
    const tag = target.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
  }

  function onDocumentKeydown(event) {
    const isOpen = dialog?.open;

    if (event.key === "/" && !isOpen && !isTypingContext(event.target) && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      openPalette();
      return;
    }

    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = filteredItems.length ? (activeIndex + 1) % filteredItems.length : 0;
      renderResults(filteredItems);
      scrollActiveIntoView();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = filteredItems.length
        ? (activeIndex - 1 + filteredItems.length) % filteredItems.length
        : 0;
      renderResults(filteredItems);
      scrollActiveIntoView();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      executeItem(filteredItems[activeIndex]);
    }
  }

  function scrollActiveIntoView() {
    const active = resultsEl?.querySelector(".gh-command-palette__item.is-active");
    active?.scrollIntoView({ block: "nearest" });
  }

  function createDialog() {
    dialog = document.createElement("dialog");
    dialog.id = "commandPalette";
    dialog.className = "gh-command-palette";
    dialog.setAttribute("aria-labelledby", "commandPaletteTitle");

    dialog.innerHTML =
      '<div class="gh-command-palette__header">' +
      '<i class="bi bi-search" aria-hidden="true"></i>' +
      '<label id="commandPaletteTitle" class="visually-hidden">' + translate("command_palette_title") + "</label>" +
      '<input type="search" class="gh-command-palette__input" autocomplete="off" spellcheck="false" />' +
      "</div>" +
      '<div class="gh-command-palette__results" id="commandPaletteResults" role="listbox"></div>';

    inputEl = dialog.querySelector(".gh-command-palette__input");
    resultsEl = dialog.querySelector(".gh-command-palette__results");
    inputEl.placeholder = translate("command_palette_input_placeholder");
    inputEl.setAttribute("aria-controls", "commandPaletteResults");

    inputEl.addEventListener("input", () => {
      activeIndex = 0;
      syncResults();
    });

    dialog.addEventListener("click", event => {
      if (event.target === dialog) closePalette();
    });

    document.body.appendChild(dialog);
  }

  function wireSearchTriggers() {
    document.querySelectorAll("input.gh-search, button.gh-search").forEach(trigger => {
      if (trigger.dataset.commandPaletteBound === "1") return;
      trigger.dataset.commandPaletteBound = "1";

      if (trigger.tagName === "INPUT") {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = trigger.className;
        btn.id = "commandPaletteTrigger";
        btn.setAttribute("aria-haspopup", "dialog");
        btn.setAttribute("aria-controls", "commandPalette");
        btn.setAttribute("data-i18n-aria-label", "command_palette_open");

        const icon = document.createElement("i");
        icon.className = "bi bi-search gh-search-icon";
        icon.setAttribute("aria-hidden", "true");

        const label = document.createElement("span");
        label.className = "gh-search-label";
        label.setAttribute("data-i18n", "gh_search_placeholder");
        label.textContent = translate("gh_search_placeholder");

        const kbd = document.createElement("kbd");
        kbd.className = "gh-search-kbd";
        kbd.setAttribute("aria-hidden", "true");
        kbd.textContent = "/";

        btn.append(icon, label, kbd);
        trigger.replaceWith(btn);
        btn.addEventListener("click", openPalette);
        return;
      }

      if (!trigger.querySelector(".gh-search-icon")) {
        const icon = document.createElement("i");
        icon.className = "bi bi-search gh-search-icon";
        icon.setAttribute("aria-hidden", "true");
        trigger.prepend(icon);
      }

      trigger.addEventListener("click", openPalette);
    });
  }

  function initCommandPalette() {
    if (typeof t !== "function") return;
    createDialog();
    wireSearchTriggers();
    document.addEventListener("keydown", onDocumentKeydown);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCommandPalette);
  } else {
    initCommandPalette();
  }

  window.initCommandPalette = initCommandPalette;
  window.openCommandPalette = openPalette;
})();
