import { Badge } from '@/components/ui/badge'
import type { Phrase } from '@/data/types'
import { SpeakButton } from './SpeakButton'

export function PhraseRow({ phrase }: { phrase: Phrase }) {
  return (
    <li className="flex items-start gap-2 py-2.5">
      <div className="min-w-0 flex-1">
        <div className="font-medium">{phrase.german}</div>
        <div className="text-sm text-muted-foreground">{phrase.english}</div>
      </div>
      <Badge variant="secondary" className="mt-0.5 shrink-0">
        {phrase.who.replace(/-/g, ' ')}
      </Badge>
      <SpeakButton text={phrase.german} />
    </li>
  )
}
