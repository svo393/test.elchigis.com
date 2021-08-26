import clsx from 'clsx'
import { addPropIf, isNonEmptyString } from 'lib/utils'
import { ReactNode, useMemo } from 'react'

type Props = {
  className?: string
  htmlFor?: string
  children: ReactNode
}

let Label = ({ children, className, htmlFor }: Props) => {
  let _className = useMemo(
    () => (isNonEmptyString(className) ? className : 'font-semibold'),
    [className]
  )

  return (
    <label
      {...addPropIf(isNonEmptyString(htmlFor), 'htmlFor', htmlFor)}
      className={clsx(_className)}
    >
      {children}
    </label>
  )
}

export default Label
