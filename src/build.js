#!/usr/bin/env node
/**
 * Playback Theatre — Multi-language static site builder.
 *
 * Reads:
 *   - src/template.html
 *   - src/content/ka.json
 *   - src/content/en.json
 *
 * Writes:
 *   - dist/index.html       (Georgian)
 *   - dist/en/index.html    (English)
 *   - dist/styles.css
 *   - dist/images/**
 *
 * Template syntax:
 *   {{key.path}}                        — nested key lookup
 *   {{#each array}} ... {{/each}}       — loop (item referenced as {{item}} or {{item.xxx}})
 *                                         inside loops {{isLast}}, {{isFirst}}, {{index}} are available
 *   {{#if flag}} ... {{/if}}            — conditional block
 *   {{#gallery}}                        — auto-discovers gallery items by scanning src/images/gallery/
 *
 * No external dependencies — built-ins only (fs, path).
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

// ---------- utilities ----------

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function readJson(p) {
  return JSON.parse(readText(p));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d);
    }
  }
}

// ---------- template engine ----------

/**
 * Look up a dotted key path inside a data object / local scope.
 * Local scope (for loops) wins over globals.
 */
function lookup(key, globals, scope) {
  if (!key) return undefined;
  const parts = key.split(".");
  if (scope && Object.prototype.hasOwnProperty.call(scope, parts[0])) {
    let v = scope[parts[0]];
    for (let i = 1; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }
  let v = globals;
  for (const p of parts) {
    if (v == null) return undefined;
    v = v[p];
  }
  return v;
}

/**
 * Replace all simple {{key.path}} references in a string using `globals`
 * and (optionally) a loop scope. Block helpers must be processed by
 * `renderTemplate` first.
 */
function replaceSimple(str, globals, scope) {
  return str.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, function (_, key) {
    const v = lookup(key, globals, scope);
    if (v === undefined || v === null) return "";
    return String(v);
  });
}

/**
 * Find the matching close tag for a block helper, supporting nested blocks
 * of the same kind. Returns the position of the matching close tag and the
 * position right after it.
 */
function findBlockEnd(str, tag, startAfterOpen) {
  const openPattern = new RegExp(
    "\\{\\{\\s*#" + tag + "\\s+[a-zA-Z0-9_.]+\\s*\\}\\}",
    "g",
  );
  const closePattern = new RegExp(
    "\\{\\{\\s*\\/" + tag + "\\s*\\}\\}",
    "g",
  );

  let depth = 1;
  let cursor = startAfterOpen;

  while (depth > 0) {
    openPattern.lastIndex = cursor;
    closePattern.lastIndex = cursor;
    const nextOpen = openPattern.test(str)
      ? { index: openPattern.lastIndex - 0, match: null }
      : null;
    // Re-run to capture match properly.
    openPattern.lastIndex = cursor;
    closePattern.lastIndex = cursor;

    let o = null;
    let c = null;
    let m1;
    openPattern.lastIndex = cursor;
    m1 = openPattern.exec ? openPattern.exec(str) : null;
    if (m1) o = { index: m1.index, len: m1[0].length };
    let m2;
    closePattern.lastIndex = cursor;
    m2 = closePattern.exec ? closePattern.exec(str) : null;
    if (m2) c = { index: m2.index, len: m2[0].length };

    if (!c) {
      throw new Error("Unclosed {{#" + tag + "}} block");
    }
    if (o && o.index < c.index) {
      depth++;
      cursor = o.index + o.len;
    } else {
      depth--;
      if (depth === 0) {
        return { innerEnd: c.index, afterEnd: c.index + c.len };
      }
      cursor = c.index + c.len;
    }
  }
  throw new Error("Unreachable");
}

/**
 * Render a template string against data, handling {{#each}} and {{#if}}
 * block helpers recursively.
 */
