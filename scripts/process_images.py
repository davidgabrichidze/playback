#!/usr/bin/env python3
"""
process_images.py — resize and balance images for web delivery.

Pipeline, per file (in place):
  1. Apply EXIF orientation (so portraits aren't sideways).
  2. Convert to RGB (drops alpha, handles CMYK/P).
  3. Resize so the longest side <= MAX_EDGE (no upscaling).
  4. Gentle balance:
       - ImageOps.autocontrast with a small cutoff (ignores extreme pixels).
       - Subtle contrast + saturation + sharpness bumps via ImageEnhance.
  5. Save as optimized progressive JPEG, stripped of metadata.

Usage:
    python3 scripts/process_images.py <file-or-dir> [<file-or-dir> ...]

Examples:
    python3 scripts/process_images.py src/images/gallery
    python3 scripts/process_images.py src/images/team/tsisia-cholokashvili.jpg
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

# --- tunables --------------------------------------------------------------
MAX_EDGE = 1600           # max width/height in pixels (retina-friendly)
JPEG_QUALITY = 85         # visually lossless for photos
AUTOCONTRAST_CUTOFF = 0.5 # % of pixels to ignore at each end of histogram
CONTRAST_BOOST = 1.02     # 1.0 = no change
SATURATION_BOOST = 1.00   # no saturation boost — avoid oversaturating warm skin tones
SHARPNESS_BOOST = 1.10
# ---------------------------------------------------------------------------

VALID_EXT = {".jpg", ".jpeg", ".png", ".webp"}


def process_one(path: Path) -> dict:
    """Process a single image in place. Returns stats dict."""
    before_bytes = path.stat().st_size

    with Image.open(path) as im:
        # 1. EXIF orientation
        im = ImageOps.exif_transpose(im)

        # 2. RGB
        if im.mode != "RGB":
            im = im.convert("RGB")

        before_size = im.size  # (w, h)

        # 3. Resize (don't upscale)
        longest = max(im.size)
        if longest > MAX_EDGE:
            scale = MAX_EDGE / longest
            new_size = (round(im.size[0] * scale), round(im.size[1] * scale))
            im = im.resize(new_size, Image.LANCZOS)

        after_size = im.size

        # 4. Balance
        im = ImageOps.autocontrast(im, cutoff=AUTOCONTRAST_CUTOFF, preserve_tone=True)
        im = ImageEnhance.Contrast(im).enhance(CONTRAST_BOOST)
        im = ImageEnhance.Color(im).enhance(SATURATION_BOOST)
        im = ImageEnhance.Sharpness(im).enhance(SHARPNESS_BOOST)

        # 5. Save — overwrite original. No EXIF (strip metadata).
        im.save(
            path,
            format="JPEG",
            quality=JPEG_QUALITY,
            optimize=True,
            progressive=True,
        )

    after_bytes = path.stat().st_size
    return {
        "path": path,
        "before_bytes": before_bytes,
        "after_bytes": after_bytes,
        "before_size": before_size,
        "after_size": after_size,
    }


def iter_targets(args: list[str]):
    for a in args:
        p = Path(a)
        if p.is_dir():
            for f in sorted(p.iterdir(), key=lambda x: (len(x.stem), x.stem)):
                if f.is_file() and f.suffix.lower() in VALID_EXT:
                    yield f
        elif p.is_file():
            yield p
        else:
            print(f"skip (not found): {p}", file=sys.stderr)


def human(n: int) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.1f}{unit}"
        n /= 1024
    return f"{n:.1f}TB"


def main(argv: list[str]) -> int:
    if not argv:
        print(__doc__)
        return 1

    total_before = 0
    total_after = 0
    count = 0

    for target in iter_targets(argv):
        stats = process_one(target)
        total_before += stats["before_bytes"]
        total_after += stats["after_bytes"]
        count += 1
        bw, bh = stats["before_size"]
        aw, ah = stats["after_size"]
        print(
            f"{stats['path']}: "
            f"{bw}x{bh} -> {aw}x{ah}, "
            f"{human(stats['before_bytes'])} -> {human(stats['after_bytes'])}"
        )

    if count:
        saved = total_before - total_after
        pct = saved / total_before * 100 if total_before else 0
        print(
            f"\nDone: {count} file(s). "
            f"Total {human(total_before)} -> {human(total_after)} "
            f"(-{human(saved)}, -{pct:.1f}%)"
        )
    else:
        print("No files processed.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
