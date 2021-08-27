import { StoreFullProduct } from '@types'
import clsx from 'clsx'
import { BLUR_DATA_URL, MEDIA_URL } from 'config/constants'
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { isAbsent, isNonEmptyArray, lengthGt } from 'lib/utils'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type Props = { product?: StoreFullProduct; loading: boolean }

let HeroImage = ({ product, loading }: Props) => {
  let images = product?.images
  let name = product?.name

  let [selectedImageIdx, setSelectedImageIdx] = useState(0)

  let [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slidesPerView: 1,
    initial: 0,
    duration: 300,
    slideChanged(slider) {
      setSelectedImageIdx(slider.details().relativeSlide || 0)
    },
  })

  useIsomorphicLayoutEffect(() => {
    slider?.refresh()
    setSelectedImageIdx(0)
  }, [images])

  useEffect(() => {
    let currentRef = ref.current!
    let preventNavigation = (event: TouchEvent) => {
      let touchXPosition = event.touches[0]?.pageX ?? 0
      let touchXRadius = event.touches[0]?.radiusX ?? 0
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault()
    }

    currentRef.addEventListener('touchstart', preventNavigation)

    return () => {
      currentRef.removeEventListener('touchstart', preventNavigation)
    }
  }, [ref])

  let imageUrl = images?.[selectedImageIdx]?.image_url

  let src = useMemo(
    () =>
      loading || isAbsent(imageUrl)
        ? BLUR_DATA_URL
        : `${MEDIA_URL}${imageUrl}`,
    [loading, imageUrl]
  )

  return (
    <>
      <div className='w-2/5 flex-shrink-0 lg:flex-shrink lg:w-full sm:hidden'>
        <div className='relative w-full aspect-w-1 aspect-h-1 rounded overflow-hidden'>
          <Image
            objectFit={src === BLUR_DATA_URL ? 'cover' : 'contain'}
            layout='fill'
            src={src}
            alt={name}
            unoptimized
            placeholder='blur'
            blurDataURL={BLUR_DATA_URL}
          />
        </div>

        <div className='flex flex-wrap justify-center content-start px-3 mt-3'>
          {images?.map(({ id, image_url }, idx) => (
            <div
              className={clsx(
                'mx-1 mb-2 rounded w-12 h-12 lg:w-9 lg:h-9 cursor-pointer overflow-hidden relative',
                {
                  'ring-1 ring-accent-blue ring-offset-1':
                    selectedImageIdx === idx,
                }
              )}
              key={id}
            >
              <Image
                objectFit='cover'
                onClick={() => setSelectedImageIdx(idx)}
                layout='fill'
                src={`${MEDIA_URL}/${image_url}`}
                alt={name}
                unoptimized
                placeholder='blur'
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='hidden sm:block'>
        <div ref={ref} className='keen-slider'>
          {isNonEmptyArray(images) ? (
            <>
              {images?.map(({ id, image_url }) => (
                <div
                  className='relative keen-slider__slide h-vw'
                  key={id}
                >
                  <Image
                    objectFit='contain'
                    layout='fill'
                    src={`${MEDIA_URL}/${image_url}`}
                    alt={name}
                    unoptimized
                    placeholder='blur'
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className='relative keen-slider__slide h-vw'>
              <Image
                objectFit='cover'
                layout='fill'
                src={BLUR_DATA_URL}
                alt={name}
                unoptimized
                placeholder='blur'
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          )}
        </div>

        {lengthGt(1, images) && (
          <div className='flex flex-wrap -mx-1.5 -mb-3 overflow-hidden pt-3 justify-center'>
            {images?.map((_, idx) => (
              <div
                key={idx}
                className={clsx(
                  'mx-1.5 border border-gray-400 p-1 focus:outline-none rounded-full mb-3',
                  {
                    'bg-gray-400': selectedImageIdx === idx,
                    'bg-gray-200': selectedImageIdx !== idx,
                  }
                )}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default HeroImage
