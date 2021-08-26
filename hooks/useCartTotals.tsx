import { CartItem } from '@types'
import { toValues } from 'lib/utils'
import { useMemo } from 'react'

let useCartTotals = (
  cart: Record<number, Omit<CartItem, 'variationId'>>,
  short = false
) => {
  let cartQty = useMemo(() => {
    let totalQty = toValues(cart).reduce(
      (acc, cur) => acc + cur.qty,
      0
    )
    return short ? (totalQty > 9 ? '10+' : `${totalQty}`) : totalQty
  }, [cart, short])

  let cartTotal = useMemo(
    () =>
      toValues(cart).reduce(
        (acc, cur) => acc + cur.qty * cur.price,
        0
      ),
    [cart]
  )

  return { cartQty, cartTotal }
}

export default useCartTotals
