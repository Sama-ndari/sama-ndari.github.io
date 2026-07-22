/**
 * Personal AI clone chat — calls creative-muse-backend /api/me-chat.
 */
(function () {
  "use strict";

  const API_URL =
    window.ME_CHAT_API_URL ??
    "https://creative-muse-backend.vercel.app/api/me-chat";

  const PREMIUM_API_KEY =
    window.ME_CHAT_PREMIUM_KEY ?? "RnQkpbJ_VIpaFTFfSAequ2-omhqj9N4L-1FegDV6NCM";

  const STORAGE_KEY = "portfolio-me-chat-history-v1";
  const AVATAR_SRC = "assets/img/icon.png";
  const MAX_STORED_TURNS = 20;

  const messagesEl = document.getElementById("me-chat-messages");
  const welcomeEl = document.getElementById("me-chat-welcome");
  const formEl = document.getElementById("me-chat-form");
  const inputEl = document.getElementById("me-chat-input");
  const sendBtn = document.getElementById("me-chat-send");
  const clearBtn = document.getElementById("me-chat-clear");
  const suggestionsEl = document.getElementById("me-chat-suggestions");

  if (!messagesEl || !formEl || !inputEl || !sendBtn) {
    return;
  }

  /** @type {{ role: 'user' | 'assistant', content: string }[]} */
  let history = loadHistory();
  /** Index in `history` of the user turn currently being edited (or null). */
  let editingIndex = null;
  /** Guards against overlapping requests (double-click / stacked handlers). */
  let isGenerating = false;

  function translate(key, fallback) {
    if (typeof t === "function") {
      const value = t(key);
      if (value && value !== key) {
        return value;
      }
    }
    return fallback;
  }

  function trimHistory(entries) {
    return entries.slice(-MAX_STORED_TURNS * 2);
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return trimHistory(
        parsed.filter(
          (entry) =>
            entry &&
            typeof entry === "object" &&
            (entry.role === "user" || entry.role === "assistant") &&
            typeof entry.content === "string"
        )
      );
    } catch {
      return [];
    }
  }

  function saveHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimHistory(history)));
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderRichText(text) {
    let html = escapeHtml(text);
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    const paragraphs = html
      .split(/\n{2,}/)
      .map((block) => block.replace(/\n/g, "<br />"));
    return paragraphs.map((block) => `<p>${block}</p>`).join("");
  }

  function toggleWelcome() {
    if (!welcomeEl) {
      return;
    }
    const hasMessages =
      history.length > 0 || messagesEl.querySelector(".me-chat-msg") !== null;
    welcomeEl.classList.toggle("is-hidden", hasMessages);
    // Suggestion chips are an onboarding affordance — hide them once chatting.
    document.body.classList.toggle("me-chat-active", hasMessages);
  }

  function buildAssistantAvatar() {
    const avatar = document.createElement("div");
    avatar.className = "me-chat-msg__avatar";
    const img = document.createElement("img");
    img.src = AVATAR_SRC;
    img.alt = "";
    img.width = 30;
    img.height = 30;
    img.decoding = "async";
    img.loading = "lazy";
    avatar.appendChild(img);
    return avatar;
  }

  function buildMessage(role, content, className) {
    const row = document.createElement("article");
    row.className = `me-chat-msg ${className}`;

    if (role === "error") {
      const bubble = document.createElement("div");
      bubble.className = "me-chat-msg__bubble";
      bubble.textContent = content;
      row.appendChild(bubble);
      return row;
    }

    // User: right-aligned bubble with a hover "edit" affordance.
    if (role === "user") {
      row.dataset.raw = content;
      const editLabel = translate("clone_edit", "Edit message");
      const actions = document.createElement("div");
      actions.className = "me-chat-msg__actions me-chat-msg__actions--user";
      actions.innerHTML =
        `<button type="button" class="me-chat-msg__action me-chat-msg__edit" title="${editLabel}" aria-label="${editLabel}">` +
        '<i class="bi bi-pencil" aria-hidden="true"></i></button>';
      const bubble = document.createElement("div");
      bubble.className = "me-chat-msg__bubble";
      const author = translate("clone_author_visitor", "You");
      bubble.innerHTML = `<span class="sr-only">${escapeHtml(author)}: </span>`;
      bubble.appendChild(document.createTextNode(content));
      row.appendChild(actions);
      row.appendChild(bubble);
      return row;
    }

    // Assistant: avatar + free-flowing text, no card/header.
    row.appendChild(buildAssistantAvatar());
    row.dataset.raw = content;
    const body = document.createElement("div");
    body.className = "me-chat-msg__body";
    const author = translate("clone_author_assistant", "Samandari");
    body.innerHTML =
      `<span class="sr-only">${escapeHtml(author)}: </span>` + renderRichText(content);
    body.appendChild(buildAssistantActions());
    row.appendChild(body);
    return row;
  }

  function buildAssistantActions() {
    const copyLabel = translate("clone_copy", "Copy");
    const regenLabel = translate("clone_regenerate", "Regenerate");
    const actions = document.createElement("div");
    actions.className = "me-chat-msg__actions";
    actions.innerHTML =
      `<button type="button" class="me-chat-msg__action me-chat-msg__copy" title="${copyLabel}" aria-label="${copyLabel}">` +
      '<i class="bi bi-clipboard" aria-hidden="true"></i></button>' +
      `<button type="button" class="me-chat-msg__action me-chat-msg__regen" title="${regenLabel}" aria-label="${regenLabel}">` +
      '<i class="bi bi-arrow-clockwise" aria-hidden="true"></i></button>';
    return actions;
  }

  /** Only the latest assistant reply gets the Regenerate affordance. */
  function markLastAssistant() {
    const rows = messagesEl.querySelectorAll(".me-chat-msg.assistant:not(.typing)");
    rows.forEach((row, index) => row.classList.toggle("is-last", index === rows.length - 1));
  }

  function appendMessage(role, content, className) {
    const row = buildMessage(role, content, className || role);
    messagesEl.appendChild(row);
    markLastAssistant();
    scrollToBottom();
    return row;
  }

  function scrollToBottom() {
    // Natural page flow: bring the newest row into view rather than scrolling
    // an inner container (the thread grows the page height like a discussion).
    const last = messagesEl.lastElementChild;
    if (last && typeof last.scrollIntoView === "function") {
      last.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function showTyping() {
    const row = document.createElement("article");
    row.className = "me-chat-msg assistant typing";
    row.innerHTML =
      `<div class="me-chat-msg__avatar"><img src="${AVATAR_SRC}" alt="" width="30" height="30" decoding="async" /></div>` +
      `<div class="me-chat-msg__body"><span class="me-chat__thinking">${translate(
        "clone_thinking",
        "Thinking…"
      )}</span></div>`;
    messagesEl.appendChild(row);
    scrollToBottom();
    return row;
  }

  function autoResize() {
    inputEl.style.height = "auto";
    inputEl.style.height = `${Math.min(Math.max(inputEl.scrollHeight, 24), 180)}px`;
  }

  function clearChat() {
    history = [];
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
    inputEl.focus();
  }

  function politeErrorMessage(err, status) {
    if (status && status !== 200) {
      return translate(
        "clone_err_http",
        "Erreur 😅 — pas toi, moi. Réessaie, je me rattrape."
      );
    }

    const raw = err?.message ?? "";
    if (
      err instanceof TypeError ||
      /failed to fetch|networkerror|load failed|network request failed/i.test(raw)
    ) {
      return translate(
        "clone_err_network",
        "Oups, j’ai besoin d’un café. Je reviens vite."
      );
    }

    return translate(
      "clone_err_http",
      "Erreur 😅 — pas toi, moi. Réessaie, je me rattrape."
    );
  }

  async function requestAssistantReply(message, contextHistory) {
    isGenerating = true;
    sendBtn.disabled = true;
    const typingRow = showTyping();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Premium-Key": PREMIUM_API_KEY,
        },
        body: JSON.stringify({ message, history: contextHistory }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw Object.assign(new Error(data.error ?? `HTTP ${res.status}`), {
          status: res.status,
        });
      }

      typingRow.remove();
      history.push({ role: "assistant", content: data.reply });
      saveHistory();
      appendMessage("assistant", data.reply).dataset.historyIndex = String(
        history.length - 1
      );
    } catch (err) {
      typingRow.remove();
      appendMessage("error", politeErrorMessage(err, err?.status), "error");
    } finally {
      isGenerating = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  function submitMessage(rawMessage) {
    const message = rawMessage.trim();
    if (!message || isGenerating) {
      return;
    }

    inputEl.value = "";
    autoResize();

    // Editing a past turn: drop it and everything after, then re-ask fresh.
    if (editingIndex !== null) {
      history = history.slice(0, editingIndex);
      editingIndex = null;
      formEl.classList.remove("is-editing");
      renderHistory();
    }

    const context = history.slice();
    history.push({ role: "user", content: message });
    saveHistory();
    appendMessage("user", message).dataset.historyIndex = String(history.length - 1);
    toggleWelcome();
    requestAssistantReply(message, context);
  }

  /** Re-run the latest user turn and replace its answer. */
  function regenerateLast() {
    if (isGenerating) {
      return;
    }
    let lastUserIdx = -1;
    for (let i = history.length - 1; i >= 0; i -= 1) {
      if (history[i].role === "user") {
        lastUserIdx = i;
        break;
      }
    }
    if (lastUserIdx === -1) {
      return;
    }
    const message = history[lastUserIdx].content;
    const context = history.slice(0, lastUserIdx);
    history = history.slice(0, lastUserIdx + 1);
    saveHistory();
    renderHistory();
    requestAssistantReply(message, context);
  }

  function legacyCopy(text) {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "-9999px";
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(area);
      return copied;
    } catch {
      return false;
    }
  }

  async function copyMessage(button) {
    const row = button.closest(".me-chat-msg");
    const text = row?.dataset.raw ?? "";
    if (!text) {
      return;
    }
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      /* falls back to execCommand below */
    }
    if (!copied) {
      copied = legacyCopy(text);
    }
    if (!copied) {
      return;
    }
    const icon = button.querySelector("i");
    if (!icon) {
      return;
    }
    const previous = icon.className;
    icon.className = "bi bi-check2";
    button.classList.add("is-copied");
    button.title = translate("clone_copied", "Copied");
    setTimeout(() => {
      icon.className = previous;
      button.classList.remove("is-copied");
      button.title = translate("clone_copy", "Copy");
    }, 1500);
  }

  function renderHistory() {
    messagesEl.querySelectorAll(".me-chat-msg").forEach((node) => node.remove());
    history.forEach(({ role, content }, index) => {
      const row = appendMessage(role, content);
      row.dataset.historyIndex = String(index);
    });
    toggleWelcome();
  }

  function startEdit(row) {
    const index = Number(row.dataset.historyIndex);
    if (!Number.isInteger(index) || !history[index]) {
      return;
    }
    editingIndex = index;
    inputEl.value = row.dataset.raw ?? history[index].content;
    formEl.classList.add("is-editing");
    autoResize();
    inputEl.focus();
    inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
  }

  function cancelEdit() {
    editingIndex = null;
    formEl.classList.remove("is-editing");
    inputEl.value = "";
    autoResize();
  }

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    submitMessage(inputEl.value);
  });

  inputEl.addEventListener("input", autoResize);

  inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(inputEl.value);
    } else if (event.key === "Escape" && editingIndex !== null) {
      event.preventDefault();
      cancelEdit();
    }
  });

  if (suggestionsEl) {
    suggestionsEl.addEventListener("click", (event) => {
      const chip = event.target.closest(".me-chat__chip");
      if (!chip) {
        return;
      }
      const promptKey = chip.getAttribute("data-prompt-i18n");
      const prompt = promptKey
        ? translate(promptKey, chip.getAttribute("data-prompt") || chip.textContent)
        : chip.getAttribute("data-prompt") || chip.textContent;
      submitMessage(prompt);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearChat);
  }

  // Delegated message actions: copy + regenerate (assistant), edit (user).
  messagesEl.addEventListener("click", (event) => {
    const copyBtn = event.target.closest(".me-chat-msg__copy");
    if (copyBtn) {
      copyMessage(copyBtn);
      return;
    }
    const regenBtn = event.target.closest(".me-chat-msg__regen");
    if (regenBtn) {
      regenerateLast();
      return;
    }
    const editBtn = event.target.closest(".me-chat-msg__edit");
    if (editBtn) {
      startEdit(editBtn.closest(".me-chat-msg"));
    }
  });

  // Re-render the thread on language change so dynamically-built message cards
  // (author, "commented", Owner badge, avatar initial) follow the locale like
  // the static [data-i18n] nodes do. Called by initLangToggle in main.js.
  window.refreshMeChatLocale = renderHistory;

  renderHistory();
  inputEl.focus();
})();
