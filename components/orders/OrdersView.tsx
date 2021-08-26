import useQuery from 'hooks/useQuery'
import { isNonEmptyArray, toKeys } from 'lib/utils'
import { useLayoutEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import * as orderActions from 'store/ordersSlice'
import SingleOrder from './SingleOrder'

let OrdersView = () => {
  let {
    orders: { items: orders },
  } = useSelector((state: RootState) => state)

  let orderIds = useMemo(() => toKeys(orders), [orders])

  let [resetNewOrderId] = useQuery(orderActions.resetNewOrderId)

  useLayoutEffect(() => {
    resetNewOrderId()
  }, [resetNewOrderId])

  return (
    <main className='px-12 xl:px-8 md:px-6 sm:px-4 pt-9 pb-12 sm:pb-6 bg-secondary-white flex-grow'>
      <div className='mt-3'>
        <h1 className='font-bold leading-tight text-xl'>
          История заказов
        </h1>
      </div>

      {isNonEmptyArray(orderIds) ? (
        <div className='grid grid-auto-72 gap-4 mt-6'>
          {orderIds?.map((orderId) => (
            <SingleOrder
              key={orderId}
              {...orders[orderId]!}
              id={orderId}
            />
          ))}
        </div>
      ) : (
        <div className='text-center text-xl font-semibold mt-7 '>
          Вы еще не совершали заказов
        </div>
      )}
    </main>
  )
}

export default OrdersView
