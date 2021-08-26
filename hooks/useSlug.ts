import { useRouter } from 'next/router'

let useSlug = <T extends string | undefined>() => {
  let router = useRouter()
  let query = router.query as Record<string, string>
  let slug = router.query['slug'] as T

  return { router, query, slug }
}

export default useSlug
