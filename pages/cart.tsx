import { Page } from '@types'
import Layout from 'components/layouts/Layout'
import dynamic from 'next/dynamic'

let CartView = dynamic(() => import('components/CartView'), {
  ssr: false,
})

let CartPage: Page = () => <CartView />

CartPage.getLayout = (page) => <Layout title='Корзина'>{page}</Layout>

export default CartPage
