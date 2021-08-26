import { ArrowLeftIcon } from '@heroicons/react/solid'
import { Category, FromInitialProps, Page } from '@types'
import ProductItem from 'components/categories/ProductItem'
import ALink from 'components/common/ALink'
import Button from 'components/forms/Button'
import TextInput from 'components/forms/TextInput'
import Layout from 'components/layouts/Layout'
import { DEFAULT_LIMIT } from 'config/constants'
import useBaseForm from 'hooks/useBaseForm'
import useQuery from 'hooks/useQuery'
import useSlug from 'hooks/useSlug'
import useThrottle from 'hooks/useThrottle'
import { setCacheControl } from 'lib/misc'
import { isNonEmptyArray, lengthGt } from 'lib/utils'
import Head from 'next/head'
import Page404 from 'pages/404'
import { useCallback, useEffect, useRef } from 'react'
import { FormProvider } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import * as categoriesActions from 'store/models/Category'
import * as productActions from 'store/models/Product'
import * as productImageActions from 'store/models/ProductImage'
import * as getProductVariationActions from 'store/models/ProductVariation'
import * as selectors from 'store/selectors'
import { resetError } from 'store/UISlice'

let CategoryPage: Page<FromInitialProps> = ({
  fetchedOnServer,
  notFound,
  title,
}) => {
  let { slug } = useSlug()
  let { ctx } = useBaseForm(undefined, undefined, { q: '' })
  let q = ctx.watch('q')

  let category = useSelector(
    (state: RootState['orm']) =>
      selectors.categories(state, Number(slug)) as Category
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

  let [getCategory] = useQuery(categoriesActions.getCategory)
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
      { name: `"${q}"`, category_id: Number(slug) },
      true
    )
  }, [endCursor, getProducts, q, slug])

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
      getCategory(Number(slug))
      getProducts(
        { range: [0, DEFAULT_LIMIT - 1] },
        { category_id: Number(slug) }
      )
    }
  }, [getCategory, getProducts, slug])

  useThrottle(q, getProducts, [
    { range: [0, DEFAULT_LIMIT - 1] },
    { name: `"${q}"`, category_id: Number(slug) },
  ])

  if (notFound) return <Page404 />

  return (
    <>
      <Head>
        <title>{title || category?.name}</title>
      </Head>

      <main className='px-12 xl:px-8 md:px-6 sm:px-4 pt-9 pb-12 bg-secondary-white flex-grow'>
        <div className='flex items-center'>
          <ArrowLeftIcon className='flex-shrink-0 w-3 h-3 text-primary-body' />
          <ALink
            className='hover:underline ml-1 text-primary-body text-sm'
            href='/'
          >
            перейти ко всем категориям
          </ALink>
        </div>

        <div className='flex mt-3 sm:flex-col justify-between items-baseline'>
          <h1 className='font-bold leading-tight text-xl'>
            {category.name}
          </h1>

          <FormProvider {...ctx}>
            <div className='relative ml-4 max-w-56 sm:ml-0 sm:mt-2 sm:w-full'>
              <TextInput
                className='py-0.5 sm:-mt-1.5 sm:py-2 pr-8 w-full text-sm pl-3 form-input'
                name='q'
                placeholder='фильтровать по товарам'
              />
            </div>
          </FormProvider>
        </div>

        {isNonEmptyArray(products) ? (
          <div className='grid mt-7 grid-auto-52 lg:grid-cols-2 xs:grid-cols-1 gap-y-10 gap-x-4'>
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

CategoryPage.getInitialProps = async ({
  store: { dispatch, getState },
  res,
  query: { slug },
}: any) => {
  await dispatch(
    categoriesActions.getCategory('getCategory', Number(slug))
  )

  let { message, queryId } = getState().ui.error

  let notFound = false
  let name = ''
  if (message === 'Not Found' && queryId === 'getCategory') {
    res.statusCode = 404
    notFound = true
    dispatch(resetError())
  }

  if (!notFound) {
    await dispatch(
      productActions.getProducts(
        'getProducts',
        { range: [0, DEFAULT_LIMIT - 1] },
        { category_id: Number(slug) }
      )
    )

    setCacheControl(res)

    name = getState().orm.Category.itemsById[slug]?.name
  }

  return { fetchedOnServer: true, notFound, title: name }
}

CategoryPage.getLayout = (page) => (
  <Layout title={page.props.title}>{page}</Layout>
)

export default CategoryPage
