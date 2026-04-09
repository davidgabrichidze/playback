#!/usr/bin/env python3
"""
ქართული ფლეიბექ თეატრის საიტიდან სურათების უსაფრთხო ჩამოტვირთვის სკრიპტი.
Safe image downloader for Georgian Playback Theatre site.

გაშვება / Usage:
  1. playback_images.json ფაილი გადაიტანე ამ სკრიპტის გვერდით
     (Move playback_images.json next to this script)
  2. გაუშვი: python3 download_images.py
     (Run: python3 download_images.py)

სურათები შეინახება ./playback_images/ საქაღალდეში, სექციებად დახარისხებული.
Images will be saved to ./playback_images/ folder, organized by section.
"""

import json
import os
import time
import sys
import random
from pathlib import Path

try:
    import requests
except ImportError:
    print("❌ requests ბიბლიოთეკა საჭიროა. დააინსტალირე:")
    print("   pip3 install requests")
    sys.exit(1)


# --- კონფიგურაცია / Configuration ---
OUTPUT_DIR = Path("./playback_images")
JSON_FILE = Path("./playback_images.json")
MIN_DELAY = 2.0   # მინიმალური პაუზა (წამი) / min delay between downloads (seconds)
MAX_DELAY = 4.0   # მაქსიმალური პაუზა (წამი) / max delay
MAX_RETRIES = 3    # მაქსიმალური ცდების რაოდენობა / max retries per image
REQUEST_TIMEOUT = 30  # ტაიმაუთი (წამი) / timeout per request

# უსაფრთხო headers — ნორმალური ბრაუზერის იმიტაცია
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,ka;q=0.8",
    "Referer": "https://sites.google.com/",
    "Sec-Fetch-Dest": "image",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "cross-site",
}


def load_image_data(json_path: Path) -> list:
    """JSON ფაილიდან სურათების მონაცემების ჩატვირთვა."""
    if not json_path.exists():
        print(f"❌ ფაილი ვერ მოიძებნა: {json_path}")
        print("   ჯერ playback_images.json უნდა ჩამოტვირთო ბრაუზერიდან.")
        sys.exit(1)

    with open(json_path, "r") as f:
        data = json.load(f)

    print(f"✅ ჩატვირთულია {len(data)} სურათის მონაცემი")
    return data


def ensure_dirs(images: list):
    """საქაღალდეების შექმნა სექციების მიხედვით."""
    sections = set(img["section"] for img in images)
    for section in sections:
        section_dir = OUTPUT_DIR / section
        section_dir.mkdir(parents=True, exist_ok=True)
    print(f"📁 შექმნილია {len(sections)} საქაღალდე: {', '.join(sorted(sections))}")


def download_image(url: str, save_path: Path, index: int, total: int) -> bool:
    """ერთი სურათის უსაფრთხო ჩამოტვირთვა retry-ით."""
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = requests.get(
                url,
                headers=HEADERS,
                timeout=REQUEST_TIMEOUT,
                stream=True,
            )
            resp.raise_for_status()

            content_type = resp.headers.get("Content-Type", "")
            if "image" not in content_type and len(resp.content) < 1000:
                print(f"  ⚠️  [{index+1}/{total}] არასურათური კონტენტი: {content_type}")
                return False

            with open(save_path, "wb") as f:
                for chunk in resp.iter_content(chunk_size=8192):
                    f.write(chunk)

            size_kb = save_path.stat().st_size / 1024
            print(f"  ✅ [{index+1}/{total}] {save_path.name} — {size_kb:.0f} KB")
            return True

        except requests.exceptions.RequestException as e:
            if attempt < MAX_RETRIES:
                wait = MIN_DELAY * attempt
                print(f"  ⏳ [{index+1}/{total}] ცდა {attempt}/{MAX_RETRIES} ვერ მოხერხდა, ველოდებით {wait:.0f}წმ... ({e})")
                time.sleep(wait)
            else:
                print(f"  ❌ [{index+1}/{total}] ვერ ჩამოიტვირთა {MAX_RETRIES} ცდის შემდეგ: {e}")
                return False

    return False


def get_extension(url: str) -> str:
    """URL-დან ფაილის გაფართოების დადგენა."""
    # Google-ის სურათების URL-ები არ შეიცავს გაფართოებას,
    # ამიტომ ვიყენებთ .jpg (ყველაზე გავრცელებული)
    return ".jpg"


def main():
    print("=" * 60)
    print("🎭 ქართული ფლეიბექ თეატრის სურათების ჩამოტვირთვა")
    print("   Georgian Playback Theatre Image Downloader")
    print("=" * 60)
    print()

    # ჩატვირთვა
    images = load_image_data(JSON_FILE)
    ensure_dirs(images)

    # სტატისტიკა
    success = 0
    failed = 0
    skipped = 0

    print()
    print(f"🚀 იწყება {len(images)} სურათის ჩამოტვირთვა...")
    print(f"   პაუზა ყოველ ჩამოტვირთვას შორის: {MIN_DELAY}-{MAX_DELAY} წამი")
    print()

    for i, img in enumerate(images):
        url = img["url"]
        section = img["section"]
        ext = get_extension(url)
        filename = f"playback_{section}_{str(i+1).padStart(2, '0') if hasattr(str, 'padStart') else str(i+1).zfill(2)}{ext}"
        save_path = OUTPUT_DIR / section / filename

        # გამოტოვება თუ უკვე არსებობს
        if save_path.exists() and save_path.stat().st_size > 1000:
            print(f"  ⏭️  [{i+1}/{len(images)}] უკვე არსებობს: {save_path.name}")
            skipped += 1
            continue

        if download_image(url, save_path, i, len(images)):
            success += 1
        else:
            failed += 1

        # უსაფრთხო პაუზა — რანდომული, რომ ბოტივით არ გამოვჩნდეთ
        if i < len(images) - 1:
            delay = random.uniform(MIN_DELAY, MAX_DELAY)
            time.sleep(delay)

    # შედეგი
    print()
    print("=" * 60)
    print(f"📊 შედეგი / Results:")
    print(f"   ✅ ჩამოტვირთული: {success}")
    print(f"   ⏭️  გამოტოვებული (უკვე იყო): {skipped}")
    print(f"   ❌ ვერ ჩამოიტვირთა: {failed}")
    print(f"   📁 საქაღალდე: {OUTPUT_DIR.absolute()}")
    print("=" * 60)


if __name__ == "__main__":
    main()
