import { Page } from '@types'
// import Button from 'components/forms/Button'
import Layout from 'components/layouts/Layout'

let Page404: Page = () => (
  <main className='flex flex-col px-4 '>
    <h1 className='mt-20 text-2xl xl:text-3xl text-center'>
      Ошибка 404 | Нет такой страницы
    </h1>
  </main>
)

Page404.getLayout = (page) => (
  <Layout title='Ошибка 404 | Нет такой страницы'>{page}</Layout>
)

export default Page404
