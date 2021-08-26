import { OrderItem } from '@types'
import ALink from 'components/common/ALink'
import { ORDER_STATUSES } from 'config/constants'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import useCartTotals from 'hooks/useCartTotals'
import formatMoney from 'lib/formatMoney'

dayjs.extend(localizedFormat)

let SingleOrder = ({
  date,
  id,
  status,
  address,
  cart,
}: OrderItem) => {
  let { cartQty, cartTotal } = useCartTotals(cart)

  return (
    <div className='border p-4 border-secondary-menu-blue rounded'>
      <div className='text-primary-body text-sm font-semibold'>
        {dayjs(date).locale('ru').format('L')}
      </div>

      <div className='text-xs flex space-x-6 mt-3'>
        <div>
          <div className='text-primary-body'>Статус заказа</div>
          <div className='font-semibold'>
            {ORDER_STATUSES[status]}
          </div>
        </div>

        <div>
          <div className='text-primary-body'>Номер заказа</div>
          <div>
            <ALink
              href={`/orders/${id}`}
              className='font-semibold text-accent-blue hover:underline'
            >
              #{id}
            </ALink>
          </div>
        </div>
      </div>

      <div className='text-xs flex flex-wrap -mr-6 -mb-3 mt-3'>
        <div className='mr-6 mb-3'>
          <div className='text-primary-body'>Кол-во товаров</div>
          <div className='font-semibold'>{cartQty}</div>
        </div>

        <div className='mr-6 mb-3'>
          <div className='text-primary-body'>Стоимость заказа</div>
          <div className='font-semibold'>
            {formatMoney(cartTotal)}
          </div>
        </div>

        <div className='mr-6 mb-3'>
          <div className='text-primary-body'>Адрес доставки</div>
          <div className='font-semibold'>{address}</div>
        </div>
      </div>
    </div>
  )
}

export default SingleOrder
