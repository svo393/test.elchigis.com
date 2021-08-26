import useCartTotals from 'hooks/useCartTotals'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

let HeaderCartQty = () => {
  let {
    cart: { items: cart },
  } = useSelector((state: RootState) => state)

  let { cartQty } = useCartTotals(cart, true)

  return <>{cartQty}</>
}

export default HeaderCartQty
