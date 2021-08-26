import { ArrowLeftIcon } from '@heroicons/react/solid'
import { OrderItem } from '@types'
import ALink from 'components/common/ALink'
import {
  BLUR_DATA_URL,
  MEDIA_URL,
  ORDER_STATUSES,
} from 'config/constants'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import useCartTotals from 'hooks/useCartTotals'
import useQuery from 'hooks/useQuery'
import useSlug from 'hooks/useSlug'
import formatMoney from 'lib/formatMoney'
import { toKeys } from 'lib/utils'
import Image from 'next/image'
import { useLayoutEffect, useMemo } from 'react'
import * as orderActions from 'store/ordersSlice'

dayjs.extend(localizedFormat)

let OrderView = ({ date, status, cart, address }: OrderItem) => {
  let cartItemIds = useMemo(() => toKeys(cart), [cart])
  let { cartQty, cartTotal } = useCartTotals(cart)

  let [resetNewOrderId] = useQuery(orderActions.resetNewOrderId)

  useLayoutEffect(() => {
    resetNewOrderId()
  }, [resetNewOrderId])

  let { slug } = useSlug()

  return (
    <main className='px-12 xl:px-8 md:px-6 sm:px-4 pt-9 pb-12 bg-secondary-white flex-grow'>
      <div className='flex items-center'>
        <ArrowLeftIcon className='flex-shrink-0 w-3 h-3 text-primary-body' />
        <ALink
          className='hover:underline ml-1 text-primary-body text-sm'
          href='/orders'
        >
          перейти в историю заказов
        </ALink>
      </div>

      <div className='mt-3'>
        <h1 className='font-bold leading-tight text-xl'>
          Заказ #{slug} от{' '}
          <span className='text-primary-body'>
            {dayjs(date).locale('ru').format('L')}
          </span>
        </h1>

        <div className='grid grid-auto-44 -mr-6 -mb-3 mt-3 text-sm'>
          <div className='mr-9 mb-3'>
            <div className='text-primary-body'>Статус заказа</div>
            <div className='font-semibold'>
              {ORDER_STATUSES[status]}
            </div>
          </div>

          <div className='mr-9 mb-3'>
            <div className='text-primary-body'>Кол-во товаров</div>
            <div className='font-semibold'>{cartQty}</div>
          </div>

          <div className='mr-9 mb-3'>
            <div className='text-primary-body'>Стоимость заказа</div>
            <div className='font-semibold'>
              {formatMoney(cartTotal)}
            </div>
          </div>

          <div className='mr-9 mb-3'>
            <div className='text-primary-body'>Адрес доставки</div>
            <div className='font-semibold'>{address}</div>
          </div>
        </div>

        <h2 className='font-bold leading-tight text-lg mt-6'>
          Корзина
        </h2>

        <div className='divide-y'>
          {cartItemIds?.map((cartItemId) => {
            let { url, name, features, qty, price, productId } =
              cart[cartItemId]!
            let total = price * qty
            return (
              <div
                className='flex justify-between items-center py-5'
                key={cartItemId}
              >
                <div className='flex items-center tw-4/5'>
                  <div className='rounded flex-shrink-0 w-14 h-14 xs:w-10 xs:h-10 overflow-hidden relative'>
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
                    className='ml-6 xs:ml-3 hover:text-accent-blue text-sm line-clamp-2'
                  >
                    {name}, {`${features?.[0]?.value.toLowerCase()}`},{' '}
                    {`${features?.[1]?.value.toLowerCase()}`}
                  </ALink>
                </div>

                <div className='ml-6 xs:ml-3 flex items-center justify-between w-28 flex-shrink-0'>
                  <div className='w-6 text-right'>{qty}</div>
                  <div className='ml-6 xs:ml-3 font-semibold whitespace-nowrap'>
                    {formatMoney(total)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default OrderView
