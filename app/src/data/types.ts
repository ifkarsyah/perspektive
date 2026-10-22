export type WordKind = 'noun' | 'verb' | 'adjective' | 'adverb'
export type PhraseKind = 'hear' | 'say'
export type Similarity = 'cognate' | 'false-friend' | 'different'
export type Article = 'der' | 'die' | 'das'

export type Word = {
  id: string
  kind: WordKind
  group: string
  german: string
  english: string
  similarity: Similarity
  article?: Article
}

export type Phrase = {
  id: string
  kind: PhraseKind
  group: string
  who: string
  german: string
  english: string
}

export type Situation = {
  key: string
  slug: string
  title: string
  category: string
  words: Record<WordKind, Word[]>
  phrases: Record<PhraseKind, Phrase[]>
  scene?: string
}

export type Category = {
  slug: string
  title: string
  situations: Situation[]
}
