import clsx from 'clsx'
import LoadingCircle from 'components/common/LoadingCircle'
import LoadingDots from 'components/common/LoadingDots'
import useHackLink from 'hooks/useHackLink'
import { parseQueryString } from 'lib/misc'
import { addPropIf, isPresent, isString, Obj } from 'lib/utils'
import {
  forwardRef,
  JSXElementConstructor,
  PropsWithoutRef,
  useMemo,
} from 'react'
import { UrlObject } from 'url'

interface Props
  extends PropsWithoutRef<JSX.IntrinsicElements['button' | 'a']> {
  className?: string
  type?: 'submit' | 'reset' | 'button'
  as?: 'button' | 'a' | JSXElementConstructor<any>
  loading?: boolean
  disabled?: boolean
  selected?: boolean
  loadingClasses?: string
  withLoadingCircle?: boolean
  href?: UrlObject | string
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
}

let Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (props, outerRef) => {
    let handleClick = useHackLink()

    let {
      className,
      children,
      loading = false,
      disabled = false,
      selected = false,
      as: Component = 'button',
      type = 'button',
      loadingClasses,
      withLoadingCircle = false,
      href,
      replace,
      scroll,
      shallow,
      ...rest
    } = props

    let rootClassName = clsx(
      `btn`,
      {
        'btn-selected': selected,
        'btn-disabled': disabled || loading,
        'btn-loading': loading,
      },
      className
    )

    let LoadingComponent = useMemo(
      () => (withLoadingCircle ? LoadingCircle : LoadingDots),
      [withLoadingCircle]
    )

    let hrefAsString

    if (isPresent(href))
      hrefAsString = isString(href)
        ? href
        : `${href?.pathname}${parseQueryString(
            (href?.query as Obj) ?? {},
            {}
          )}`

    return (
      <Component
        ref={outerRef}
        className={rootClassName}
        disabled={disabled || loading}
        type={type}
        {...addPropIf(
          props.as === 'a' && isPresent(hrefAsString),
          'onClick',
          (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
            handleClick(e, href ?? '', {
              replace,
              scroll,
              shallow,
            })
        )}
        {...addPropIf(
          props.as === 'a' && isPresent(hrefAsString),
          'href',
          hrefAsString
        )}
        {...rest}
      >
        <span className={clsx({ invisible: loading })}>
          {children}
        </span>
        {loading && <LoadingComponent className={loadingClasses} />}
      </Component>
    )
  }
)

export default Button
