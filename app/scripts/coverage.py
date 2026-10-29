"""Report which vocab rows each situation's dialogue.csv uses.

Dialogue lines mark vocab words as "{wohne|wohnen}" (text|lemma) or "{neu}" (text is the lemma).
A lemma must match the `german` column of a vocab_*.csv row; lemmas that match nothing are listed
as unknown, which usually means a typo.

Usage: python3 scripts/coverage.py
"""
import csv
import re
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent.parent / "german-by-context"
MARK = re.compile(r"\{([^}|]+)(?:\|([^}]+))?\}")
KINDS = ["noun", "verb", "adjective", "adverb"]


def rows(path):
    with open(path, newline="") as f:
        return list(csv.DictReader(f))


def report(situation):
    lemmas = set()
    for row in rows(situation / "dialogue.csv"):
        for text, lemma in MARK.findall(row["german"]):
            lemmas.add(lemma or text)

    print(situation.relative_to(CONTENT))
    known = set()
    for kind in KINDS:
        path = situation / f"vocab_{kind}.csv"
        words = [row["german"] for row in rows(path)] if path.exists() else []
        known.update(words)
        used = [w for w in words if w in lemmas]
        missing = [w for w in words if w not in lemmas]
        print(f"  {kind:<10} {len(used):>2}/{len(words):<2}" + (f"  missing: {', '.join(missing)}" if missing else ""))
    unknown = sorted(lemmas - known)
    if unknown:
        print(f"  unknown lemmas: {', '.join(unknown)}")


def main():
    for path in sorted(CONTENT.glob("*/*/dialogue.csv")):
        report(path.parent)


if __name__ == "__main__":
    main()
