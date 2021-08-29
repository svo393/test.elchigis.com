import clsx from 'clsx'
import Button from 'components/forms/Button'
import TextInput from 'components/forms/TextInput'
import SearchIcon from 'components/icons/SearchIcon'
import useBaseForm from 'hooks/useBaseForm'
import { wait } from 'lib/misc'
import { useCallback, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { $_Q } from 'validator/schemas'
import { z } from 'zod'

let HeaderSearchBar = () => {
  let [open, setOpen] = useState(false)
  let toggleOpen = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  let handleSubmit = useCallback(
    async (data: z.input<typeof $_Q>) => {
      await wait(1000)
      console.info('input:', data.q)
    },
    []
  )

  let { ctx, _handleSubmit } = useBaseForm(
    handleSubmit,
    $_Q,
    { q: '' },
    'onSubmit'
  )

  return (
    <FormProvider {...ctx}>
      <div
        className='xs:col-start-11 xs:col-span-2 xs:ml-auto xs:row-start-2 hidden xs:block w-5 h-5 text-primary-body'
        onClick={toggleOpen}
      >
        <SearchIcon />
      </div>

      <div
        className={clsx(
          'lg:ml-0 relative ml-6 flex-grow sm:ml-0 sm:min-w-[16.5rem] md:min-w-[20rem] lg:min-w-[19rem] min-w-[12.5rem] max-w-xl lg:max-w-full row-start-2 col-span-12 xs:row-start-3',
          { 'xs:hidden': !open }
        )}
      >
        <TextInput
          name='q'
          className='px-4 py-3 sm:py-2 form-input w-full pr-28 xl:pr-20 lg:pr-16'
          placeholder='Поиск бренда, товара, категории...'
          onEnterDown={_handleSubmit}
          withResetButton={false}
        />
        <Button
          className='btn-gray absolute right-1 top-1 px-4 py-[0.6875rem] sm:py-[0.5625rem] leading-none lg:w-12 xl:w-16 w-24 flex justify-center'
          onClick={ctx.handleSubmit(_handleSubmit)}
          disabled={ctx.formState.isSubmitting}
          loading={ctx.formState.isSubmitting}
          loadingClasses='h-3 w-3 lg:h-2 lg:w-2 lg:mx-0.5 mx-1'
        >
          <SearchIcon className='flex-shrink-0 inline-block w-5 h-5 sm:w-4 sm:h-4 text-primary-body' />
        </Button>
      </div>
    </FormProvider>
  )
}

export default HeaderSearchBar
