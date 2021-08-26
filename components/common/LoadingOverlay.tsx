import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import LoadingDots from './LoadingDots'

let LoadingOverlay = ({
  open,
  fixed = false,
}: {
  open: boolean
  fixed?: boolean
}) => (
  <Transition
    show={open}
    as='div'
    className={clsx(
      'inset-0 bg-white bg-opacity-80 cursor-not-allowed z-150',
      { absolute: !fixed, fixed }
    )}
    enter='transition-opacity ease-in-out duration-75'
    enterFrom='opacity-0'
    enterTo='opacity-100'
    leave='transition-opacity ease-in-out duration-75'
    leaveFrom='opacity-100'
    leaveTo='opacity-0'
  >
    <div className='fixed inset-x-0 bottom-1/2'>
      <LoadingDots />
    </div>
  </Transition>
)

export default LoadingOverlay
