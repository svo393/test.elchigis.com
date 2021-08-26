import ALink from 'components/common/ALink'
import Button from 'components/forms/Button'
import CartBannerIcon from 'components/icons/CartBannerIcon'
import DeleteIcon from 'components/icons/DeleteIcon'
import { BLUR_DATA_URL, MEDIA_URL } from 'config/constants'
import useCartTotals from 'hooks/useCartTotals'
import useQuery from 'hooks/useQuery'
import formatMoney from 'lib/formatMoney'
import { toKeys } from 'lib/utils'
import Image from 'next/image'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import * as cartActions from 'store/cartSlice'

let CartView = () => {
  let {
    cart: { items: cart },
  } = useSelector((state: RootState) => state)
  let cartItemIds = useMemo(() => toKeys(cart), [cart])

  let { cartTotal, cartQty } = useCartTotals(cart)

  let [addCartItem] = useQuery(cartActions.addCartItem)
  let [deleteCartItem] = useQuery(cartActions.deleteCartItem)
  let [resetCart] = useQuery(cartActions.resetCart)

  return (
    <main className='px-12 xl:px-8 md:px-6 sm:px-4 pt-9 pb-12 sm:pb-6 bg-secondary-white flex-grow'>
      <div className='flex items-baseline'>
        <h1 className='font-bold leading-tight text-xl'>Корзина</h1>
        {cartTotal > 0 && (
          <button
            type='button'
            onClick={() => resetCart()}
            className='ml-8 font-semibold text-accent-pink'
          >
            Очистить корзину
          </button>
        )}
      </div>

      <div className='mt-7 border border-secondary-menu-blue rounded'>
        <div className='border -mt-px -ml-px -mr-px border-secondary-menu-blue rounded flex sm:flex-wrap space-x-6 sm:space-x-0 justify-between items-center px-12 xl:px-8 md:px-6 xs:px-3'>
          {cartQty > 0 ? (
            <div>
              <div className='leading-tight xs:text-sm'>
                Стоимость корзины:
              </div>
              <div className='font-bold text-xl'>
                {formatMoney(cartTotal)}
              </div>
            </div>
          ) : (
            <div className='text-xl font-semibold leading-tight'>
              Ваша корзина пуста
            </div>
          )}

          {cartQty > 0 && (
            <Button
              className='w-52 sm:w-64 sm:my-6 xs:w-full sm:order-1 text-center px-3 py-3 text-sm relative btn-primary border font-semibold'
              as='a'
              href='/checkout'
            >
              Оформить
            </Button>
          )}

          <CartBannerIcon className='w-40 h-24 xs:w-24 xs:h-16' />
        </div>

        <div className='divide-y'>
          {cartItemIds?.map((cartItemId) => {
            let { url, name, features, qty, price, productId } =
              cart[cartItemId]!
            let total = price * qty
            return (
              <div
                className='flex lg:flex-col justify-between lg:items-start items-center mx-12 xl:mx-8 md:mx-6 xs:mx-3 py-5 space-x-6 lg:space-x-0'
                key={cartItemId}
              >
                <div className='flex space-x-6 items-center'>
                  <div className='rounded flex-shrink-0 w-14 h-14 overflow-hidden relative'>
                    <Image
                      objectFit='cover'
                      layout='fill'
                      src={`${MEDIA_URL}/${url}`}
                      alt={name}
                      unoptimized
                      placeholder='blur'
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>

                  <ALink
                    href={`/products/${productId}`}
                    className='hover:text-accent-blue'
                  >
                    {name}, {`${features?.[0]?.value.toLowerCase()}`},{' '}
                    {`${features?.[1]?.value.toLowerCase()}`}
                  </ALink>
                </div>

                <div className='flex lg:mt-6 lg:justify-start space-x-12 xs:space-x-4 items-center lg:w-full justify-center'>
                  <div className='rounded-full w-32 px-2 py-1.5 lg:py-0 border border-secondary-menu-blue'>
                    <div className='flex justify-between items-center'>
                      <Button
                        onClick={() =>
                          addCartItem({
                            features,
                            price,
                            variationId: cartItemId,
                            productId,
                            qty: -1,
                            name,
                            url,
                          })
                        }
                        className='px-2 text-3xl mt-[-6px] leading-none font-light text-secondary-menu-blue hover:text-accent-blue'
                      >
                        -
                      </Button>

                      <div>{qty}</div>

                      <Button
                        onClick={() =>
                          addCartItem({
                            features,
                            price,
                            variationId: cartItemId,
                            productId,
                            qty: 1,
                            name,
                            url,
                          })
                        }
                        className='px-2 text-3xl leading-none font-light text-secondary-menu-blue hover:text-accent-blue'
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className='w-24 lg:text-center font-semibold'>
                    {formatMoney(total)}
                  </div>

                  <button
                    type='button'
                    onClick={() => deleteCartItem(cartItemId)}
                  >
                    <DeleteIcon className='cursor-pointer text-secondary-menu-blue w-5 h-5 hover:text-accent-blue' />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default CartView
