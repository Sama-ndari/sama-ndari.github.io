/**
 * Overview: GitHub contribution heatmap (third-party API).
 * Requires global t() from i18n.js; optional getLang() for month labels.
 */
(function () {
  "use strict";

  var GH_USER = "Sama-ndari";
  var CONTRIB_API = "https://github-contributions-api.jogruber.de/v4/";
  var HF_DATASET_API =
    "https://huggingface.co/api/datasets/Ijwi-ry-Ikirundi-AI/Kirundi_Open_Speech_Dataset";
  var HF_METADATA_CSV =
    "https://huggingface.co/datasets/Ijwi-ry-Ikirundi-AI/Kirundi_Open_Speech_Dataset/raw/main/metadata.csv";
  var GH_USER_API = "https://api.github.com/users/" + GH_USER;

  function impactLocaleBcp47() {
    var g = typeof getLang === "function" ? getLang() : "en";
    return g === "fr" ? "fr-FR" : "en-US";
  }

  function setImpactMetric(root, selector, val) {
    var el = root.querySelector(selector);
    if (!el) return;
    el.classList.remove("is-loading");
    if (val === null || val === undefined || val === "") {
      el.textContent = "\u2014";
      return;
    }
    el.textContent =
      typeof val === "number" ? val.toLocaleString(impactLocaleBcp47()) : String(val);
  }

  function markImpactMetricsLoading(root) {
    [
      ".impact-stat-sentences",
      ".impact-stat-projects",
      ".impact-stat-repos",
      ".impact-stat-downloads"
    ].forEach(function (selector) {
      var el = root.querySelector(selector);
      if (el) {
        el.textContent = "";
        el.classList.add("is-loading");
      }
    });
  }

  /** Placeholder grid shown while the real contribution data loads. */
  function renderHeatmapSkeleton(mount) {
    mount.innerHTML = "";
    var total = 53 * 7;
    var i;
    for (i = 0; i < total; i++) {
      var div = document.createElement("div");
      div.className = "impact-cell impact-cell--skeleton";
      mount.appendChild(div);
    }
  }

  /** GitHub user API runs alone so HF/CSV slowness never blocks public_repos. */
  function fetchGitHubPublicRepoCount(root) {
    fetch(GH_USER_API, { headers: { Accept: "application/vnd.github+json" } })
      .then(function (res) {
        if (!res.ok) return Promise.reject(res);
        return res.json();
      })
      .then(function (data) {
        var raw = data && data.public_repos;
        var n = typeof raw === "number" ? raw : Number(raw);
        if (Number.isFinite(n)) {
          setImpactMetric(root, ".impact-stat-repos", n);
        } else {
          setImpactMetric(root, ".impact-stat-repos", null);
        }
      })
      .catch(function () {
        setImpactMetric(root, ".impact-stat-repos", null);
      });
  }

  function fetchImpactOverviewMetrics(root) {
    markImpactMetricsLoading(root);
    var pc = root.getAttribute("data-project-count");
    if (pc) setImpactMetric(root, ".impact-stat-projects", Number(pc));

    fetchGitHubPublicRepoCount(root);

    Promise.allSettled([fetch(HF_METADATA_CSV), fetch(HF_DATASET_API)])
      .then(function (results) {
        var r0 = results[0];
        if (r0.status === "fulfilled" && r0.value.ok) {
          r0.value
            .text()
            .then(function (text) {
              var lines = text.split("\n").filter(function (l) {
                return l.trim().length > 0;
              });
              setImpactMetric(root, ".impact-stat-sentences", Math.max(0, lines.length - 1));
            })
            .catch(function () {});
        }
        var r1 = results[1];
        if (r1.status === "fulfilled" && r1.value.ok) {
          r1.value
            .json()
            .then(function (hf) {
              if (hf && typeof hf.downloads === "number") {
                setImpactMetric(root, ".impact-stat-downloads", hf.downloads);
              }
            })
            .catch(function () {});
        }
      })
      .catch(function () {});
  }

  function capitalizeMonthLine(str) {
    if (!str) return "";
    var s = String(str).trim();
    if (!s) return "";
    return s.charAt(0).toLocaleUpperCase(impactLocaleBcp47()) + s.slice(1);
  }

  function padIso(y, m, d) {
    return y + "-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0");
  }

  function padYearCells(contributions, year) {
    var map = new Map();
    (contributions || []).forEach(function (c) {
      map.set(c.date, c);
    });
    var cells = [];
    var lead = new Date(year, 0, 1).getDay();
    var i;
    for (i = 0; i < lead; i++) cells.push(null);
    var end = new Date(year, 11, 31);
    var day = new Date(year, 0, 1);
    for (; day <= end; day.setDate(day.getDate() + 1)) {
      var iso = padIso(day.getFullYear(), day.getMonth() + 1, day.getDate());
      cells.push(map.get(iso) || { date: iso, count: 0, level: 0 });
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  function contribTotal(data, year) {
    var yk = String(year);
    if (data.total && data.total[yk] !== undefined) return data.total[yk];
    return (data.contributions || []).reduce(function (a, b) {
      return a + (b.count | 0);
    }, 0);
  }

  function monthStartsInGrid(cells, cols, year) {
    var out = [];
    var c;
    var r;
    for (c = 0; c < cols; c++) {
      for (r = 0; r < 7; r++) {
        var cell = cells[c * 7 + r];
        if (cell && cell.date) {
          var dt = new Date(cell.date + "T12:00:00Z");
          if (dt.getUTCDate() === 1 && dt.getUTCFullYear() === year) {
            out.push({ col: c, month: dt.getUTCMonth() });
            break;
          }
        }
      }
    }
    return out;
  }

  function renderMonthRow(container, cells, year) {
    container.innerHTML = "";
    var cols = cells.length / 7;
    var row = document.createElement("div");
    row.className = "impact-months-row";
    row.style.gridTemplateColumns = "repeat(" + cols + ", var(--impact-cell, 11px))";
    var starts = monthStartsInGrid(cells, cols, year);
    var pos = 0;
    var i;
    for (i = 0; i < starts.length; i++) {
      var col = starts[i].col;
      var endCol = i + 1 < starts.length ? starts[i + 1].col : cols;
      while (pos < col) {
        var empty = document.createElement("span");
        empty.className = "impact-month-label";
        row.appendChild(empty);
        pos++;
      }
      var span = document.createElement("span");
      span.className = "impact-month-label impact-month-label--span";
      var key = "impact_month_" + String(starts[i].month + 1);
      span.textContent = typeof t === "function" ? t(key) : "";
      span.style.gridColumn = "span " + String(endCol - col);
      row.appendChild(span);
      pos = endCol;
    }
    while (pos < cols) {
      var tail = document.createElement("span");
      tail.className = "impact-month-label";
      row.appendChild(tail);
      pos++;
    }
    container.appendChild(row);
  }

  function cellTooltip(cell) {
    if (!cell || !cell.date) return "";
    return t("impact_contrib_tooltip")
      .replace("{{n}}", String(cell.count))
      .replace("{{d}}", cell.date);
  }

  function renderHeatmapGrid(mount, cells) {
    mount.innerHTML = "";
    var c;
    var r;
    for (c = 0; c < cells.length / 7; c++) {
      for (r = 0; r < 7; r++) {
        var cell = cells[c * 7 + r];
        var div = document.createElement("div");
        div.className = "impact-cell";
        if (!cell || !cell.date) div.classList.add("impact-cell--empty");
        else {
          var lv = Math.min(4, Math.max(0, cell.level | 0));
          div.classList.add("impact-cell--l" + lv);
          div.setAttribute("title", cellTooltip(cell));
        }
        mount.appendChild(div);
      }
    }
  }

  function setYearNavActive(nav, year) {
    nav.querySelectorAll(".impact-year-btn").forEach(function (btn) {
      btn.classList.toggle("is-active", Number(btn.dataset.year) === year);
    });
  }

  function loadHeatmapYear(root, year, nav) {
    var intro = root.querySelector(".impact-heatmap-intro");
    var monthRow = root.querySelector("#impactMonthRow");
    var gridMount = root.querySelector("#impactGridMount");
    if (!intro || !monthRow || !gridMount) return;
    setYearNavActive(nav, year);
    intro.textContent = "\u2026";
    renderHeatmapSkeleton(gridMount);
    fetch(CONTRIB_API + GH_USER + "?y=" + year)
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (data) {
        if (!data || !data.contributions) {
          intro.textContent = t("impact_contributions_intro")
            .replace("{{n}}", "0")
            .replace("{{year}}", String(year));
          monthRow.innerHTML = "";
          gridMount.innerHTML = "";
          return;
        }
        var total = contribTotal(data, year);
        intro.textContent = t("impact_contributions_intro")
          .replace("{{n}}", String(total.toLocaleString()))
          .replace("{{year}}", String(year));
        var cells = padYearCells(data.contributions, year);
        renderMonthRow(monthRow, cells, year);
        renderHeatmapGrid(gridMount, cells);
        gridMount.setAttribute(
          "aria-label",
          t("impact_github") + " " + year + ": " + String(total)
        );
      })
      .catch(function () {
        intro.textContent = t("impact_contributions_intro")
          .replace("{{n}}", "0")
          .replace("{{year}}", String(year));
        monthRow.innerHTML = "";
        gridMount.innerHTML = "";
        gridMount.removeAttribute("aria-label");
      });
  }

  function buildYearNav(nav, root, yearEnd) {
    nav.innerHTML = "";
    var y;
    for (y = yearEnd; y >= yearEnd - 5; y--) {
      (function (yearBtn) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "impact-year-btn";
        btn.dataset.year = String(yearBtn);
        btn.textContent = String(yearBtn);
        btn.addEventListener("click", function () {
          loadHeatmapYear(root, yearBtn, nav);
        });
        nav.appendChild(btn);
      })(y);
    }
    if (typeof t === "function") {
      nav.setAttribute("aria-label", t("impact_year_nav_aria"));
    }
  }

  function updateActivityMonthLabel() {
    var el = document.getElementById("impactActivityMonth");
    if (!el) return;
    var now = new Date();
    el.textContent = capitalizeMonthLine(
      now.toLocaleString(impactLocaleBcp47(), {
        month: "long",
        year: "numeric"
      })
    );
  }

  window.refreshImpactContributionLocale = function () {
    updateActivityMonthLabel();
    var root = document.getElementById("impact-section");
    var nav = document.getElementById("impactYearNav");
    if (!root || !nav) return;
    if (typeof t === "function") {
      nav.setAttribute("aria-label", t("impact_year_nav_aria"));
    }
    var active = nav.querySelector(".impact-year-btn.is-active");
    if (!active) return;
    loadHeatmapYear(root, Number(active.dataset.year), nav);
  };

  window.refreshImpactActivityMonth = window.refreshImpactContributionLocale;

  window.initOverviewImpact = function () {
    var root = document.getElementById("impact-section");
    if (!root) return;
    fetchImpactOverviewMetrics(root);
    updateActivityMonthLabel();
    var nav = document.getElementById("impactYearNav");
    if (!nav) return;
    var yEnd = new Date().getFullYear();
    buildYearNav(nav, root, yEnd);
    loadHeatmapYear(root, yEnd, nav);
  };
})();
