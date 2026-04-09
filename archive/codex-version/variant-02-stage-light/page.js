(function () {
  var content = window.PLAYBACK_CONTENT;
  var site = window.PlaybackSite;
  var storyBits = [
    {
      title: { ka: "ადამიანური სითბო", en: "Human warmth" },
      body: {
        ka: "სივრცე, სადაც ისტორია მიღებულია უპირობოდ.",
        en: "A space where the story is received without condition.",
      },
    },
    {
      title: { ka: "სცენის შუქი", en: "Stage light" },
      body: {
        ka: "თბილი და მშვიდი ატმოსფერო, რომელიც ყურადღებას ინახავს.",
        en: "A warm and calm atmosphere that keeps attention present.",
      },
    },
    {
      title: { ka: "გაზიარებული ასახვა", en: "Shared reflection" },
      body: {
        ka: "მაყურებელი საკუთარ გამოცდილებას სხვებთან ერთად ხედავს.",
        en: "The audience sees its own experience together with others.",
      },
    },
  ];

  function render(lang) {
    document.getElementById("nav-links").innerHTML = site.renderNav(content.navigation, lang);

    document.getElementById("page-root").innerHTML =
      '<section class="page-shell section-block warm-hero">' +
      '<div class="warm-hero-copy">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.hero.label, lang)) +
      "</p>" +
      '<h1 class="section-title">' +
      site.escapeHtml(site.t(content.hero.title, lang)) +
      "</h1>" +
      '<p class="section-intro">' +
      site.escapeHtml(site.t(content.hero.body, lang)) +
      "</p>" +
      site.renderButtons(content.hero.actions, lang) +
      "</div>" +
      '<div class="warm-hero-visual">' +
      '<div class="visual-orb"></div>' +
      storyBits
        .map(function (item, index) {
          var names = ["one", "two", "three"];
          return (
            '<div class="story-chip ' +
            names[index] +
            '">' +
            '<p class="card-kicker">' +
            site.escapeHtml(site.t(item.title, lang)) +
            "</p>" +
            '<p class="card-body">' +
            site.escapeHtml(site.t(item.body, lang)) +
            "</p>" +
            "</div>"
          );
        })
        .join("") +
      "</div>" +
      "</section>" +
      '<section class="page-shell section-block">' +
      '<div class="warm-stat-band">' +
      '<div class="stat-grid">' +
      site.renderStats(content.stats, lang) +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section id="about" class="page-shell section-block">' +
      '<div class="warm-grid two">' +
      '<div class="warm-stack">' +
      '<div class="stage-card">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.about.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.about.title, lang)) +
      "</h2>" +
      '<div class="section-intro">' +
      site.renderParagraphs(content.about.paragraphs, lang, "copy-stack") +
      "</div>" +
      "</div>" +
      '<div class="stage-card">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.values.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.values.title, lang)) +
      "</h2>" +
      '<div class="warm-stack" style="margin-top: 24px;">' +
      site.renderHighlightCards(content.values.items, lang, "value-card") +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="warm-stack">' +
      '<div class="stage-card">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.about.label, lang)) +
      "</p>" +
      '<div class="warm-stack">' +
      site.renderHighlightCards(content.about.highlights, lang, "value-card") +
      "</div>" +
      "</div>" +
      '<div class="stage-card quote-stack">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.quotes.label, lang)) +
      "</p>" +
      '<div class="warm-stack" style="margin-top: 18px;">' +
      site.renderQuoteCards(content.quotes.items.slice(0, 2), lang, "quote-card") +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section id="process" class="page-shell section-block">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.process.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.process.title, lang)) +
      "</h2>" +
      '<p class="section-intro">' +
      site.escapeHtml(site.t(content.process.intro, lang)) +
      "</p>" +
      '<div class="process-flow" style="margin-top: 28px;">' +
      site.renderProcessCards(content.process.steps, lang, "stage-card process-card") +
      "</div>" +
      "</section>" +
      '<section id="programs" class="page-shell section-block">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.programs.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.programs.title, lang)) +
      "</h2>" +
      '<p class="section-intro">' +
      site.escapeHtml(site.t(content.programs.intro, lang)) +
      "</p>" +
      '<div class="warm-grid triple programs" style="margin-top: 28px;">' +
      site.renderProgramCards(content.programs.cards, lang, "stage-card program-card") +
      "</div>" +
      "</section>" +
      '<section id="events" class="page-shell section-block">' +
      '<div class="warm-grid two">' +
      '<div class="stage-card">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.events.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.events.title, lang)) +
      "</h2>" +
      '<p class="section-intro">' +
      site.escapeHtml(site.t(content.events.intro, lang)) +
      "</p>" +
      '<div class="warm-stack" style="margin-top: 24px;">' +
      site.renderSimpleCards(content.events.cards, lang, "event-card stage-card", "title", "body") +
      "</div>" +
      "</div>" +
      '<div class="stage-card">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.gallery.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.gallery.title, lang)) +
      "</h2>" +
      '<div class="warm-grid gallery-grid quad" style="margin-top: 24px;">' +
      site.renderGalleryCards(content.gallery.items, lang, "gallery-card stage-card") +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section id="team" class="page-shell section-block">' +
      '<div class="warm-grid two">' +
      '<div class="stage-card">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.team.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.team.title, lang)) +
      "</h2>" +
      '<div class="warm-stack" style="margin-top: 24px;">' +
      site.renderSimpleCards(content.team.people, lang, "team-card stage-card", "name", "body") +
      "</div>" +
      "</div>" +
      '<div id="join" class="warm-join">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.join.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.join.title, lang)) +
      "</h2>" +
      '<p class="section-intro">' +
      site.escapeHtml(site.t(content.join.body, lang)) +
      "</p>" +
      site.renderButtons(content.join.actions, lang) +
      "</div>" +
      "</div>" +
      "</section>";

    document.getElementById("footer-root").innerHTML = site.renderFooter(content.footer, lang);
  }

  site.initPage(render);
})();
