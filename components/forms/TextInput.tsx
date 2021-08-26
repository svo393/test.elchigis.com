import { ExclamationCircleIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import ResetButton from 'components/forms/ResetButton'
import { OnSubmitResult } from 'hooks/useBaseForm'
import { isNonEmptyString, isPresent } from 'lib/utils'
import {
  FC,
  KeyboardEvent,
  PropsWithoutRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

export interface Props
  extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  onEnterDown?: (...args: any) => Promise<void | OnSubmitResult>
  name: string
  autoComplete?: string
  className?: string
  withResetButton?: boolean
  type?: 'text' | 'password' | 'email' | 'number' | 'tel'
  wrapperClasses?: string
  initFocus?: boolean
  absoluteError?: boolean
}

let TextInput: FC<Props> = (props) => {
  let {
    onEnterDown,
    name,
    type = 'text',
    className = 'form-input',
    initFocus,
    absoluteError = false,
    wrapperClasses = 'relative',
    withResetButton = true,
    ...rest
  } = props

  let {
    setValue,
    register,
    setFocus,
    formState: {
      isSubmitting,
      errors: { [name]: inputErrors },
    },
    handleSubmit,
  } = useFormContext()

  useEffect(() => {
    initFocus && setFocus(name)
  }, [initFocus, name, setFocus])

  let value = useWatch({ name })
  let { ref, ...registerRest } = register(name)

  let inputRef = useRef<HTMLInputElement | null>(null)
  let handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        inputRef.current!.blur()
      }

      if (isPresent(onEnterDown) && e.key === 'Enter') {
        e.preventDefault()
        inputRef.current!.blur()
        void handleSubmit(onEnterDown)()
      }
    },
    [handleSubmit, onEnterDown]
  )

  let error = useMemo(
    () =>
      Array.isArray(inputErrors)
        ? inputErrors[0]
        : inputErrors?.message || inputErrors,
    [inputErrors]
  )

  let rootClassName = clsx(className, {
    'form-error': isNonEmptyString(error),
    'form-disabled': isSubmitting,
  })

  let resetValue = useCallback(() => {
    setValue(name, '')
  }, [name, setValue])

  return (
    <>
      <div className={clsx(wrapperClasses)}>
        <input
          id={name}
          className={clsx(rootClassName)}
          readOnly={isSubmitting}
          type={type}
          onKeyDown={handleKeyDown}
          ref={(e: HTMLInputElement | null) => {
            ref(e)
            inputRef.current = e
          }}
          {...registerRest}
          {...rest}
        />

        {withResetButton && (
          <ResetButton
            condition={!isSubmitting && isNonEmptyString(value)}
            onClick={resetValue}
            className='block ltg:hidden absolute right-3 top-[7px]'
          />
        )}
      </div>

      {isNonEmptyString(error) && (
        <div
          className={clsx('mb-3.5 flex items-start lg:mt-1 mt-1.5', {
            absolute: absoluteError,
          })}
        >
          <ExclamationCircleIcon className='flex-shrink-0 w-4 h-4 text-red-800' />
          <div className='ml-1 text-sm leading-tight text-red-800'>
            {error}
          </div>
        </div>
      )}
    </>
  )
}

export default TextInput
