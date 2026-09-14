/**
 * Clear button: letters fly into the bin (measured targets), fill rises, then onClear().
 */
(function (global) {
  "use strict";

  /**
   * @param {HTMLButtonElement} clearBtn
   * @param {() => void} onClear
   * @returns {{ syncLetters: () => void }}
   */
  function initMeChatClear(clearBtn, onClear) {
    let isAnimating = false;

    function prefersReducedMotion() {
      return Boolean(
        global.matchMedia &&
          global.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }

    function setProgress(value) {
      clearBtn.style.setProperty("--p", String(value));
    }

    function syncLetters() {
      const label = clearBtn.querySelector(".me-chat__clear-label");
      const host = clearBtn.querySelector(".me-chat__clear-letters");
      if (!label || !host) return;
      const text = (label.textContent || "Clear").trim();
      host.innerHTML = Array.from(text)
        .map(function (ch, index) {
          const safe = ch === " " ? "&nbsp;" : ch;
          return (
            '<span class="me-chat__clear-char" style="--i:' +
            index +
            '">' +
            safe +
            "</span>"
          );
        })
        .join("");
    }

    function aimCharsAtBin(chars) {
      const icon = clearBtn.querySelector(".me-chat__clear-icon");
      if (!icon) return;
      const bin = icon.getBoundingClientRect();
      // Aim for the open mouth (under the tilted lid).
      const targetX = bin.left + bin.width * 0.48;
      const targetY = bin.top + bin.height * 0.55;

      chars.forEach(function (char, index) {
        const box = char.getBoundingClientRect();
        const fromX = box.left + box.width / 2;
        const fromY = box.top + box.height / 2;
        const dx = targetX - fromX;
        const dy = targetY - fromY;
        // Arc peak: climb above the lid, then drop in (like the reference).
        const mx = dx * 0.38;
        const my = -18 - index * 3.5;
        const rot = (index % 2 === 0 ? -1 : 1) * (14 + index * 8);
        char.style.setProperty("--dx", dx.toFixed(1) + "px");
        char.style.setProperty("--dy", dy.toFixed(1) + "px");
        char.style.setProperty("--mx", mx.toFixed(1) + "px");
        char.style.setProperty("--my", my.toFixed(1) + "px");
        char.style.setProperty("--rot", rot + "deg");
        char.style.setProperty("--i", String(index));
      });
    }

    function resetButton() {
      clearBtn.classList.remove("is-eating");
      clearBtn.disabled = false;
      setProgress(0);
      syncLetters();
      isAnimating = false;
    }

    function finish(done) {
      if (done.finished) return;
      done.finished = true;
      setProgress(1);
      onClear();
      global.setTimeout(resetButton, 280);
    }

    function watchLandings(chars, done) {
      let landed = 0;
      const total = chars.length || 1;

      chars.forEach(function (char) {
        char.addEventListener(
          "animationend",
          function (event) {
            if (event.animationName !== "me-chat-clear-fly") return;
            landed += 1;
            setProgress(landed / total);
            if (landed >= total) finish(done);
          },
          { once: true }
        );
      });
    }

    function runMobileGulp(done) {
      setProgress(1);
      global.setTimeout(function () {
        finish(done);
      }, 520);
    }

    function run() {
      if (isAnimating) return;
      if (prefersReducedMotion()) {
        onClear();
        return;
      }

      isAnimating = true;
      clearBtn.disabled = true;
      setProgress(0);
      clearBtn.classList.add("is-eating");

      const done = { finished: false };
      const chars = clearBtn.querySelectorAll(".me-chat__clear-char");
      const lettersHidden =
        global.matchMedia && global.matchMedia("(max-width: 520px)").matches;

      if (lettersHidden || chars.length === 0) {
        runMobileGulp(done);
        return;
      }

      aimCharsAtBin(chars);
      chars.forEach(function (char) {
        char.classList.add("is-flying");
      });
      watchLandings(chars, done);
      global.setTimeout(function () {
        finish(done);
      }, 1300);
    }

    syncLetters();
    setProgress(0);
    clearBtn.addEventListener("click", run);

    return { syncLetters: syncLetters };
  }

  global.initMeChatClear = initMeChatClear;
})(window);
