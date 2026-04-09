(function () {
  var content = window.PLAYBACK_CONTENT;
  var site = window.PlaybackSite;
  var ledger = [
    {
      label: { ka: "ინსტიტუცია", en: "Institution" },
      title: { ka: "თბილისი, საქართველო", en: "Tbilisi, Georgia" },
      body: {
        ka: "ქართული ფლეიბექ თეატრის ცენტრი შეიქმნა 2025 წლის 2 მარტს, როგორც საზოგადოებრივი და სასწავლო სივრცე.",
        en: "The Georgian Playback Theatre Center was founded on March 2, 2025 as a civic and educational space.",
      },
    },
    {
      label: { ka: "პროგრამები", en: "Programs" },
      title: { ka: "სწავლება + პერფორმანსი", en: "Training + Performance" },
      body: {
        ka: "საბაზისო და პრაქტიკოსის კურსები, ვორქშოფები, მასტერ-კლასები და საჯარო პერფორმანსები.",
        en: "Basic and practitioner courses, workshops, masterclasses, and public performances.",
      },
    },
    {
      label: { ka: "საზოგადოება", en: "Community" },
      title: { ka: "მოსმენა როგორც პრაქტიკა", en: "Listening as practice" },
      body: {
        ka: "მთავარი ღირებულებებია მოსმენა, თანაგრძნობა, ინკლუზიურობა და სოციალური პასუხისმგებლობა.",
        en: "Core values include listening, empathy, inclusivity, and social responsibility.",
      },
    },
  ];

  function tt(value, lang) {
    return site.escapeHtml(site.t(value, lang));
  }

  function render(lang) {
    document.getElementById("nav-links").innerHTML = site.renderNav(content.navigation, lang);

    var html = `
      <section class="page-shell section-block cultural-hero">
        <div class="hero-brief">
          <p class="section-label">${tt(content.hero.label, lang)}</p>
          <h1 class="section-title">${tt(content.hero.title, lang)}</h1>
          <p class="section-intro">${tt(content.hero.body, lang)}</p>
          ${site.renderButtons(content.hero.actions, lang)}
        </div>
        <aside class="hero-ledger">
          ${ledger
            .map(function (item, index) {
              var divider = index === ledger.length - 1 ? "" : '<div class="ledger-divider"></div>';
              return `
                <div>
                  <p class="ledger-label">${tt(item.label, lang)}</p>
                  <h2 class="ledger-title">${tt(item.title, lang)}</h2>
                  <p class="ledger-copy">${tt(item.body, lang)}</p>
                </div>
                ${divider}
              `;
            })
            .join("")}
        </aside>
      </section>

      <section class="page-shell section-block">
        <div class="cultural-slab">
          <div class="stat-grid quad">
            ${site.renderStats(content.stats, lang)}
          </div>
        </div>
      </section>

      <section id="about" class="page-shell section-block cultural-grid two">
        <div class="cultural-slab">
          <p class="section-label">${tt(content.about.label, lang)}</p>
          <h2 class="section-title">${tt(content.about.title, lang)}</h2>
          <div class="section-intro">
            ${site.renderParagraphs(content.about.paragraphs, lang, "copy-stack")}
          </div>
        </div>
        <div class="cultural-slab">
          <p class="section-label">${tt(content.about.label, lang)}</p>
          <div class="collection-grid triple">
            ${site.renderHighlightCards(content.about.highlights, lang, "value-card")}
          </div>
        </div>
      </section>

      <section id="process" class="page-shell section-block cultural-grid two">
        <div class="cultural-slab">
          <p class="section-label">${tt(content.process.label, lang)}</p>
          <h2 class="section-title">${tt(content.process.title, lang)}</h2>
          <p class="section-intro">${tt(content.process.intro, lang)}</p>
          <div class="collection-grid quad" style="margin-top: 26px;">
            ${site.renderProcessCards(content.process.steps, lang, "process-card")}
          </div>
        </div>
        <div class="cultural-slab">
          <p class="section-label">${tt(content.values.label, lang)}</p>
          <h2 class="section-title">${tt(content.values.title, lang)}</h2>
          <div class="collection-grid" style="margin-top: 26px;">
            ${site.renderHighlightCards(content.values.items, lang, "value-card")}
          </div>
        </div>
      </section>

      <section id="programs" class="page-shell section-block">
        <div class="cultural-slab">
          <p class="section-label">${tt(content.programs.label, lang)}</p>
          <h2 class="section-title">${tt(content.programs.title, lang)}</h2>
          <p class="section-intro">${tt(content.programs.intro, lang)}</p>
          <div class="collection-grid triple" style="margin-top: 26px;">
            ${site.renderProgramCards(content.programs.cards, lang, "program-card")}
          </div>
        </div>
      </section>

      <section id="events" class="page-shell section-block cultural-grid two">
        <div class="cultural-slab">
          <p class="section-label">${tt(content.events.label, lang)}</p>
          <h2 class="section-title">${tt(content.events.title, lang)}</h2>
          <p class="section-intro">${tt(content.events.intro, lang)}</p>
          <div class="cultural-archive" style="margin-top: 26px;">
            ${site.renderSimpleCards(content.events.cards, lang, "event-card", "title", "body")}
          </div>
        </div>
        <div class="cultural-slab">
          <p class="section-label">${tt(content.gallery.label, lang)}</p>
          <h2 class="section-title">${tt(content.gallery.title, lang)}</h2>
          <div class="collection-grid quad gallery-grid" style="margin-top: 26px;">
            ${site.renderGalleryCards(content.gallery.items, lang, "gallery-card")}
          </div>
        </div>
      </section>

      <section id="team" class="page-shell section-block cultural-lower">
        <div class="cultural-slab">
          <p class="section-label">${tt(content.team.label, lang)}</p>
          <h2 class="section-title">${tt(content.team.title, lang)}</h2>
          <div class="collection-grid" style="margin-top: 26px;">
            ${site.renderSimpleCards(content.team.people, lang, "team-card", "name", "body")}
          </div>
        </div>
        <div id="join" class="cultural-cta">
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
