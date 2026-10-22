import { useEffect, useRef } from 'react'
import type { Word } from '@/data/types'
import { speak } from '@/lib/speak'
import { ARTICLE_STYLE } from './article'

type Props = {
  svg: string
  nouns: Word[]
  active?: string
  onActive: (german: string | undefined) => void
}

// Renders a situation's scene.svg. Objects tagged with data-word="<german>" are
// linked to the noun with the same text: hover shows it, click plays it.
export function Scene({ svg, nouns, active, onActive }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const matches = nouns.filter((n) => n.german === active)
  const activeWord = matches[0]

  useEffect(() => {
    ref.current?.querySelectorAll<SVGElement>('[data-word]').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.word === active)
    })
  }, [active])

  const wordAt = (target: EventTarget) =>
    (target as Element).closest<SVGElement>('[data-word]')?.dataset.word

  return (
    <figure className="overflow-hidden rounded-xl border bg-card">
      <div
        ref={ref}
        className="scene"
        dangerouslySetInnerHTML={{ __html: svg }}
        onMouseOver={(e) => onActive(wordAt(e.target))}
        onMouseLeave={() => onActive(undefined)}
        onClick={(e) => {
          const word = wordAt(e.target)
          onActive(word)
          if (word) speak(word)
        }}
      />
      <figcaption className="flex min-h-12 items-center justify-center border-t px-4 text-center">
        {activeWord ? (
          <span>
            <span
              className="font-semibold"
              style={{ color: activeWord.article && ARTICLE_STYLE[activeWord.article].fill }}
            >
              {activeWord.german}
            </span>
            <span className="text-muted-foreground">
              {' · '}
              {matches.map((m) => m.english).join(' / ')}
            </span>
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">Hover or tap an object</span>
        )}
      </figcaption>
    </figure>
  )
}
