import clsx from 'clsx'
import styles from './LoadingDots.module.css'

type Props = {
  absolute?: boolean
  className?: string
}
let LoadingDots = ({
  absolute = true,
  className = 'h-4 w-4 mx-1.5',
}: Props) => {
  let innerClassName = clsx(styles['inner'], className)

  return (
    <span className={clsx({ [styles['root']!]: absolute })}>
      <span className={innerClassName} />
      <span className={innerClassName} />
      <span className={innerClassName} />
    </span>
  )
}

export default LoadingDots
