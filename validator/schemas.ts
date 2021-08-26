import { z } from 'zod'
import {
  Max64String,
  maxLimitMsg,
  NonEmptyString,
  PhoneNumber,
} from './base'

export let $_Q = z.object({ q: z.string() })

export let $_CheckoutForm = z.object({
  name: NonEmptyString('Пожалуйста, введите ваше полное имя').and(
    Max64String(maxLimitMsg)
  ),
  phone: PhoneNumber,
  time: NonEmptyString('Пожалуйста, укажите время доставки').and(
    Max64String(maxLimitMsg)
  ),
  address: NonEmptyString('Пожалуйста, введите адрес доставки').and(
    Max64String(maxLimitMsg)
  ),
})
