# German by Context — visual app

A local web app for learning German **by context, depth-first**: pick one real-life
situation (e.g. *Housing → Trash and recycling*) and go all the way down — scene →
words → phrases you'll hear and say → quiz — before moving to the next one.

Not grammar-focused. The structure of the course is the folder tree in
[`../german-by-context`](../german-by-context).

> Status: phase 1 built. All 12 categories (65 situations) are loaded, each with a scene.

## Principles

- **CSVs are the source of truth.** Content is edited in Obsidian; the app reads it at
  build time. No copying, no JSON export.
- **Content and progress are separate.** Content is static and ships with the site.
  Progress is user data and lives behind a store interface (see [Progress](#progress)).
- **Static site.** `npm run build` produces `dist/`, deployable to any static host.

## Stack

Vite + React + TypeScript + Tailwind CSS + shadcn/ui, with `papaparse` for CSV parsing.
All dependency versions are pinned exactly.

## Content contract

### Folder convention

```
german-by-context/
  <n>-<category>/
    <n>-<situation>/
      vocab_noun.csv
      vocab_verb.csv
      vocab_adjective.csv
      vocab_adverb.csv
      phrase_to_hear.csv
      phrase_to_say.csv
      scene.svg            # optional, see Scenes
```

- The number prefix sets the order and is stripped for display and IDs.
- Adding a situation folder makes it appear in the app automatically.
- Files in `1-general/` with the `id, german, english` format, and `*.md` files, are
  ignored in phase 1.

### CSV headers

| File | Header |
|---|---|
| `vocab_*.csv` | `category,german,english,similarity` |
| `phrase_to_*.csv` | `category,who,german,english` |

- `category` — sub-group inside the situation (e.g. `bins`, `collection`).
- `similarity` — `cognate`, `false-friend` or `different` (relative to English).
- `who` — the person in the conversation (e.g. `neighbour`, `hausmeister`).

### Item IDs

Every row gets a stable ID derived from its location and German text, without number
prefixes:

```
housing/trash-and-recycling:noun:die Biotonne
housing/trash-and-recycling:say:Wo kommt das hin?
```

Renumbering folders keeps IDs. Editing a row's German text gives it a new ID, so that
row's progress resets. If that becomes a problem, add an explicit `id` column.
The same German text twice in one file (e.g. `die Decke` = blanket / ceiling) gets a
suffix: `…:die Decke#2`.

## Scenes

Each situation can have one illustrated scene, `scene.svg`, stored next to its CSVs.
Objects in the scene are tagged with the noun they show:

```svg
<g data-word="die Biotonne"> … </g>
```

- `data-word` must match the `german` column of a row in `vocab_noun.csv`.
- Hovering or tapping a tagged object highlights it and shows the word, article
  colour and English; clicking plays the audio.
- Nouns without a tagged object still appear in the word list below the scene.
- Situations without `scene.svg` show the word list only.

Scenes are flat-style inline SVG with a 16:9 `viewBox` so they stay sharp and small.

## Screens

1. **Map** — categories as tiles, expanding into their situations with item counts.
2. **Situation** — scene, word cards grouped by `category` (article colour for
   der/die/das, English, similarity badge), then phrases split into *you'll hear* and
   *you'll say* with a `who` chip. Every row has a speaker button.
3. **Quiz** — German → English multiple choice from the current situation only.

## Audio

Every German text is voiced by the Thorsten Piper voice (`de_DE-thorsten-medium`),
pre-generated into `public/audio/<hash>.mp3` with a `manifest.json` mapping text to file.
The app plays the clip when one exists and falls back to the browser's German voice
(`speechSynthesis`, `de-DE`) otherwise. The audio is generated, not committed.

One-time setup:

```bash
cd app
uv venv --python 3.12 scripts/.venv
uv pip install --python scripts/.venv/bin/python -r scripts/requirements.txt
# put de_DE-thorsten-medium.onnx and .onnx.json in ~/Downloads (or set THORSTEN_MODEL)
```

Generate (re-runs only voice new or edited rows and delete stale clips; needs `ffmpeg`):

```bash
npm run generate-audio
```

Restart `npm run dev` afterwards: the dev server only serves `public/` files that existed when
it started, and answers new ones with `index.html`.

## Progress

Not in phase 1, but the design is fixed so that moving to a database later is a swap:

- Progress is an **append-only review log**: `{ itemId, reviewedAt, result }`.
  Known / learning / due are computed from the log, so the review algorithm can change
  without migrating data.
- Components talk to an async `ProgressStore` interface (`getReviews`, `addReview`).
- The first implementation is `localStorage`. A later `ApiProgressStore` backed by
  Postgres (`reviews(item_id, user_id, reviewed_at, result)`) replaces it without
  changing components, plus an export/import step to move existing history.

## Roadmap

| Phase | Scope |
|---|---|
| 1 | Data loader, Map, Situation, Quiz, browser audio, a scene for every situation ✅ |
| 2 | `ProgressStore` on `localStorage`, review log, known/due states |
| 3 | Pre-generated audio (Thorsten voice) ✅ |
| 4 | Postgres-backed progress |
| — | Deployment config (pick a static host when ready) |

## Development

```bash
cd app
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
```

`app/` is excluded from the Obsidian vault so `node_modules` isn't indexed.
