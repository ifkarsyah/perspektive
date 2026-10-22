"""Generate one mp3 per German text in the content CSVs, using the Thorsten Piper voice.

Writes public/audio/<hash>.mp3 plus public/audio/manifest.json ({text: file}).
Existing files are skipped, so re-runs only synthesise new or edited rows;
clips for texts that no longer exist are deleted.

Usage: scripts/.venv/bin/python scripts/generate_audio.py [--model PATH]
"""
import argparse
import csv
import hashlib
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


def texts():
    """Every German text the app can speak: the `german` column of <category>/<situation>/*.csv."""
    found = set()
    for path in sorted(CONTENT.glob("*/*/*.csv")):
        with open(path, newline="") as f:
            for row in csv.DictReader(f):
                if row.get("german"):
                    found.add(row["german"].strip())
    return sorted(found)


def file_name(text):
    return hashlib.sha1(text.encode()).hexdigest()[:12] + ".mp3"


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
    manifest, created = {}, 0
    with tempfile.TemporaryDirectory() as tmp:
        wav_path = Path(tmp) / "clip.wav"
        for i, text in enumerate(all_texts, 1):
            name = file_name(text)
            manifest[text] = name
            target = OUT / name
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


if __name__ == "__main__":
    main()
