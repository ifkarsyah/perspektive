import { Badge } from '@/components/ui/badge'
import type { Word } from '@/data/types'
import { cn } from '@/lib/utils'
import { ARTICLE_STYLE } from './article'
import { SpeakButton } from './SpeakButton'

type Props = {
  word: Word
  active?: boolean
  onHover?: (german: string | undefined) => void
}

export function WordCard({ word, active, onHover }: Props) {
  const style = word.article && ARTICLE_STYLE[word.article]
  const rest = word.article ? word.german.slice(word.article.length + 1) : word.german

  return (
    <div
      onMouseEnter={() => onHover?.(word.german)}
      onMouseLeave={() => onHover?.(undefined)}
      className={cn(
        'flex items-start gap-2 rounded-lg border border-l-4 bg-card p-3 transition-shadow',
        style ? style.border : 'border-l-neutral-300',
        active && 'shadow-md ring-2 ring-amber-400',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="font-medium">
          {word.article && <span className={style?.text}>{word.article} </span>}
          {rest}
        </div>
        <div className="text-sm text-muted-foreground">{word.english}</div>
        {word.similarity !== 'different' && (
          <Badge
            variant="outline"
            className={cn(
              'mt-1.5',
              word.similarity === 'false-friend' && 'border-amber-500 text-amber-700',
            )}
          >
            {word.similarity === 'cognate' ? 'cognate' : 'false friend'}
          </Badge>
        )}
      </div>
      <SpeakButton text={word.german} />
    </div>
  )
}
