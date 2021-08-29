import { Category, FromInitialProps, Page } from '@types'
import ProductItem from 'components/categories/ProductItem'
import Button from 'components/forms/Button'
import TextInput from 'components/forms/TextInput'
import Layout from 'components/layouts/Layout'
import { DEFAULT_LIMIT } from 'config/constants'
import useBaseForm from 'hooks/useBaseForm'
import useQuery from 'hooks/useQuery'
import useThrottle from 'hooks/useThrottle'
import { setCacheControl } from 'lib/misc'
import { isNonEmptyArray, lengthGt } from 'lib/utils'
import Head from 'next/head'
import { useCallback, useEffect, useRef } from 'react'
import { FormProvider } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import * as categoriesActions from 'store/models/Category'
import * as productActions from 'store/models/Product'
import * as productImageActions from 'store/models/ProductImage'
import * as getProductVariationActions from 'store/models/ProductVariation'
import * as selectors from 'store/selectors'

let pageTitle = 'Facilis lorem ipsum dolor sit amet, libero?'

let HomePage: Page<FromInitialProps> = ({
  fetchedOnServer,
  title,
}) => {
  let { ctx } = useBaseForm(undefined, undefined, { q: '' })
  let q = ctx.watch('q')

  let categories = useSelector(
    (state: RootState['orm']) =>
      selectors.categories(state) as Category[]
  )
  let products = useSelector((state: RootState['orm']) =>
    selectors.products(state)
  )
  let productsWithoutImages = useSelector((state: RootState['orm']) =>
    selectors.productsWithoutImages(state)
  )
  let productsWithoutVariations = useSelector(
    (state: RootState['orm']) =>
      selectors.productsWithoutVariations(state)
  )
  let {
    api: {
      products: { endCursor, hasNextPage },
    },
  } = useSelector((state: RootState) => state)

  let [getCategories] = useQuery(categoriesActions.getCategories)
  let [getProducts, getProductsStatus] = useQuery(
    productActions.getProducts
  )
  let [getProductImages] = useQuery(
    productImageActions.getProductImages
  )
  let [getProductVariations] = useQuery(
    getProductVariationActions.getProductVariations
  )
  let getMoreProducts = useCallback(() => {
    getProducts(
      { range: [endCursor + 1, endCursor + DEFAULT_LIMIT + 1] },
      { name: `"${q}"` },
      true
    )
  }, [endCursor, getProducts, q])

  useEffect(() => {
    lengthGt(0, productsWithoutImages) &&
      getProductImages(
        null,
        { product_id: productsWithoutImages },
        true
      )
  }, [productsWithoutImages, getProductImages])

  useEffect(() => {
    lengthGt(0, productsWithoutVariations) &&
      getProductVariations(
        null,
        { product_id: productsWithoutVariations },
        true
      )
  }, [getProductVariations, productsWithoutVariations])

  let initRender = useRef(fetchedOnServer || false)
  useEffect(() => {
    if (initRender.current) {
      initRender.current = false
      return
    }

    if (!initRender.current) {
      getCategories()
      getProducts({ range: [0, DEFAULT_LIMIT - 1] })
    }
  }, [getCategories, getProducts])

  useThrottle(q, getProducts, [
    { range: [0, DEFAULT_LIMIT - 1] },
    { name: `"${q}"` },
  ])

  return (
    <>
      <Head>
        <title>{title || pageTitle}</title>
      </Head>

      <main className='px-12 xl:px-8 md:px-6 sm:px-4 pt-9 pb-12 bg-secondary-white flex-grow'>
        <div className='flex sm:flex-col justify-between items-baseline'>
          <h1 className='font-bold leading-tight text-xl'>
            Категории товаров
          </h1>

          <FormProvider {...ctx}>
            <div className='relative ml-4 max-w-56 sm:ml-0 sm:mt-3.5 sm:w-full'>
              <TextInput
                className='py-0.5 sm:-mt-1.5 sm:py-2 pr-8 w-full text-sm pl-3 form-input'
                name='q'
                placeholder='фильтровать по товарам'
              />
            </div>
          </FormProvider>
        </div>

        <div className='mt-4 flex flex-wrap -mr-1 -mb-1.5 sm:overflow-x-auto sm:flex-nowrap'>
          {categories?.map((x) => (
            <Button
              as='a'
              className='flex-shrink-0 rounded-full px-2 py-0.5 sm:py-2 btn-pink text-sm font-semibold mr-1 mb-1.5'
              href={`/categories/${x.id}`}
              key={x.id}
            >
              {x.name}
            </Button>
          ))}
        </div>

        {isNonEmptyArray(products) ? (
          <div className='grid mt-7 grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-y-10 gap-x-4'>
            {products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <>
            {getProductsStatus !== 'loading' && (
              <div className='text-center text-xl font-semibold mt-7'>
                Нет подходящих товаров
              </div>
            )}
          </>
        )}

        {((hasNextPage && isNonEmptyArray(products)) ||
          getProductsStatus === 'loading') && (
          <div className='flex justify-center mt-9'>
            <Button
              className='relative btn-gray px-11 py-3 sm:text-sm text-primary-body font-semibold'
              onClick={getMoreProducts}
              disabled={getProductsStatus === 'loading'}
              loading={getProductsStatus === 'loading'}
            >
              Показать больше товаров
            </Button>
          </div>
        )}
      </main>
    </>
  )
}

HomePage.getInitialProps = async ({
  store: { dispatch },
  res,
}: any) => {
  await dispatch(categoriesActions.getCategories('getCategories'))
  await dispatch(
    productActions.getProducts('getProducts', {
      range: [0, DEFAULT_LIMIT - 1],
    })
  )

  setCacheControl(res)

  return {
    fetchedOnServer: true,
    title: pageTitle,
  }
}

HomePage.getLayout = (page) => (
  <Layout
    title={page.props.title}
    description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis obcaecati quo consectetur nesciunt at ex explicabo perspiciatis temporibus voluptatem blanditiis.'
  >
    {page}
  </Layout>
)

export default HomePage
