import { Page } from '@types'
import Layout from 'components/layouts/Layout'
import dynamic from 'next/dynamic'

let OrdersView = dynamic(
  () => import('components/orders/OrdersView'),
  { ssr: false }
)

let OrdersPage: Page = () => <OrdersView />

OrdersPage.getLayout = (page) => (
  <Layout title='История заказов'>{page}</Layout>
)

export default OrdersPage
