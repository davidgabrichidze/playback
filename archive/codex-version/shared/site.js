(function () {
  var STORAGE_KEY = "playback-theatre-language";

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char];
    });
  }

  function t(value, lang) {
    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }

    if (Array.isArray(value)) {
      return value.map(function (item) {
        return t(item, lang);
      });
    }

    return value[lang] || value.ka || value.en || "";
  }

  function getLang() {
    var stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "ka";
  }

  function renderNav(items, lang) {
    return items
      .map(function (item) {
        return (
          '<a href="#' +
          escapeHtml(item.id) +
          '">' +
          escapeHtml(t(item.label, lang)) +
          "</a>"
        );
      })
      .join("");
  }

  function linkAttributes(href) {
    if (href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) {
      return "";
    }

    return ' target="_blank" rel="noreferrer"';
  }

  function renderButtons(items, lang, className) {
    var classes = className || "button-row";
    return (
      '<div class="' +
      classes +
      '">' +
      items
        .map(function (item) {
          var variant = item.variant || "button";
          return (
            '<a class="' +
            escapeHtml(variant) +
            '" href="' +
            escapeHtml(item.href) +
            '"' +
            linkAttributes(item.href) +
            ">" +
            escapeHtml(t(item.label, lang)) +
            "</a>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderParagraphs(items, lang, wrapperClass) {
    return (
      '<div class="' +
      (wrapperClass || "copy-stack") +
      '">' +
      items
        .map(function (item) {
          return "<p>" + escapeHtml(t(item, lang)) + "</p>";
        })
        .join("") +
      "</div>"
    );
  }

  function renderStats(items, lang, className) {
    return items
      .map(function (item) {
        return (
          '<article class="' +
          escapeHtml(className || "stat-card") +
          '">' +
          '<p class="stat-value">' +
          escapeHtml(item.value) +
          "</p>" +
          '<p class="stat-label">' +
          escapeHtml(t(item.label, lang)) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderHighlightCards(items, lang, className) {
    return items
      .map(function (item) {
        return (
          '<article class="' +
          escapeHtml(className || "value-card") +
          '">' +
          '<p class="card-kicker">' +
          escapeHtml(t(item.title, lang)) +
          "</p>" +
          '<p class="card-body">' +
          escapeHtml(t(item.text, lang)) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderProcessCards(items, lang, className) {
    return items
      .map(function (item) {
        return (
          '<article class="' +
          escapeHtml(className || "process-card") +
          '">' +
          '<p class="card-kicker">' +
          escapeHtml(item.number) +
          "</p>" +
          '<h3 class="card-title">' +
          escapeHtml(t(item.title, lang)) +
          "</h3>" +
          '<p class="card-body">' +
          escapeHtml(t(item.text, lang)) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderQuoteCards(items, lang, className) {
    return items
      .map(function (item) {
        return (
          '<article class="' +
          escapeHtml(className || "quote-card") +
          '">' +
          '<p class="quote-mark">"</p>' +
          '<p class="card-body">' +
          escapeHtml(t(item.quote, lang)) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderProgramCards(items, lang, className) {
    return items
      .map(function (item) {
        return (
          '<article class="' +
          escapeHtml(className || "program-card") +
          '">' +
          '<p class="card-kicker">' +
          escapeHtml(t(item.meta, lang)) +
          "</p>" +
          '<h3 class="card-title">' +
          escapeHtml(t(item.title, lang)) +
          "</h3>" +
          '<p class="card-body">' +
          escapeHtml(t(item.body, lang)) +
          "</p>" +
          '<ul class="card-list">' +
          item.bullets
            .map(function (bullet) {
              return "<li>" + escapeHtml(t(bullet, lang)) + "</li>";
            })
            .join("") +
          "</ul>" +
          renderButtons([item.cta], lang, "button-row") +
          "</article>"
        );
      })
      .join("");
  }

  function renderSimpleCards(items, lang, className, titleKey, bodyKey) {
    return items
      .map(function (item) {
        return (
          '<article class="' +
          escapeHtml(className) +
          '">' +
          '<p class="card-kicker">' +
          escapeHtml(t(item.meta || item.role || item.title, lang)) +
          "</p>" +
          '<h3 class="card-title">' +
          escapeHtml(t(item[titleKey], lang)) +
          "</h3>" +
          '<p class="card-body">' +
          escapeHtml(t(item[bodyKey], lang)) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderGalleryCards(items, lang, className) {
    return items
      .map(function (item, index) {
        return (
          '<article class="' +
          escapeHtml(className || "gallery-card") +
          '" style="--tile-index:' +
          escapeHtml(index) +
          ';">' +
          '<p class="card-kicker">' +
          String(index + 1).padStart(2, "0") +
          "</p>" +
          '<h3 class="card-title">' +
          escapeHtml(t(item.title, lang)) +
          "</h3>" +
          '<p class="card-body">' +
          escapeHtml(t(item.text, lang)) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderFooter(footer, lang) {
    return (
      '<div class="page-shell footer-shell">' +
      '<p class="footer-note">' +
      escapeHtml(t(footer.note, lang)) +
      "</p>" +
      '<div class="footer-links">' +
      footer.links
        .map(function (item) {
          return (
            '<a href="' +
            escapeHtml(item.href) +
            '"' +
            linkAttributes(item.href) +
            ">" +
            escapeHtml(t(item.label, lang)) +
            "</a>"
          );
        })
        .join("") +
      "</div>" +
      "</div>"
    );
  }

  function initPage(render) {
    var currentLang = getLang();

    function repaint() {
      document.documentElement.lang = currentLang;

      Array.prototype.forEach.call(
        document.querySelectorAll("[data-lang-toggle]"),
        function (button) {
          button.setAttribute(
            "aria-pressed",
            String(button.getAttribute("data-lang-toggle") === currentLang)
          );
        }
      );

      render(currentLang);
    }

    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-lang-toggle]");

      if (!button) {
        return;
      }

      currentLang = button.getAttribute("data-lang-toggle") === "en" ? "en" : "ka";
      window.localStorage.setItem(STORAGE_KEY, currentLang);
      repaint();
    });

    repaint();
  }

  window.PlaybackSite = {
    escapeHtml: escapeHtml,
    initPage: initPage,
    renderButtons: renderButtons,
    renderFooter: renderFooter,
    renderGalleryCards: renderGalleryCards,
    renderHighlightCards: renderHighlightCards,
    renderNav: renderNav,
    renderParagraphs: renderParagraphs,
    renderProcessCards: renderProcessCards,
    renderProgramCards: renderProgramCards,
    renderQuoteCards: renderQuoteCards,
    renderSimpleCards: renderSimpleCards,
    renderStats: renderStats,
    t: t,
  };
})();
