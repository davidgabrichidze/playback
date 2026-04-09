(function () {
  var content = window.PLAYBACK_CONTENT;
  var site = window.PlaybackSite;
  var signals = [
    { ka: "გააზიარე", en: "Tell" },
    { ka: "მოუსმინე", en: "Listen" },
    { ka: "გააცოცხლე", en: "Play" },
    { ka: "დაინახე", en: "Reflect" },
  ];
  var note = {
    label: { ka: "აფიშის მიმართულება", en: "Poster direction" },
    title: { ka: "თეატრის აფიშა, არა კორპორატიული landing", en: "Theatre poster, not a corporate landing" },
    body: {
      ka: "დიდი ტიპოგრაფია, მკაფიო CTA და სწრაფი ემოციური შთაბეჭდილება პირველი ეკრანიდანვე.",
      en: "Large typography, direct CTA, and an immediate emotional impression from the first screen.",
    },
  };

  function tt(value, lang) {
    return site.escapeHtml(site.t(value, lang));
  }

  function render(lang) {
    document.getElementById("nav-links").innerHTML = site.renderNav(content.navigation, lang);

    var html = `
      <section class="page-shell section-block poster-hero">
        <div class="poster-hero-main">
          <p class="section-label">${tt(content.hero.label, lang)}</p>
          <h1 class="section-title">${tt(content.hero.title, lang)}</h1>
          <p class="section-intro">${tt(content.hero.body, lang)}</p>
          <div class="poster-signals">
            ${signals
              .map(function (item) {
                return '<span class="signal">' + tt(item, lang) + "</span>";
              })
              .join("")}
          </div>
          <div style="margin-top: 28px;">
            ${site.renderButtons(content.hero.actions, lang)}
          </div>
        </div>
        <aside class="poster-hero-side">
          <div class="poster-note">
            <p class="card-kicker">${tt(note.label, lang)}</p>
            <h2 class="card-title">${tt(note.title, lang)}</h2>
            <p class="card-body">${tt(note.body, lang)}</p>
          </div>
          <div class="poster-stat">
            <div class="poster-stat-grid">
              ${site.renderStats(content.stats.slice(0, 2), lang)}
            </div>
          </div>
          <div class="poster-stat">
            <div class="poster-stat-grid">
              ${site.renderStats(content.stats.slice(2), lang)}
            </div>
          </div>
        </aside>
      </section>

      <section id="about" class="page-shell section-block poster-grid two">
        <div class="poster-slab">
          <p class="section-label">${tt(content.about.label, lang)}</p>
          <h2 class="section-title">${tt(content.about.title, lang)}</h2>
          <div class="section-intro">
            ${site.renderParagraphs(content.about.paragraphs, lang, "copy-stack")}
          </div>
        </div>
        <div class="poster-slab">
          <div class="collection-grid triple">
            ${site.renderHighlightCards(content.about.highlights, lang, "poster-card")}
          </div>
        </div>
      </section>

      <section id="process" class="page-shell section-block poster-marquee">
        <p class="section-label">${tt(content.process.label, lang)}</p>
        <h2 class="section-title">${tt(content.process.title, lang)}</h2>
        <p class="section-intro">${tt(content.process.intro, lang)}</p>
        <div class="collection-grid quad" style="margin-top: 28px;">
          ${site.renderProcessCards(content.process.steps, lang, "quote-card")}
        </div>
      </section>

      <section id="programs" class="page-shell section-block poster-grid two">
        <div class="poster-slab">
          <p class="section-label">${tt(content.programs.label, lang)}</p>
          <h2 class="section-title">${tt(content.programs.title, lang)}</h2>
          <p class="section-intro">${tt(content.programs.intro, lang)}</p>
          <div class="collection-grid triple" style="margin-top: 28px;">
            ${site.renderProgramCards(content.programs.cards, lang, "poster-card")}
          </div>
        </div>
        <div class="poster-slab">
          <p class="section-label">${tt(content.quotes.label, lang)}</p>
          <h2 class="section-title">${tt(content.quotes.title, lang)}</h2>
          <div class="collection-grid" style="margin-top: 28px;">
            ${site.renderQuoteCards(content.quotes.items, lang, "quote-card")}
          </div>
        </div>
      </section>

      <section id="events" class="page-shell section-block poster-grid two">
        <div class="poster-slab">
          <p class="section-label">${tt(content.events.label, lang)}</p>
          <h2 class="section-title">${tt(content.events.title, lang)}</h2>
          <p class="section-intro">${tt(content.events.intro, lang)}</p>
          <div class="collection-grid" style="margin-top: 28px;">
            ${site.renderSimpleCards(content.events.cards, lang, "poster-card", "title", "body")}
          </div>
        </div>
        <div class="poster-slab">
          <p class="section-label">${tt(content.gallery.label, lang)}</p>
          <h2 class="section-title">${tt(content.gallery.title, lang)}</h2>
          <div class="collection-grid quad" style="margin-top: 28px;">
            ${site.renderGalleryCards(content.gallery.items, lang, "poster-gallery")}
          </div>
        </div>
      </section>

      <section id="team" class="page-shell section-block poster-lower">
        <div class="poster-slab">
          <p class="section-label">${tt(content.team.label, lang)}</p>
          <h2 class="section-title">${tt(content.team.title, lang)}</h2>
          <div class="collection-grid" style="margin-top: 28px;">
            ${site.renderSimpleCards(content.team.people, lang, "poster-card", "name", "body")}
          </div>
        </div>
        <div id="join" class="poster-cta">
          <p class="section-label">${tt(content.join.label, lang)}</p>
          <h2 class="section-title">${tt(content.join.title, lang)}</h2>
          <p class="section-intro">${tt(content.join.body, lang)}</p>
          ${site.renderButtons(content.join.actions, lang)}
        </div>
      </section>
    `;

    document.getElementById("page-root").innerHTML = html;
    document.getElementById("footer-root").innerHTML = site.renderFooter(content.footer, lang);
  }

  site.initPage(render);
})();
