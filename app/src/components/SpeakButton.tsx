import { Volume2 } from 'lucide-react'
import { speak } from '@/lib/speak'
import { cn } from '@/lib/utils'

export function SpeakButton({ text, className }: { text: string; className?: string }) {
  return (
    <button
      type="button"
      aria-label={`Play "${text}"`}
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground',
        className,
      )}
    >
      <Volume2 className="size-4" />
    </button>
  )
}
