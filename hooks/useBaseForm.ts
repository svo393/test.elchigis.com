import { zodResolver } from '@hookform/resolvers/zod'
import { isPresent, toPairs } from 'lib/utils'
import { useCallback, useMemo, useState } from 'react'
import {
  useForm,
  UseFormProps,
  ValidationMode,
} from 'react-hook-form'
import { z } from 'zod'

export type OnSubmitResult = {
  FORM_ERROR?: string
  [k: string]: any
}

export let FORM_ERROR = 'FORM_ERROR'

let useBaseForm = <S extends z.ZodType<any, any>>(
  onSubmit?: (values: z.input<S>) => Promise<void | OnSubmitResult>,
  schema?: S,
  initialValues?: UseFormProps<z.input<S>>['defaultValues'],
  mode: keyof ValidationMode = 'onTouched'
) => {
  let memoizedSchema = useMemo(() => schema, [schema])

  let ctx = useForm<z.input<S>>({
    mode,
    resolver: isPresent(memoizedSchema)
      ? zodResolver(memoizedSchema)
      : undefined,
    defaultValues: initialValues,
  })

  let [formError, setFormError] = useState<string | null>(null)

  let _handleSubmit = useCallback(async () => {
    setFormError(null)
    let result = (await onSubmit?.(ctx.getValues())) || {}
    toPairs(result).forEach(([k, v]) => {
      if (k === FORM_ERROR) {
        setFormError(v)
      } else {
        ctx.setError(k as any, { type: 'submit', message: v })
      }
    })
  }, [ctx, onSubmit])

  return { ctx, formError, _handleSubmit }
}

export default useBaseForm
