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
 *   {{#gallery}}                        — shortcut that expands 25 gallery items
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

// ---------- gallery expansion ----------

function galleryMarkup(data) {
  const initialVisible = 9;
  const total = 25;
  let out = "";
  for (let i = 0; i < total; i++) {
    const hidden = i >= initialVisible ? " hidden" : "";
    const n = i + 1;
    out += '            <div class="gallery-item' + hidden + '" data-index="' + i + '">\n';
    out += '              <img src="' + data.assetPrefix + 'images/gallery/' + n + '.jpg" alt="' + data.gallery.itemAlt + ' ' + n + '" />\n';
    out += "            </div>\n";
  }
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

  for (const lang of langs) {
    const globals = Object.assign({}, lang.data, {
      assetPrefix: lang.assetPrefix,
    });
    globals.performance = Object.assign({}, lang.data.performance, {
      monthsJson: JSON.stringify(lang.data.performance.months),
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
  const standalone = ["typography.html", "philosophy.html"];
  for (const name of standalone) {
    const srcPath = path.join(SRC, name);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(DIST, name));
      console.log("wrote dist/" + name);
    }
  }

  console.log("build complete.");
}

build();
