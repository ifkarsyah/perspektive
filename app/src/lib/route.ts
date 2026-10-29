import { useEffect, useState } from 'react'

export type Route =
  | { page: 'map' }
  | { page: 'situation'; key: string }
  | { page: 'quiz'; key: string }
  | { page: 'dialogue-quiz'; key: string }

// Hash routes keep the build deployable to any static host:
// #/  ·  #/s/housing/kitchen  ·  #/s/housing/kitchen/quiz  ·  #/s/housing/kitchen/dialogue-quiz
export function parseRoute(hash: string): Route {
  const parts = decodeURIComponent(hash.replace(/^#\/?/, '')).split('/').filter(Boolean)
  if (parts[0] !== 's' || parts.length < 3) return { page: 'map' }
  const key = `${parts[1]}/${parts[2]}`
  if (parts[3] === 'quiz') return { page: 'quiz', key }
  if (parts[3] === 'dialogue-quiz') return { page: 'dialogue-quiz', key }
  return { page: 'situation', key }
}

export const hrefFor = (route: Route) =>
  route.page === 'map' ? '#/' : `#/s/${route.key}${route.page === 'situation' ? '' : `/${route.page}`}`

export function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(location.hash))
  useEffect(() => {
    const onChange = () => {
      setRoute(parseRoute(location.hash))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
