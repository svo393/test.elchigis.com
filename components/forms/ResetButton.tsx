import { XIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

type Props = {
  condition: boolean
  onClick: () => void
  className?: string
}

let ResetButton = ({ condition, onClick, className }: Props) =>
  condition ? (
    <button
      aria-label='Очистить'
      className={clsx('absolute z-20 focus:outline-none', className)}
      onClick={onClick}
    >
      <XIcon className='w-3 h-3 text-gray-600' aria-hidden='true' />
    </button>
  ) : null

export default ResetButton
