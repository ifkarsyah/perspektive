import { ImageOff } from 'lucide-react'
import { categories, countItems } from '@/data/load'
import { hrefFor } from '@/lib/route'

export function MapPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">German by Context</h1>
        <p className="mt-1 text-muted-foreground">
          Pick a situation and go all the way down.
        </p>
      </header>

      {categories.map((category) => (
        <section key={category.slug}>
          <h2 className="mb-3 text-xl font-semibold">{category.title}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.situations.map((situation) => (
              <a
                key={situation.key}
                href={hrefFor({ page: 'situation', key: situation.key })}
                className="group overflow-hidden rounded-xl border bg-card transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-video bg-muted">
                  {situation.scene ? (
                    <div
                      className="scene pointer-events-none"
                      dangerouslySetInnerHTML={{ __html: situation.scene }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground/50">
                      <ImageOff className="size-8" />
                    </div>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-2 p-3">
                  <span className="font-medium">{situation.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {countItems(situation)} items
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
