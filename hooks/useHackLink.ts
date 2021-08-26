import { isString } from 'lib/utils'
import { useCallback } from 'react'
import { UrlObject } from 'url'
import useSlug from './useSlug'

type Options = {
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
}

let useHackLink = () => {
  let { router } = useSlug()
  let handleClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      url: UrlObject | string,
      { replace = false, scroll = true, shallow = false }: Options
    ) => {
      e.preventDefault()
      let isAnchorRef = isString(url) && url.includes('#')
      let params = [
        url,
        undefined,
        { scroll: scroll && !isAnchorRef, shallow },
      ] as const
      replace
        ? void router.replace(...params)
        : void router.push(...params)
    },
    [router]
  )

  return handleClick
}

export default useHackLink
