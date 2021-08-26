import { Page } from '@types'
import Layout from 'components/layouts/Layout'
import dynamic from 'next/dynamic'

let CheckoutView = dynamic(() => import('components/CheckoutView'), {
  ssr: false,
})

let CheckoutPage: Page = () => <CheckoutView />

CheckoutPage.getLayout = (page) => (
  <Layout title='Оформление заказа'>{page}</Layout>
)

export default CheckoutPage
