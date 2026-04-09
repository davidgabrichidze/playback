(function () {
  var content = window.PLAYBACK_CONTENT;
  var site = window.PlaybackSite;
  var stageWords = [
    { ka: "მოსმენა", en: "Listening" },
    { ka: "ისტორია", en: "Story" },
    { ka: "ასახვა", en: "Reflection" },
  ];

  function render(lang) {
    document.getElementById("nav-links").innerHTML = site.renderNav(content.navigation, lang);

    document.getElementById("page-root").innerHTML =
      '<section class="page-shell section-block editorial-hero">' +
      '<div class="hero-copy-panel">' +
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
      '<div class="hero-stage">' +
      '<div class="stage-frame">' +
      stageWords
        .map(function (item) {
          return (
            '<div class="stage-panel"><span>' +
            site.escapeHtml(site.t(item, lang)) +
            "</span></div>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="hero-stats">' +
      site.renderStats(content.stats, lang) +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section id="about" class="page-shell section-block editorial-section">' +
      '<div class="grid-two asymmetric">' +
      '<div>' +
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
      '<div class="card-grid triple">' +
      site.renderHighlightCards(content.about.highlights, lang, "value-card") +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section id="process" class="page-shell section-block editorial-section">' +
      '<div class="editorial-band">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.process.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.process.title, lang)) +
      "</h2>" +
      '<p class="section-intro">' +
      site.escapeHtml(site.t(content.process.intro, lang)) +
      "</p>" +
      '<div class="card-grid quad" style="margin-top: 28px;">' +
      site.renderProcessCards(content.process.steps, lang, "process-card") +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="page-shell section-block editorial-section">' +
      '<div class="grid-two">' +
      '<div>' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.quotes.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.quotes.title, lang)) +
      "</h2>" +
      '<div class="card-grid triple" style="margin-top: 28px;">' +
      site.renderQuoteCards(content.quotes.items, lang, "quote-card") +
      "</div>" +
      "</div>" +
      '<div>' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.values.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.values.title, lang)) +
      "</h2>" +
      '<div class="card-grid" style="margin-top: 28px;">' +
      site.renderHighlightCards(content.values.items, lang, "value-card") +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section id="programs" class="page-shell section-block editorial-section">' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.programs.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.programs.title, lang)) +
      "</h2>" +
      '<p class="section-intro">' +
      site.escapeHtml(site.t(content.programs.intro, lang)) +
      "</p>" +
      '<div class="card-grid triple" style="margin-top: 28px;">' +
      site.renderProgramCards(content.programs.cards, lang, "program-card") +
      "</div>" +
      "</section>" +
      '<section id="events" class="page-shell section-block editorial-section">' +
      '<div class="grid-two">' +
      '<div>' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.events.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.events.title, lang)) +
      "</h2>" +
      '<p class="section-intro">' +
      site.escapeHtml(site.t(content.events.intro, lang)) +
      "</p>" +
      '<div class="card-grid" style="margin-top: 28px;">' +
      site.renderSimpleCards(content.events.cards, lang, "event-card", "title", "body") +
      "</div>" +
      "</div>" +
      '<div>' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.gallery.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.gallery.title, lang)) +
      "</h2>" +
      '<div class="card-grid gallery-grid quad" style="margin-top: 28px;">' +
      site.renderGalleryCards(content.gallery.items, lang, "gallery-card") +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section id="team" class="page-shell section-block editorial-section">' +
      '<div class="grid-two">' +
      '<div>' +
      '<p class="section-label">' +
      site.escapeHtml(site.t(content.team.label, lang)) +
      "</p>" +
      '<h2 class="section-title">' +
      site.escapeHtml(site.t(content.team.title, lang)) +
      "</h2>" +
      '<div class="card-grid" style="margin-top: 28px;">' +
      site.renderSimpleCards(content.team.people, lang, "team-card", "name", "body") +
      "</div>" +
      "</div>" +
      '<div id="join" class="editorial-join">' +
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
