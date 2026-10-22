import { ArrowLeft, Check, X } from 'lucide-react'
import { useState } from 'react'
import { SpeakButton } from '@/components/SpeakButton'
import { Button } from '@/components/ui/button'
import type { Situation } from '@/data/types'
import { hrefFor } from '@/lib/route'
import { cn } from '@/lib/utils'

const QUESTION_COUNT = 10
const CHOICE_COUNT = 4

type Item = { id: string; kind: string; german: string; english: string }
type Question = { item: Item; choices: string[] }

const shuffle = <T,>(list: T[]) => {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function makeQuiz(situation: Situation): Question[] {
  const items: Item[] = [
    ...Object.values(situation.words).flat(),
    ...Object.values(situation.phrases).flat(),
  ]
  return shuffle(items)
    .slice(0, QUESTION_COUNT)
    .map((item) => {
      // Prefer distractors of the same kind (noun with nouns, phrase with phrases)
      // so the answer can't be spotted by length alone.
      const others = items.filter((other) => other.english !== item.english)
      const sameKind = others.filter((other) => other.kind === item.kind)
      const pool = sameKind.length >= CHOICE_COUNT - 1 ? sameKind : others
      const wrong = [...new Set(shuffle(pool).map((other) => other.english))].slice(0, CHOICE_COUNT - 1)
      return { item, choices: shuffle([item.english, ...wrong]) }
    })
}

export function QuizPage({ situation }: { situation: Situation }) {
  const [questions, setQuestions] = useState(() => makeQuiz(situation))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string>()
  const [score, setScore] = useState(0)

  const restart = () => {
    setQuestions(makeQuiz(situation))
    setIndex(0)
    setPicked(undefined)
    setScore(0)
  }

  const back = (
    <a
      href={hrefFor({ page: 'situation', key: situation.key })}
      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="size-4" /> {situation.title}
    </a>
  )

  if (index >= questions.length) {
    return (
      <div className="space-y-6">
        {back}
        <div className="rounded-xl border bg-card p-8 text-center">
          <p className="text-muted-foreground">Your score</p>
          <p className="text-5xl font-bold">
            {score} / {questions.length}
          </p>
          <Button className="mt-6" onClick={restart}>
            Try again
          </Button>
        </div>
      </div>
    )
  }

  const { item, choices } = questions[index]

  const pick = (choice: string) => {
    if (picked) return
    setPicked(choice)
    if (choice === item.english) setScore((s) => s + 1)
  }

  return (
    <div className="space-y-6">
      {back}
      <div className="text-sm text-muted-foreground">
        Question {index + 1} of {questions.length} · Score {score}
      </div>

      <div className="flex items-center gap-2 rounded-xl border bg-card p-6">
        <p className="flex-1 text-2xl font-semibold">{item.german}</p>
        <SpeakButton text={item.german} />
      </div>

      <div className="grid gap-2">
        {choices.map((choice) => {
          const isRight = choice === item.english
          const isPicked = choice === picked
          return (
            <button
              key={choice}
              type="button"
              onClick={() => pick(choice)}
              disabled={!!picked}
              className={cn(
                'flex items-center justify-between rounded-lg border bg-card p-4 text-left transition',
                !picked && 'hover:bg-accent',
                picked && isRight && 'border-emerald-500 bg-emerald-50',
                picked && isPicked && !isRight && 'border-rose-500 bg-rose-50',
              )}
            >
              {choice}
              {picked && isRight && <Check className="size-5 text-emerald-600" />}
              {picked && isPicked && !isRight && <X className="size-5 text-rose-600" />}
            </button>
          )
        })}
      </div>

      {picked && (
        <Button
          onClick={() => {
            setIndex((i) => i + 1)
            setPicked(undefined)
          }}
        >
          {index + 1 < questions.length ? 'Next' : 'See score'}
        </Button>
      )}
    </div>
  )
}
