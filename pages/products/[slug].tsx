import { ArrowLeftIcon } from '@heroicons/react/solid'
import { FromInitialProps, FullProductVariation, Page } from '@types'
import clsx from 'clsx'
import ALink from 'components/common/ALink'
import Button from 'components/forms/Button'
import Layout from 'components/layouts/Layout'
import HeroImage from 'components/products/HeroImage'
import ParametersSkeleton from 'components/products/ParametersSkeleton'
import VariationsSkeleton from 'components/products/VariationsSkeleton'
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect'
import useQuery from 'hooks/useQuery'
import useSlug from 'hooks/useSlug'
import formatMoney from 'lib/formatMoney'
import { setCacheControl } from 'lib/misc'
import {
  isNonEmptyArray,
  isNonEmptyArrayOfPositiveNumbers,
  isPresent,
} from 'lib/utils'
import Head from 'next/head'
import Page404 from 'pages/404'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import * as cartActions from 'store/cartSlice'
import * as categoriesActions from 'store/models/Category'
import * as productActions from 'store/models/Product'
import * as productImageActions from 'store/models/ProductImage'
import * as getProductVariationActions from 'store/models/ProductVariation'
import * as getProductVariationPropertyActions from 'store/models/ProductVariationProperty'
import * as getProductVariationPropertyListValuesActions from 'store/models/ProductVariationPropertyListValue'
import * as getProductVariationPropertyValuesActions from 'store/models/ProductVariationPropertyValue'
import * as selectors from 'store/selectors'
import { resetError } from 'store/UISlice'

