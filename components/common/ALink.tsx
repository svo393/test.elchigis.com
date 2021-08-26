import clsx from 'clsx'
import useHackLink from 'hooks/useHackLink'
import { ReactNode } from 'react'

type Props = {
  href: string
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  className?: string
  children: ReactNode
  // passHref?: boolean
  // prefetch?: boolean
  // locale?: string | false
}

let ALink = ({
  href,
  replace,
  scroll,
  shallow,
  className,
  children,
}: Props) => {
  let handleClick = useHackLink()

  return (
    <a
      href={href}
      className={clsx(className)}
      onClick={(e) =>
        handleClick(e, href, { replace, scroll, shallow })
      }
    >
      {children}
    </a>
  )
}

export default ALink
