# Story A1–A2

Short everyday topics, each told as a story and as a conversation, built from A1–A2 words for casual speaking practice.
The words come from `vocab-a1-a2.csv`: every A1 and A2 word from `resources/5000-common-vocab/0_raw/0_raw.csv`, sorted by part of speech.

## Structure

```
story-a1-a2/
├── vocab-a1-a2.csv                          # A1–A2 word list
├── 11-introduction/
│   ├── 11-12-convo.md
│   ├── 11-22-convo-sentences.csv
│   ├── 11-30-all-vocab-sorted.csv
│   └── 11-40-grammar-points.md
├── 21-telling-about-my-typical-weekday/
│   ├── 21-11-story.md
│   ├── 21-12-convo.md
│   ├── 21-21-story-sentences.csv
│   ├── 21-22-convo-sentences.csv
│   ├── 21-30-all-vocab-sorted.csv
│   └── 21-40-grammar-points.md
├── 22-telling-about-my-typical-weekend/
│   └── (same 6 files with prefix 22-)
├── 23-telling-about-my-family/
│   └── (same 6 files with prefix 23-)
├── 24-food-and-cooking/
│   └── (same 6 files with prefix 24-, plus 24-13-recipe.md and 24-23-recipe-sentences.csv)
├── 25-groceries-shopping-at-lidl/
│   └── (same 6 files with prefix 25-)
├── 26-at-late-night-store-spati/
│   └── (same 6 files with prefix 26-)
├── 31-telling-about-my-last-weekend/
│   └── (same 6 files with prefix 31-)
├── 41-making-plan-with-friend/
│   └── (same 6 files with prefix 41-)
├── 42-making-plan-for-hiking/
│   └── (same 6 files with prefix 42-)
├── 51-at-the-cafe-and-bakery/
│   └── (same 6 files with prefix 51-)
├── 52-at-the-restaurant/
│   └── (same 6 files with prefix 52-)
├── 53-at-the-doctor/
│   └── (same 6 files with prefix 53-)
├── 54-asking-directions-and-train-problem/
│   └── (same 6 files with prefix 54-, plus -13 announcement, -14 timetable, -15 prohibition and their -23/-24/-25 breakdowns)
├── 55-complaining-washing-machines-is-broken/
│   └── (same 6 files with prefix 55-)
├── 56-buying-clothes-and-shoes/
│   └── (same 6 files with prefix 56-)
├── 57-public-transport/
│   └── (same 6 files with prefix 57-)
├── 61-telling-about-my-job/
│   └── (same 6 files with prefix 61-)
├── 62-small-talk-with-colleagues/
│   └── (same 6 files with prefix 62-)
├── 63-small-talk-weather-and-seasons/
│   └── (same 6 files with prefix 63-)
├── 71-apartment-viewing/
│   └── (same 6 files with prefix 71-)
├── 72-at-burgeramt/
│   └── (same 6 files with prefix 72-)
├── 73-auslaenderbehoerde/
│   └── (same 6 files with prefix 73-)
├── 74-phone-and-sim/
│   └── (same 6 files with prefix 74-)
└── 75-bank-account/
    └── (same 6 files with prefix 75-)
```

### Naming

- **Folder:** `<n>-<topic>`. The first digit is the kind of topic, like the units of a grammar course, and the second digit counts topics inside it:

  | First digit | Kind of topic | Done |
  |---|---|---|
  | `1x` | introducing myself | `11` |
  | `2x` | telling about the present: my day, weekend, family, food, groceries | `21`–`26` |
  | `3x` | telling about the past | `31` |
  | `4x` | the future: making plans | `41`, `42` |
  | `5x` | going out and getting things done in town: café, restaurant, doctor, trains, a broken machine, shopping | `51`–`57` |
  | `6x` | work and small talk | `61`–`63` |
  | `7x` | talking to other people: landlord, officials, providers (all with *Sie*) | `71`–`75` |
- **File:** `<n>-<step><variant>-<name>`, where `<n>` is the folder number.
  - The first digit after the dash is the **step**: `1` = text, `2` = sentence breakdown, `3` = vocab list, `4` = grammar points.
  - The second digit is the **variant**: `1` = story, `2` = convo. From `3` on, a topic can add extra text types it needs, named after what they are: `24-13-recipe`, `54-13-announcement`, `54-14-timetable`, `54-15-prohibition`. Steps 3 and 4 cover all variants, so they use `0`.

