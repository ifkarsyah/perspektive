import { useState } from 'react'
import type { DialogueLine, Mark } from '@/data/types'
import { cn } from '@/lib/utils'
import { ARTICLE_STYLE } from './article'
import { SpeakButton } from './SpeakButton'

// Marked vocab words are underlined in their article colour (nouns) or neutral (others);
// hovering, or tapping on touch screens (focus), shows the vocab row.
function MarkedWord({ mark }: { mark: Mark }) {
  const article = mark.word?.article
  return (
    <span
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'group relative cursor-help underline decoration-2 underline-offset-4 outline-none',
        article ? ARTICLE_STYLE[article].text : 'decoration-amber-400',
      )}
    >
      {mark.text}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-normal whitespace-nowrap text-background group-hover:block group-focus:block">
        {mark.word ? `${mark.word.german} · ${mark.word.english}` : mark.lemma}
      </span>
    </span>
  )
}

// The first speaker is on the left, everyone else on the right. Tap a bubble to show the English.
export function Dialogue({ lines }: { lines: DialogueLine[] }) {
  const [shown, setShown] = useState<Set<string>>(new Set())
  const first = lines[0]?.who

  const toggle = (id: string) =>
    setShown((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <ul className="space-y-3">
      {lines.map((line) => {
        const left = line.who === first
        return (
          <li key={line.id} className={cn('flex', left ? 'justify-start' : 'justify-end')}>
            <div
              onClick={() => toggle(line.id)}
              className={cn(
                'flex max-w-[85%] cursor-pointer items-start gap-2 rounded-2xl border p-3',
                left ? 'rounded-bl-sm bg-card' : 'rounded-br-sm bg-accent',
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-muted-foreground">{line.who}</div>
                <div className="font-medium leading-relaxed">
                  {line.segments.map((segment, i) =>
                    typeof segment === 'string' ? segment : <MarkedWord key={i} mark={segment} />,
                  )}
                </div>
                {shown.has(line.id) && (
                  <div className="mt-1 text-sm text-muted-foreground">{line.english}</div>
                )}
              </div>
              <SpeakButton text={line.german} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
