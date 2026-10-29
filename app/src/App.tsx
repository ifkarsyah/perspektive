import { findSituation } from '@/data/load'
import { MapPage } from '@/pages/MapPage'
import { QuizPage } from '@/pages/QuizPage'
import { SituationPage } from '@/pages/SituationPage'
import { useRoute } from '@/lib/route'

export default function App() {
  const route = useRoute()
  const situation = route.page === 'map' ? undefined : findSituation(route.key)

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {route.page === 'quiz' && situation ? (
        <QuizPage key={situation.key} situation={situation} mode="words" />
      ) : route.page === 'dialogue-quiz' && situation ? (
        <QuizPage key={situation.key} situation={situation} mode="dialogue" />
      ) : route.page === 'situation' && situation ? (
        <SituationPage key={situation.key} situation={situation} />
      ) : (
        <MapPage />
      )}
    </main>
  )
}
