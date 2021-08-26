import { lengthLte } from './utils'

let formatMoney = (amount: number) => {
  let amountStr = `${Math.ceil(amount)}`
  if (lengthLte(3, amountStr)) return amountStr + ' ₽'

  let f = (x: string, y: string): string => {
    if (lengthLte(3, x)) return x + ' ' + y + '₽'
    return f(x.slice(0, -3), x.slice(-3) + ' ' + y)
  }
  return f(amountStr, '')
}

export default formatMoney
