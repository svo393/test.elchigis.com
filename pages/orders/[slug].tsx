import { Page } from '@types'
import Layout from 'components/layouts/Layout'
import useSlug from 'hooks/useSlug'
import { isAbsent } from 'lib/utils'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

let OrderView = dynamic(() => import('components/orders/OrderView'), {
  ssr: false,
})

let OrderPage: Page = () => {
  let {
    orders: { items: orders },
  } = useSelector((state: RootState) => state)

  let { slug, router } = useSlug<string>()

  let order = orders[slug]

  useEffect(() => {
    isAbsent(order) && router.replace('/orders')
  }, [order, orders, router, slug])

  if (isAbsent(order)) return null

  return (
    <>
      <Head>
        <title>Заказ #{slug}</title>
      </Head>
      <OrderView {...order} id={slug} />
    </>
  )
}

OrderPage.getLayout = (page) => (
  <Layout title='Ваши заказы'>{page}</Layout>
)

export default OrderPage
