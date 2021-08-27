import { Transition } from '@headlessui/react'
import { FullProductVariation, StoreProduct } from '@types'
import ALink from 'components/common/ALink'
import Button from 'components/forms/Button'
import { BLUR_DATA_URL, MEDIA_URL } from 'config/constants'
import useClickOutside from 'hooks/useClickOutside'
import useQuery from 'hooks/useQuery'
import formatMoney from 'lib/formatMoney'
import {
  isNonEmptyArray,
  isNonEmptyArrayOfPositiveNumbers,
  isPresent,
} from 'lib/utils'
import Image from 'next/image'
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import * as cartActions from 'store/cartSlice'
import * as getProductVariationActions from 'store/models/ProductVariation'
import * as getProductVariationPropertyActions from 'store/models/ProductVariationProperty'
import * as getProductVariationPropertyListValuesActions from 'store/models/ProductVariationPropertyListValue'
import * as getProductVariationPropertyValuesActions from 'store/models/ProductVariationPropertyValue'
import * as selectors from 'store/selectors'

let ProductItem = ({
  product: { id, images, name, variations, category },
}: {
  product: StoreProduct
}) => {
  let [ref, open, setOpen] = useClickOutside(false)
  let [added, setAdded] = useState(false)

  let {
    ui: {
      watcher: { status },
    },
  } = useSelector((state: RootState) => state)

  let product = useSelector((state: RootState['orm']) =>
    selectors.fullProducts(state).find((x) => x.id === id)
  )

  let productVariationIds = useSelector((state: RootState['orm']) =>
    selectors.productVariationIds(state, id)
  )

  let [getProductVariations, getProductVariationsStatus] = useQuery(
    getProductVariationActions.getProductVariations
  )
  let [
    getProductVariationProperties,
    getProductVariationPropertiesStatus,
  ] = useQuery(
    getProductVariationPropertyActions.getProductVariationProperties
  )
  let [
    getProductVariationPropertyListValues,
    getProductVariationPropertyListValuesStatus,
  ] = useQuery(
    getProductVariationPropertyListValuesActions.getProductVariationPropertyListValues
  )
  let [
    getProductVariationPropertyValues,
    getProductVariationPropertyValuesStatus,
  ] = useQuery(
    getProductVariationPropertyValuesActions.getProductVariationPropertyValues
  )

  let [addCartItem] = useQuery(cartActions.addCartItem)

  useEffect(() => {
    status?.includes(`ProductVariations${id}__Success`) &&
      isNonEmptyArrayOfPositiveNumbers(productVariationIds) &&
      getProductVariationPropertyValues(null, {
        product_variation_id: productVariationIds,
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  let handleClick = () => {
    if (!added) {
      getProductVariationProperties()
      getProductVariationPropertyListValues()
      getProductVariations(null, { product_id: id }, true, `${id}`)
      setOpen(true)
    }
  }

  let handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      }
    },
    [setOpen]
  )

  let handleAddCartItem = ({
    id,
    features,
    price,
  }: Pick<FullProductVariation, 'features' | 'id' | 'price'>) => {
    addCartItem({
      features,
      price,
      variationId: id,
      productId: product?.id,
      qty: 1,
      name: product?.name,
      url: product?.images?.[0]?.image_url,
    })
    setOpen(false)
    setAdded(true)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  let price = useMemo(
    () =>
      (variations ?? []).sort((a, b) => a.price - b.price)[0]?.price,
    [variations]
  )

  let src = isPresent(images?.[0]?.image_url)
    ? `${MEDIA_URL}${images?.[0]?.image_url}`
    : BLUR_DATA_URL

  let loading = useMemo(
    () =>
      getProductVariationsStatus === 'loading' ||
      getProductVariationPropertiesStatus === 'loading' ||
      getProductVariationPropertyListValuesStatus === 'loading' ||
      getProductVariationPropertyValuesStatus === 'loading',
    [
      getProductVariationPropertiesStatus,
      getProductVariationPropertyListValuesStatus,
      getProductVariationPropertyValuesStatus,
      getProductVariationsStatus,
    ]
  )

  let loaded = useMemo(() => {
    let features = product?.variations
      ?.flatMap(({ features }) =>
        features.map(
          ({ name, value }) => isPresent(name) && isPresent(value)
        )
      )
      .filter((x) => x === true)
    return isNonEmptyArray(features)
  }, [product?.variations])

  let buttonText = useMemo(
    () => (open ? 'Выберите вариацию' : 'Добавить в корзину'),
    [open]
  )

  return (
    <div className='w-52 lg:w-auto sm:w-auto hover:ring-1 hover:ring-accent-blue hover:ring-opacity-75 hover:shadow-lg rounded hover:ring-offset-8'>
      <ALink className='block pb-2.5' href={`/products/${id}`}>
        <div className='relative w-52 lg:w-auto sm:w-auto h-32 lg:h-40 md:h-48 sm:h-52 overflow-hidden rounded'>
          <Image
            objectFit='cover'
            layout='fill'
            src={src}
            alt={name}
            unoptimized
            placeholder='blur'
            blurDataURL={BLUR_DATA_URL}
          />
          <div className='absolute bottom-2 bg-accent-light-pink rounded-full px-2 py-0.5 left-2 max-w-[12rem] text-secondary-white text-sm font-semibold truncate'>
            {category?.name}
          </div>
        </div>

        <div className='truncate text-sm sm:text-base mt-1'>
          {name}
        </div>

        <div className='mt-1 text-xl leading-[1.625rem] text-accent-blue font-semibold'>
          {isPresent(price) ? (
            <>от {formatMoney(price)}</>
          ) : (
            <div className='w-32 skeleton skeleton-blue'>&#8203;</div>
          )}
        </div>
      </ALink>

      <div className='relative'>
        {added ? (
          <Button
            as='a'
            href='/cart'
            className='px-2 py-2 w-full text-sm text-center relative border btn-primary'
          >
            Перейти в корзину
          </Button>
        ) : (
          <Button
            loading={loading}
            disabled={loading}
            className='px-2 py-2 w-full text-sm text-center relative border btn-white border-accent-blue text-accent-blue'
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        )}

        <Transition
          show={open && loaded}
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <div className='origin-top-right absolute z-30 right-0 mt-2 w-full rounded shadow-lg overflow-hidden bg-secondary-white ring-1 ring-gray-900 ring-opacity-5 focus:outline-none'>
            <div className='py-1' ref={ref}>
              {product?.variations?.map(({ id, price, features }) => (
                <div key={id}>
                  <button
                    type='button'
                    className='w-full text-left block px-4 py-2 text-sm font-semibold hover:bg-secondary-blue hover:text-accent-blue'
                    onClick={() =>
                      handleAddCartItem({ id, price, features })
                    }
                  >
                    {`${features?.[0]?.value}`},{' '}
                    <span className='whitespace-nowrap'>{`${features?.[1]?.value.toLowerCase()} — ${formatMoney(
                      price
                    )}`}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default ProductItem
