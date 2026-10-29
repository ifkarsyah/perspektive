import { ArrowLeft, ListChecks, MessagesSquare } from 'lucide-react'
import { useState } from 'react'
import { Dialogue } from '@/components/Dialogue'
import { PhraseRow } from '@/components/PhraseRow'
import { Scene } from '@/components/Scene'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WordCard } from '@/components/WordCard'
import type { PhraseKind, Situation, WordKind } from '@/data/types'
import { groupBy } from '@/lib/groupBy'
import { hrefFor } from '@/lib/route'

const WORD_KINDS: { kind: WordKind; label: string }[] = [
  { kind: 'noun', label: 'Nouns' },
  { kind: 'verb', label: 'Verbs' },
  { kind: 'adjective', label: 'Adjectives' },
  { kind: 'adverb', label: 'Adverbs' },
]
const PHRASE_KINDS: { kind: PhraseKind; label: string }[] = [
  { kind: 'hear', label: "You'll hear" },
  { kind: 'say', label: "You'll say" },
]

const groupTitle = (group: string) => group.replace(/-/g, ' ')

export function SituationPage({ situation }: { situation: Situation }) {
  const [active, setActive] = useState<string>()
  const wordKinds = WORD_KINDS.filter(({ kind }) => situation.words[kind].length > 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <a
          href={hrefFor({ page: 'map' })}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All situations
        </a>
        <div className="flex gap-2">
          {situation.dialogue.length > 0 && (
            <Button asChild size="sm" variant="outline">
              <a href={hrefFor({ page: 'dialogue-quiz', key: situation.key })}>
                <MessagesSquare /> Conversation quiz
              </a>
            </Button>
          )}
          <Button asChild size="sm">
            <a href={hrefFor({ page: 'quiz', key: situation.key })}>
              <ListChecks /> Quiz
            </a>
          </Button>
        </div>
      </div>

      <h1 className="text-3xl font-bold tracking-tight">{situation.title}</h1>

      {situation.scene && (
        <Scene
          svg={situation.scene}
          nouns={situation.words.noun}
          active={active}
          onActive={setActive}
        />
      )}

      <Tabs defaultValue="words">
        <TabsList>
          <TabsTrigger value="words">Words</TabsTrigger>
          <TabsTrigger value="phrases">Phrases</TabsTrigger>
          {situation.dialogue.length > 0 && (
            <TabsTrigger value="conversation">Conversation</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="words" className="mt-4 space-y-8">
          {wordKinds.map(({ kind, label }) => (
            <section key={kind}>
              <h2 className="mb-3 text-lg font-semibold">{label}</h2>
              <div className="space-y-5">
                {groupBy(situation.words[kind], (w) => w.group).map(([group, words]) => (
                  <div key={group}>
                    <h3 className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {groupTitle(group)}
                    </h3>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {words.map((word) => (
                        <WordCard
                          key={word.id}
                          word={word}
                          active={active === word.german}
                          onHover={kind === 'noun' ? setActive : undefined}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </TabsContent>

        <TabsContent value="phrases" className="mt-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {PHRASE_KINDS.map(({ kind, label }) => (
              <section key={kind}>
                <h2 className="mb-2 text-lg font-semibold">{label}</h2>
                {groupBy(situation.phrases[kind], (p) => p.group).map(([group, phrases]) => (
                  <div key={group} className="mb-4">
                    <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {groupTitle(group)}
                    </h3>
                    <ul className="divide-y">
                      {phrases.map((phrase) => (
                        <PhraseRow key={phrase.id} phrase={phrase} />
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="conversation" className="mt-4">
          <p className="mb-3 text-sm text-muted-foreground">Tap a line to see the English.</p>
          <Dialogue lines={situation.dialogue} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
