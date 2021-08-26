import Button from 'components/forms/Button'
import Label from 'components/forms/Label'
import TextInput from 'components/forms/TextInput'
import { DELIVERY_COST } from 'config/constants'
import useBaseForm, { FORM_ERROR } from 'hooks/useBaseForm'
import useCartTotals from 'hooks/useCartTotals'
import useQuery from 'hooks/useQuery'
import useSlug from 'hooks/useSlug'
import formatMoney from 'lib/formatMoney'
import { createOrderId, wait } from 'lib/misc'
import {
  isAbsent,
  isEmptyObj,
  isNonEmptyString,
  isPresent,
  toKeys,
} from 'lib/utils'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react'
import { FormProvider } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import * as cartActions from 'store/cartSlice'
import * as orderActions from 'store/ordersSlice'
import { $_CheckoutForm } from 'validator/schemas'
import { z } from 'zod'

let CheckoutView = () => {
  let {
    cart: { items: cart },
    orders: {
      items: orders,
      meta: { newOrderId },
    },
  } = useSelector((state: RootState) => state)
  let { router } = useSlug()

  useEffect(() => {
    if (isEmptyObj(cart)) {
      isAbsent(newOrderId) && router.push('/orders')
      isPresent(newOrderId) && router.push(`/orders/${newOrderId}`)
    }
  }, [cart, newOrderId, router])

  let [createOrder] = useQuery(orderActions.createOrder)
  let [resetCart] = useQuery(cartActions.resetCart)

  let { cartTotal } = useCartTotals(cart)

  let totalCost = useMemo(
    () => cartTotal + DELIVERY_COST,
    [cartTotal]
  )

  let handleSubmit = useCallback(
    async (data: z.input<typeof $_CheckoutForm>) => {
      try {
        await wait(0)
        let id = isEmptyObj(orders)
          ? createOrderId(Date.now())
          : createOrderId(
              toKeys(orders)
                .map((x) => Number(x.replace('-', '')))
                .sort((a, b) => b - a)[0]!,
              true
            )
        createOrder({
          ...data,
          date: `${new Date()}`,
          cart,
          id,
        })
        return
      } catch (error) {
        return {
          [FORM_ERROR]: `Пожалуйста, повторите ваш запрос позднее. ${error}`,
        }
      }
    },
    [orders, createOrder, cart]
  )

  useLayoutEffect(() => {
    isNonEmptyString(newOrderId) && resetCart()
  }, [newOrderId, resetCart])

  let { ctx, _handleSubmit } = useBaseForm(
    handleSubmit,
    $_CheckoutForm,
    { name: '', phone: '', time: '', address: '' },
    'onSubmit'
  )

  if (isPresent(newOrderId)) return null

  return (
    <main className='px-12 xl:px-8 md:px-6 sm:px-4 pt-9 pb-12 sm:pb-6 bg-secondary-white flex-grow'>
      <h1 className='font-bold leading-tight text-xl'>Доставка</h1>

      <div className='flex lg:flex-wrap items-start justify-between mt-4 max-w-2xl -mr-6 -mb-9'>
        <div className='w-72 min-w-[16rem] mr-6 mb-9 xs:w-full'>
          <FormProvider {...ctx}>
            <div className='mt-4'>
              <Label htmlFor='time'>Когда доставить?</Label>
              <TextInput
                name='time'
                placeholder='после 12'
                type='text'
                className='form-input px-3 text-sm -mt-1.5 py-2 w-full'
                wrapperClasses='relative w-full mt-3.5'
              />
            </div>
            <div className='mt-4'>
              <Label htmlFor='address'>Куда доставить?</Label>
              <TextInput
                name='address'
                placeholder='г. Москва, ул. Парковая, д. 12, кв. 76'
                type='text'
                className='form-input px-3 text-sm -mt-1.5 py-2 w-full'
                wrapperClasses='relative w-full mt-3.5'
              />
            </div>
            <div className='mt-4'>
              <Label htmlFor='name'>Имя</Label>
              <TextInput
                name='name'
                placeholder='Иванов Петр Сергеевич'
                autoComplete='cc-name'
                type='text'
                className='form-input px-3 text-sm -mt-1.5 py-2 w-full'
                wrapperClasses='relative w-full mt-3.5'
              />
            </div>
            <div className='mt-4'>
              <Label htmlFor='phone'>Телефон</Label>
              <TextInput
                name='phone'
                placeholder='79051862459'
                type='text'
                className='form-input px-3 text-sm -mt-1.5 py-2 w-full'
                wrapperClasses='relative w-full mt-3.5'
              />
            </div>
          </FormProvider>
        </div>

        <div className='min-w-[16rem] w-72 mb-9 mr-6 xs:w-full'>
          <div className='bg-secondary-blue rounded p-5 text-primary-body w-full'>
            <div className='flex justify-between text-sm'>
              <div>Стоимость товаров:</div>
              <div>{formatMoney(cartTotal)}</div>
            </div>

            <div className='flex justify-between mt-1 text-sm'>
              <div>Стоимость доставки:</div>
              <div>{formatMoney(DELIVERY_COST)}</div>
            </div>

            <div className='flex justify-between mt-4'>
              <div className=''>Итого:</div>
              <div className='font-semibold text-primary-dark'>
                {formatMoney(totalCost)}
              </div>
            </div>
          </div>

          <Button
            onClick={ctx.handleSubmit(_handleSubmit)}
            disabled={ctx.formState.isSubmitting}
            loading={ctx.formState.isSubmitting}
            className='px-6 py-3 mt-2 font-semibold w-full text-center relative border btn-primary'
          >
            Сделать заказ
          </Button>
        </div>
      </div>
    </main>
  )
}

export default CheckoutView
