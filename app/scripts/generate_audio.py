"""Generate one mp3 per German text in the content CSVs, using the Thorsten Piper voice.

Writes public/audio/<name>.mp3 plus public/audio/manifest.json ({text: file}).
File names follow the text: "Wo kommt das hin?" -> wo-kommt-das-hin.mp3.
Texts that differ only in case or punctuation share one clip.
Existing files are skipped, so re-runs only synthesise new or edited rows;
clips for texts that no longer exist are deleted.

Usage: scripts/.venv/bin/python scripts/generate_audio.py [--model PATH]
"""
import argparse
import csv
import hashlib
import unicodedata
import json
import os
import re
import subprocess
import tempfile
import wave
from pathlib import Path

from piper import PiperVoice

APP = Path(__file__).resolve().parent.parent
CONTENT = APP.parent / "german-by-context"
OUT = APP / "public" / "audio"
DEFAULT_MODEL = os.environ.get("THORSTEN_MODEL", str(Path.home() / "Downloads" / "de_DE-thorsten-medium.onnx"))
# Dialogue lines mark vocab words as "{wohne|wohnen}"; only the text before "|" is spoken.
MARK = re.compile(r"\{([^}|]+)(?:\|[^}]+)?\}")


def texts():
    """Every German text the app can speak: the `german` column of <category>/<situation>/*.csv."""
    found = set()
    for path in sorted(CONTENT.glob("*/*/*.csv")):
        with open(path, newline="") as f:
            for row in csv.DictReader(f):
                if row.get("german"):
                    found.add(MARK.sub(r"\1", row["german"]).strip())
    return sorted(found)


UMLAUTS = {"ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss"}


def slug(text):
    """Lowercase, umlauts spelled out, spaces as "-", other punctuation dropped."""
    s = unicodedata.normalize("NFC", text).lower()
    for umlaut, plain in UMLAUTS.items():
        s = s.replace(umlaut, plain)
    s = s.replace("&", " und ")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or hashlib.sha1(text.encode()).hexdigest()[:12]


def file_names(texts):
    """{text: file}. Texts that differ only in case or punctuation share one clip."""
    return {text: slug(text) + ".mp3" for text in texts}


def spoken(text):
    # Same rule as the app's browser fallback: blanks like "___" become a pause.
    return re.sub(r"_+", "…", text)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default=DEFAULT_MODEL)
    args = parser.parse_args()

    voice = PiperVoice.load(args.model)
    OUT.mkdir(parents=True, exist_ok=True)

    all_texts = texts()
    manifest, created = file_names(all_texts), 0
    with tempfile.TemporaryDirectory() as tmp:
        wav_path = Path(tmp) / "clip.wav"
        for i, text in enumerate(all_texts, 1):
            target = OUT / manifest[text]
            if target.exists():
                continue
            with wave.open(str(wav_path), "wb") as wav:
                voice.synthesize_wav(spoken(text), wav)
            subprocess.run(
                ["ffmpeg", "-loglevel", "error", "-y", "-i", str(wav_path), "-ac", "1", "-b:a", "48k", str(target)],
                check=True,
            )
            created += 1
            if created % 200 == 0:
                print(f"{i}/{len(all_texts)} …")

    # Remove clips whose text no longer exists in the CSVs.
    keep = set(manifest.values())
    removed = 0
    for old in OUT.glob("*.mp3"):
        if old.name not in keep:
            old.unlink()
            removed += 1

    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, sort_keys=True))
    print(f"{len(all_texts)} texts, {created} new clips, {removed} removed, manifest written")
    print("Restart `npm run dev` so the dev server serves the new files.")


if __name__ == "__main__":
    main()
