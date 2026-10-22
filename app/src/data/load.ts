import Papa from 'papaparse'
import type { Article, Category, Phrase, PhraseKind, Situation, Similarity, Word, WordKind } from './types'

// Only these categories are loaded for now. Add globs here to enable more.
const csvFiles = import.meta.glob<string>(
  ['@content/2-*/*/*.csv', '@content/3-*/*/*.csv'],
  { query: '?raw', import: 'default', eager: true },
)
const sceneFiles = import.meta.glob<string>(
  ['@content/2-*/*/scene.svg', '@content/3-*/*/scene.svg'],
  { query: '?raw', import: 'default', eager: true },
)

const WORD_FILES: Record<string, WordKind> = {
  'vocab_noun.csv': 'noun',
  'vocab_verb.csv': 'verb',
  'vocab_adjective.csv': 'adjective',
  'vocab_adverb.csv': 'adverb',
}
const PHRASE_FILES: Record<string, PhraseKind> = {
  'phrase_to_hear.csv': 'hear',
  'phrase_to_say.csv': 'say',
}
const ARTICLES: Article[] = ['der', 'die', 'das']

type Row = Record<string, string>

const stripOrder = (name: string) => name.replace(/^\d+-/, '')
const orderOf = (name: string) => Number(name.match(/^(\d+)-/)?.[1] ?? 0)
const titleOf = (slug: string) => {
  const text = slug.replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Same German text twice in one file (e.g. "die Decke" = blanket / ceiling)
// gets a suffix so IDs stay unique: "…:die Decke", "…:die Decke#2".
const uniqueIds = <T extends { id: string }>(items: T[]): T[] => {
  const seen = new Map<string, number>()
  return items.map((item) => {
    const n = (seen.get(item.id) ?? 0) + 1
    seen.set(item.id, n)
    return n === 1 ? item : { ...item, id: `${item.id}#${n}` }
  })
}

const parse = (raw: string): Row[] =>
  Papa.parse<Row>(raw.trim(), { header: true, skipEmptyLines: true }).data

const articleOf = (german: string): Article | undefined => {
  const first = german.split(' ')[0] as Article
  return ARTICLES.includes(first) ? first : undefined
}

// "…/german-by-context/3-housing/5-trash/vocab_noun.csv" -> ["3-housing", "5-trash", "vocab_noun.csv"]
const splitPath = (path: string) => path.split('/').slice(-3)

const emptySituation = (categoryDir: string, situationDir: string): Situation => {
  const category = stripOrder(categoryDir)
  const slug = stripOrder(situationDir)
  return {
    key: `${category}/${slug}`,
    slug,
    title: titleOf(slug),
    category,
    words: { noun: [], verb: [], adjective: [], adverb: [] },
    phrases: { hear: [], say: [] },
  }
}

function buildTree(): Category[] {
  const situations = new Map<string, { order: [number, number]; situation: Situation }>()
  const categoryDirs = new Map<string, string>()

  const situationFor = (categoryDir: string, situationDir: string) => {
    const mapKey = `${categoryDir}/${situationDir}`
    let entry = situations.get(mapKey)
    if (!entry) {
      entry = {
        order: [orderOf(categoryDir), orderOf(situationDir)],
        situation: emptySituation(categoryDir, situationDir),
      }
      situations.set(mapKey, entry)
      categoryDirs.set(stripOrder(categoryDir), categoryDir)
    }
    return entry.situation
  }

  for (const [path, raw] of Object.entries(csvFiles)) {
    const [categoryDir, situationDir, file] = splitPath(path)
    const wordKind = WORD_FILES[file]
    const phraseKind = PHRASE_FILES[file]
    if (!wordKind && !phraseKind) continue

    const situation = situationFor(categoryDir, situationDir)

    if (wordKind) {
      situation.words[wordKind] = uniqueIds(parse(raw).map(
        (row): Word => ({
          id: `${situation.key}:${wordKind}:${row.german}`,
          kind: wordKind,
          group: row.category,
          german: row.german,
          english: row.english,
          similarity: row.similarity as Similarity,
          article: wordKind === 'noun' ? articleOf(row.german) : undefined,
        }),
      ))
    } else {
      situation.phrases[phraseKind] = uniqueIds(parse(raw).map(
        (row): Phrase => ({
          id: `${situation.key}:${phraseKind}:${row.german}`,
          kind: phraseKind,
          group: row.category,
          who: row.who,
          german: row.german,
          english: row.english,
        }),
      ))
    }
  }

  for (const [path, raw] of Object.entries(sceneFiles)) {
    const [categoryDir, situationDir] = splitPath(path)
    situationFor(categoryDir, situationDir).scene = raw
  }

  const sorted = [...situations.values()].sort(
    (a, b) => a.order[0] - b.order[0] || a.order[1] - b.order[1],
  )

  const categories = new Map<string, Category>()
  for (const { situation } of sorted) {
    let category = categories.get(situation.category)
    if (!category) {
      category = { slug: situation.category, title: titleOf(situation.category), situations: [] }
      categories.set(situation.category, category)
    }
    category.situations.push(situation)
  }
  return [...categories.values()]
}

export const categories = buildTree()

export const findSituation = (key: string) =>
  categories.flatMap((c) => c.situations).find((s) => s.key === key)

export const countItems = (s: Situation) =>
  Object.values(s.words).reduce((n, list) => n + list.length, 0) +
  Object.values(s.phrases).reduce((n, list) => n + list.length, 0)
