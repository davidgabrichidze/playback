# Playback Theatre — Project Instructions

## CSS Rules

- **NEVER use inline `style=""` attributes in HTML.** All styling must go through CSS classes in `styles.css`. Only exception: `background-image: url(...)` for dynamic image paths.
- Use the component system classes (`.heading`, `.hook`, `.intro`, `.card-bordered`, `.quote`, `.avatar`, `.profile`, `.cta-button`, `.note`, `.label`, `.grid-2`, `.grid-3`, `.grid-auto`, etc.) — see `typography.html` for the full reference.
- If a new style is needed, create a reusable component class in `styles.css`, not a one-off inline style.
- Section-specific overrides go in the section's CSS block in `styles.css`, not inline.

## Architecture

- `styles.css` — shared component CSS library (used by all pages)
- `index.html` — main landing page (cinematic variant, approved)
- `alternative.html` — theatrical variant
- `typography.html` — component library reference page
- `content/ka.json`, `content/en.json` — translation data

## Bilingual System

- Language toggle via `body.lang-en` class
- All text uses `<span class="ka">` and `<span class="en">` pairs
- CSS handles visibility, no JS rendering

## Key Decisions

- August (month index 7) is skipped for performances — summer break
- Scroll-snap: `mandatory` on desktop, none on mobile
- No build process, no frameworks — plain HTML/CSS/JS
- Dark theme only — theatre metaphor