let ProductPage: Page<FromInitialProps> = ({
  fetchedOnServer,
  notFound,
  title,
}) => {
  let { slug } = useSlug()

  let [selectedVariationIdx, setSelectedVariationIdx] = useState(0)

  useIsomorphicLayoutEffect(() => {
    setSelectedVariationIdx(0)
  }, [slug])

  let {
    ui: {
      watcher: { status },
    },
  } = useSelector((state: RootState) => state)
  let [added, setAdded] = useState(false)

  let product = useSelector((state: RootState['orm']) =>
    selectors.fullProducts(state).find((x) => x.id === Number(slug))
  )

  let productVariationIds = useSelector((state: RootState['orm']) =>
    selectors.productVariationIds(state, Number(slug))
  )

  let [getCategory] = useQuery(categoriesActions.getCategory)
  let [getProduct] = useQuery(productActions.getProduct)
  let [getProductImages] = useQuery(
    productImageActions.getProductImages
  )
  let [getProductVariations] = useQuery(
    getProductVariationActions.getProductVariations
  )
  let [getProductVariationProperties] = useQuery(
    getProductVariationPropertyActions.getProductVariationProperties
  )
  let [getProductVariationPropertyListValues] = useQuery(
    getProductVariationPropertyListValuesActions.getProductVariationPropertyListValues
  )
  let [getProductVariationPropertyValues] = useQuery(
    getProductVariationPropertyValuesActions.getProductVariationPropertyValues
  )

  let [addCartItem] = useQuery(cartActions.addCartItem)
  let handleAddCartItem = ({
    id,
    features,
    price,
  }: FullProductVariation) => {
    addCartItem({
      features,
      price,
      variationId: id,
      productId: product?.id,
      qty: 1,
      name: product?.name,
      url: product?.images?.[0]?.image_url,
    })
    setAdded(true)
  }

  let initRender = useRef(fetchedOnServer || false)
  useEffect(() => {
    if (initRender.current) {
      return
    }

    if (!initRender.current) {
      getProduct(Number(slug))
    }
  }, [getProduct, slug])

  useEffect(() => {
    if (
      status?.includes(`Product${slug}__Success`) ||
      initRender.current
    ) {
      if (initRender.current) {
        initRender.current = false
      }

      product?.id === Number(slug) && getCategory(product.category_id)
      getProductImages(null, { product_id: Number(slug) })
      getProductVariationProperties()
      getProductVariationPropertyListValues()
      getProductVariations(
        null,
        { product_id: Number(slug) },
        false,
        slug
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    status?.includes(`ProductVariations${slug}__Success`) &&
      isNonEmptyArrayOfPositiveNumbers(productVariationIds) &&
      getProductVariationPropertyValues(null, {
        product_variation_id: productVariationIds,
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  if (notFound) return <Page404 />

  let category = product?.category
  let variations = (product?.variations ?? []).filter(
    (x) =>
      isNonEmptyArray(x.features) && isNonEmptyArray(x.parameters)
  )

  return (
    <>
      <Head>
        <title>{title || product?.name}</title>
      </Head>

      <main className='px-12 xl:px-8 md:px-6 sm:px-4 pt-9 pb-12 sm:pb-6 bg-secondary-white flex-grow'>
        <div>
          {isPresent(category) ? (
            <div className='flex items-center text-sm'>
              <ArrowLeftIcon className='flex-shrink-0 w-3 h-3 text-primary-body' />
              <ALink
                className='text-primary-body hover:underline ml-1'
                href={`/categories/${category.id}`}
              >
                в категорию &#171;{category.name}&#187;
              </ALink>
            </div>
          ) : (
            <div className='w-32 skeleton skeleton-dark'>&#8203;</div>
          )}
        </div>

        {isPresent(product?.name) ? (
          <h1 className='font-bold leading-tight text-3xl mt-6'>
            {product!.name}
          </h1>
        ) : (
          <div className='text-3xl mt-6 w-80 skeleton skeleton-dark'>
            &#8203;
          </div>
        )}

        <div className='mt-6 sm:mt-3 flex space-x-9 sm:space-x-0 sm:block'>
          <HeroImage product={product} />

          <div className='sm:mt-6'>
            <div className='flex space-x-9 xl:space-x-6 lg:flex-col lg:space-x-0 sm:space-x-0 lg:max-w-xs sm:max-w-none'>
              <div>
                <div className='font-semibold'>Выберите вариацию</div>

                <div className='mt-2 space-y-1 '>
                  {isNonEmptyArray(variations) ? (
                    <>
                      {variations.map(
                        ({ id, price, features }, idx) => (
                          <Button
                            className={clsx(
                              'px-2 py-2 w-full text-sm relative btn-white border font-semibold whitespace-nowrap',
                              {
                                'border-accent-blue text-accent-blue':
                                  selectedVariationIdx === idx,
                                'border-primary-body text-primary-dark':
                                  selectedVariationIdx !== idx,
                              }
                            )}
                            key={id}
                            onClick={() =>
                              setSelectedVariationIdx(idx)
                            }
                          >
                            {`${features?.[0]?.value}`},{' '}
                            <span className='whitespace-nowrap'>{`${features?.[1]?.value.toLowerCase()} — ${formatMoney(
                              price
                            )}`}</span>
                          </Button>
                        )
                      )}
                    </>
                  ) : (
                    <VariationsSkeleton />
                  )}
                </div>

                {added ? (
                  <Button
                    className='mt-3 px-2 py-2 text-center sm:py-3 w-full text-sm relative btn-primary border font-semibold'
                    as='a'
                    href='/cart'
                  >
                    Перейти в корзину
                  </Button>
                ) : (
                  <Button
                    className='mt-3 px-2 py-2 text-center sm:py-3 w-full text-sm relative btn-primary border font-semibold'
                    onClick={() =>
                      handleAddCartItem(
                        variations[selectedVariationIdx]!
                      )
                    }
                  >
                    Добавить в корзину
                  </Button>
                )}
              </div>

              <div className='lg:mt-6'>
                <div className='font-semibold'>Характеристики</div>

                <div className='mt-2'>
                  <table className='mt-2'>
                    <tbody className='w-auto align-top text-sm leading-snug'>
                      {isNonEmptyArray(
                        variations?.[selectedVariationIdx]?.parameters
                      ) ? (
                        <>
                          {variations[
                            selectedVariationIdx
                          ]!.parameters.map(({ name, value }) => (
                            <tr
                              className='border border-secondary-very-light-grey'
                              key={name}
                            >
                              <th className='py-2 px-4 font-medium text-left bg-secondary-very-light-grey'>
                                {name}
                              </th>
                              <td className='py-2 px-4'>{value}</td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <ParametersSkeleton />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <div className='font-bold text-xl'>Описание</div>
          <div className='mt-3 leading-[1.4] max-w-2xl'>
            {product?.description}
          </div>
        </div>
      </main>
    </>
  )
}

ProductPage.getInitialProps = async ({
  store: { dispatch, getState },
  res,
  query: { slug },
}: any) => {
  await dispatch(
    productActions.getProduct('getProduct', Number(slug))
  )

  let { message, queryId } = getState().ui.error

  let notFound = false
  let name = ''
  if (message === 'Not Found' && queryId === 'getProduct') {
    res.statusCode = 404
    notFound = true
    dispatch(resetError())
  }

  if (!notFound) {
    let f2 = async () => {
      let categoryId =
        getState().orm.Product.itemsById[slug]?.category_id

      await dispatch(
        categoriesActions.getCategory('getCategory', categoryId)
      )
    }

    await Promise.all(
      [
        f2,
        async () => {
          await dispatch(
            productImageActions.getProductImages(
              'getProductImages',
              null,
              { product_id: Number(slug) }
            )
          )
        },
      ].map(async (x) => await x())
    )

    setCacheControl(res)

    name = getState().orm.Product.itemsById[slug]?.name
  }

  return { fetchedOnServer: true, notFound, title: name }
}

ProductPage.getLayout = (page) => (
  <Layout title={page.props.title}>{page}</Layout>
)

export default ProductPage
