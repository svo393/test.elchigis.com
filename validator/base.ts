import {
  isNonEmptyString,
  isNumber,
  lengthGteP,
  lengthLteP,
  trim,
} from 'lib/utils'
import { z } from 'zod'

export let maxLimitMsg = 'Превышен лимит длины'

export let NonEmptyString = (msg = 'Cannot be empty.') =>
  z
    .string()
    .transform(trim)
    .refine(isNonEmptyString, { message: msg })

export let Min8String = (msg = 'Too short. Min 8 chars.') =>
  z.string().transform(trim).refine(lengthGteP(8), { message: msg })

export let Max64String = (msg = 'Too long. Max 64 chars.') =>
  z.string().transform(trim).refine(lengthLteP(64), { message: msg })

export let Max256String = (msg = 'Too long. Max 256 chars.') =>
  z.string().transform(trim).refine(lengthLteP(256), { message: msg })

export let MaxString = (msg = 'Too long. Max 65536 chars.') =>
  z
    .string()
    .transform(trim)
    .refine(lengthLteP(65536), { message: msg })

export let parse =
  <T, U extends z.ZodTypeAny>(x: z.ZodEffects<z.ZodEffects<U, T>>) =>
  (y: z.infer<U>) => {
    let result = x.safeParse(y)
    return result.success ? result.data : undefined
  }

export let pass =
  <T, U extends z.ZodTypeAny>(x: z.ZodEffects<U, T>) =>
  (y: z.infer<U>) => {
    let result = x.safeParse(y)
    return result.success
  }

export let NonEmptySubMaxString = NonEmptyString(
  'Это поле не должно быть пустым'
).refine(pass(MaxString()), {
  message: maxLimitMsg,
})

export let PhoneNumber = NonEmptyString(
  'Пожалуйста, введите номер телефона'
)
  .transform(trim)
  .refine((x) => isNumber(Number(x)), {
    message: 'Номер может состоять только в цифр',
  })
  .refine(lengthGteP(11), { message: 'Номер слишком короткий' })
  .refine(lengthLteP(11), { message: 'Номер слишком длинный' })
  .transform(Number)