function renderTemplate(str, globals, scope) {
  const blockOpen = /\{\{\s*#(each|if)\s+([a-zA-Z0-9_.]+)\s*\}\}/;
  const m = str.match(blockOpen);
  if (!m) {
    return replaceSimple(str, globals, scope);
  }

  const tag = m[1];
  const key = m[2];
  const openIdx = m.index;
  const openLen = m[0].length;

  const bounds = findBlockEnd(str, tag, openIdx + openLen);
  const innerEnd = bounds.innerEnd;
  const afterEnd = bounds.afterEnd;

  const before = str.slice(0, openIdx);
  const inner = str.slice(openIdx + openLen, innerEnd);
  const after = str.slice(afterEnd);

  const renderedBefore = renderTemplate(before, globals, scope);

  let renderedBlock = "";
  if (tag === "each") {
    const arr = lookup(key, globals, scope);
    if (Array.isArray(arr)) {
      for (let i = 0; i < arr.length; i++) {
        const itemScope = Object.assign({}, scope || {}, {
          item: arr[i],
          index: i,
          isFirst: i === 0,
          isLast: i === arr.length - 1,
        });
        renderedBlock += renderTemplate(inner, globals, itemScope);
      }
    }
  } else if (tag === "if") {
    const v = lookup(key, globals, scope);
    if (v) {
      renderedBlock = renderTemplate(inner, globals, scope);
    }
  }

  const renderedAfter = renderTemplate(after, globals, scope);
  return renderedBefore + renderedBlock + renderedAfter;
}

// ---------- next performance date ----------

/**
 * Compute the next scheduled performance: the last Saturday of the current
 * month (or of the following month if the current month's last Saturday has
 * already passed, or if the current month is August — summer break).
 * Returns ISO 8601 strings with Georgia timezone (+04:00) for startDate (20:00)
 * and endDate (21:30, ~90 min show).
 */
function lastSaturdayOf(year, month /* 0-11 */) {
  const d = new Date(Date.UTC(year, month + 1, 0)); // last day of that month
  const daysBack = (d.getUTCDay() - 6 + 7) % 7;
  d.setUTCDate(d.getUTCDate() - daysBack);
  return d; // UTC date matches the local date since we only care about Y/M/D
}

function nextPerformance(now = new Date()) {
  const AUG = 7; // month index for August
  let year = now.getUTCFullYear();
  let month = now.getUTCMonth();

  for (let i = 0; i < 14; i++) {
    if (month === AUG) {
      month = (month + 1) % 12;
      if (month === 0) year++;
      continue;
    }
    const sat = lastSaturdayOf(year, month);
    const y = sat.getUTCFullYear();
    const m = String(sat.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(sat.getUTCDate()).padStart(2, "0");
    const startIso = `${y}-${m}-${dd}T20:00:00+04:00`;
    const endIso = `${y}-${m}-${dd}T21:30:00+04:00`;
    // Compare against "now" in Georgia time; if this Saturday 20:00 hasn't passed, use it
    const startAbs = new Date(startIso).getTime();
    if (startAbs >= now.getTime()) {
      return { startDate: startIso, endDate: endIso };
    }
    month = (month + 1) % 12;
    if (month === 0) year++;
  }
  throw new Error("nextPerformance: could not find upcoming date within 14 months");
}

// ---------- sitemap ----------

/**
 * Generate dist/sitemap.xml with both locales cross-referenced via
 * xhtml:link hreflang alternates. Keeps Google's understanding of
 * language variants explicit and matches the <link rel="alternate">
 * tags in template.html.
 */
const SITE_URL = "https://playbacktheatre.ge";
const LOCALES = [
  { hreflang: "ka", loc: "/", xdefault: true },
  { hreflang: "en", loc: "/en/", xdefault: false },
];

function writeSitemap() {
  const today = new Date().toISOString().split("T")[0];
  const altTags = LOCALES.map(
    (l) =>
      `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${SITE_URL}${l.loc}" />`,
  );
  altTags.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
  );
  const altBlock = altTags.join("\n");

  const urls = LOCALES.map(
    (l) => `  <url>
    <loc>${SITE_URL}${l.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${l.xdefault ? "1.0" : "0.9"}</priority>
${altBlock}
  </url>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml, "utf8");
  console.log("wrote dist/sitemap.xml");
}

// ---------- gallery expansion ----------

/**
 * Auto-discover gallery images by scanning src/images/gallery/.
 * Returns an array of filenames, naturally sorted (so "10.jpg" comes after "9.jpg",
 * and "a.jpg" before "b.jpg"). Filenames are otherwise opaque — gaps in numbering
 * are fine, non-numeric names are fine.
 */
function discoverGalleryFiles() {
  const dir = path.join(SRC, "images", "gallery");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

function galleryMarkup(data) {
  const initialVisible = 9;
  const files = data.gallery.files || [];
  let out = "";
  files.forEach((file, i) => {
    const hidden = i >= initialVisible ? " hidden" : "";
    out += '            <div class="gallery-item' + hidden + '" data-index="' + i + '">\n';
    out += '              <img src="' + data.assetPrefix + 'images/gallery/' + file + '" alt="' + data.gallery.itemAlt + ' ' + (i + 1) + '" />\n';
    out += "            </div>\n";
  });
  return out;
}

// ---------- main build ----------

function build() {
  const template = readText(path.join(SRC, "template.html"));
  const ka = readJson(path.join(SRC, "content", "ka.json"));
  const en = readJson(path.join(SRC, "content", "en.json"));

  rmDir(DIST);
  ensureDir(DIST);
  ensureDir(path.join(DIST, "en"));

  const langs = [
    {
      data: ka,
      outFile: path.join(DIST, "index.html"),
      assetPrefix: "",
    },
    {
      data: en,
      outFile: path.join(DIST, "en", "index.html"),
      assetPrefix: "../",
    },
  ];

  const galleryFiles = discoverGalleryFiles();
  console.log("gallery: " + galleryFiles.length + " image(s) discovered");

  const np = nextPerformance();
  console.log("next performance: " + np.startDate);

  // Site-wide config (analytics IDs etc.) — shared across locales
  const configPath = path.join(SRC, "config.json");
  const config = fs.existsSync(configPath) ? readJson(configPath) : {};
  const analytics = config.analytics || {};
  console.log(
    "analytics: GA4=" + (analytics.ga4Id ? "on" : "off") +
    ", Clarity=" + (analytics.clarityId ? "on" : "off"),
  );

  for (const lang of langs) {
    const globals = Object.assign({}, lang.data, {
      assetPrefix: lang.assetPrefix,
      nextPerformance: np,
      analytics: analytics,
    });
    globals.performance = Object.assign({}, lang.data.performance, {
      monthsJson: JSON.stringify(lang.data.performance.months),
    });
    globals.gallery = Object.assign({}, lang.data.gallery, {
      files: galleryFiles,
      filesJson: JSON.stringify(galleryFiles),
      total: galleryFiles.length,
    });

    let out = template.replace(/\{\{#gallery\}\}/g, galleryMarkup(globals));
    out = renderTemplate(out, globals, null);

    fs.writeFileSync(lang.outFile, out, "utf8");
    console.log("wrote " + path.relative(ROOT, lang.outFile));
  }

  fs.copyFileSync(path.join(SRC, "styles.css"), path.join(DIST, "styles.css"));
  console.log("wrote dist/styles.css");

  copyDir(path.join(SRC, "images"), path.join(DIST, "images"));
  console.log("wrote dist/images/");

  // Copy standalone pages that don't go through the template engine
  const standalone = ["typography.html", "philosophy.html", "robots.txt"];
  for (const name of standalone) {
    const srcPath = path.join(SRC, name);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(DIST, name));
      console.log("wrote dist/" + name);
    }
  }

  writeSitemap();

  console.log("build complete.");
}

build();