| File | Step | What it is |
|---|---|---|
| `<n>-11-story.md` | 1 text | the topic told by me, first person, German line with English below |
| `<n>-12-convo.md` | 1 text | the same topic as a chat with Lena, who reacts and asks back |
| `<n>-13-<type>.md`, `<n>-14-…`, … | 1 text | optional extra texts: recipe (`24`), announcement / timetable / prohibition signs (`54`) |
| `<n>-21-story-sentences.csv` | 2 breakdown | one row per story line |
| `<n>-22-convo-sentences.csv` | 2 breakdown | one row per convo line |
| `<n>-23-<type>-sentences.csv`, … | 2 breakdown | one row per line of the matching extra text |
| `<n>-30-all-vocab-sorted.csv` | 3 vocab | every word from all breakdowns, once, sorted by pos |
| `<n>-40-grammar-points.md` | 4 grammar | what's new in this topic compared with the earlier ones |

`11-introduction/` is convo-only: it has no story, so no `11-11` or `11-21` file.

## Steps (per story folder)

1. **Write the texts:** `<n>-11-story.md` and `<n>-12-convo.md`, in casual A1–A2 German.
2. **Break down each line:** copy each line into `<n>-21-story-sentences.csv` / `<n>-22-convo-sentences.csv`, one row per line in the same order, and fill the word columns.
3. **Collect the vocab:** merge every word from all breakdowns into `<n>-30-all-vocab-sorted.csv`.
4. **Note the grammar:** write `<n>-40-grammar-points.md` with only the patterns that are **new** compared with the earlier topics (in the order they were written). Each point has a one-line rule, example lines copied from the story/convo and a small table. It ends with **Speaking chunks** (phrases to memorize whole) and **Seen before** (earlier patterns this topic reuses).

Stories mostly use words from `vocab-a1-a2.csv`, but everyday words the topic needs are kept even when they're missing from it or rated B1+ (e.g. *duschen, frühstücken, Wochenende*).

## `vocab-a1-a2.csv` columns

| Column | Meaning |
|---|---|
| `word` | the German word (nouns with article and plural, e.g. `der Tag, -e`) |
| `pos` | part of speech; for nouns this is the article (`der`, `die`, `das`) |
| `definition` | English meaning |
| `example_de` | example sentence in German |
| `example_en` | English translation of the example |

## `<n>-2x-…-sentences.csv` columns

Cells with more than one word are separated by `; `. Names, places and brands are left out.

| Column | What goes in it | Form | Example |
|---|---|---|---|
| `sentences` | the German line from the story or convo | as written | *Ich gehe gern ins Kino und ich lese viel.* |
| `verbs` | every verb, including helpers like `haben` in the Perfekt | infinitive | `gehen; lesen` |
| `nouns` | every common noun | singular with article | `das Kino` |
| `adjectives` | every adjective, also when used like an adverb | no ending | `gut`, `schnell` |
| `adverbs` | adverbs, question words like `wie`/`woher`, particles like `ja`/`denn`/`doch`, and fixed bits like `ein bisschen` | as written | `gern; viel` |
| `prepositions` | every preposition | base form, contraction in brackets | `in (ins)`, `an (am)` |
| `pronouns` | personal, possessive, question and demonstrative pronouns | **as written** (the case form is what to learn) | `ich; mich; mir`, `deiner` |
| `conjunctions` | linking words | as written | `und`, `aber` |
| `function` | what the line does in the conversation (see below) | one or more tags | `reacting; asking` |

### `function` tags

| Tag | What you're doing | Covers | Example |
|---|---|---|---|
| `social` | being polite | greeting, bye, thanking, apologizing, complimenting | *Freut mich! · Danke! · Bis bald!* |
| `telling` | giving info | introducing yourself, facts, the past, plans | *Ich komme aus… · Wir haben studiert.* |
| `asking` | getting info | asking for info, yes/no questions, not understanding | *Was machst du beruflich? · Wie bitte?* |
| `feeling` | sharing yourself | opinions, feelings, likes/dislikes, wants | *Das ist interessant. · Ich spiele gern…* |
| `reacting` | responding | showing interest, agreeing/disagreeing, accepting/declining | *Ach so! · Gute Idee! · Ja, gern!* |
| `doing` | making something happen | requests, suggestions, invitations, commands | *Gibst du mir…? · Lass uns…* |

## `<n>-30-all-vocab-sorted.csv` columns

Sorted by pos in the column order above (verb, noun, adj, adv, prep, pron, conj), then alphabetically (nouns by the noun, not the article). A word with two jobs, like *echt* (adj / adv), gets one row per pos.

| Column | Meaning |
|---|---|
| `word` | same form as in the breakdown; prepositions without the contraction (`in`, not `in (ins)`) |
| `pos` | `verb`, `noun`, `adj`, `adv`, `prep`, `pron` or `conj` |
| `example_de` | the shortest full sentence from the topic's texts that uses the word (a list item like *1 Esslöffel Öl* only when there's no sentence) |
| `definition` | English meaning, from `0_raw.csv` or written by hand when it's missing or doesn't fit the story |
