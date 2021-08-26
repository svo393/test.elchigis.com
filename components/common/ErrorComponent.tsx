import clsx from 'clsx'
import { isAbsent } from 'lib/utils'

type ErrorFallbackProps = {
  error: Error & {
    statusCode?: number
    message?: string
    name?: string
  }
  resetErrorBoundary: (...args: Array<unknown>) => void
}

type ErrorComponentProps = {
  statusCode: number
  error?: string
  className?: string
}

let ErrorComponent = ({
  error,
  className = 'mt-3',
}: ErrorComponentProps) => {
  if (isAbsent(error)) return null
  return (
    <div
      className={clsx(
        'flex py-3 px-4 mt-4 bg-white rounded border border-red-700 z-130',
        className
      )}
      style={{ boxShadow: '0 0 0 4px #fcf4f4 inset' }}
    >
      <svg
        className='flex-shrink-0 w-10 h-10 text-red-700'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'></path>
        <line x1='12' y1='9' x2='12' y2='13'></line>
        <line x1='12' y1='17' x2='12.01' y2='17'></line>
      </svg>
      <div className='ml-3'>
        <h3 className='text-red-800'>Произошла ошибка</h3>
        <div className='text-sm'>{error}</div>
      </div>
    </div>
  )
}

export let RootErrorFallback = ({ error }: ErrorFallbackProps) => (
  <ErrorComponent
    statusCode={error['statusCode'] || 400}
    error={error.message || error.name}
    className='mx-4'
  />
)

export default ErrorComponent
