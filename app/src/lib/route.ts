import { useEffect, useState } from 'react'

export type Route =
  | { page: 'map' }
  | { page: 'situation'; key: string }
  | { page: 'quiz'; key: string }

// Hash routes keep the build deployable to any static host:
// #/  ·  #/s/housing/kitchen  ·  #/s/housing/kitchen/quiz
export function parseRoute(hash: string): Route {
  const parts = decodeURIComponent(hash.replace(/^#\/?/, '')).split('/').filter(Boolean)
  if (parts[0] !== 's' || parts.length < 3) return { page: 'map' }
  const key = `${parts[1]}/${parts[2]}`
  return parts[3] === 'quiz' ? { page: 'quiz', key } : { page: 'situation', key }
}

export const hrefFor = (route: Route) =>
  route.page === 'map' ? '#/' : `#/s/${route.key}${route.page === 'quiz' ? '/quiz' : ''}`

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
