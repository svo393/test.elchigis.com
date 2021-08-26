import Button from 'components/forms/Button'
import FreeDeliveryIcon from 'components/icons/FreeDeliveryIcon'

let FreeDeliveryBanner = () => (
  <div className='relative border border-accent-pink rounded py-5 max-w-xs'>
    <FreeDeliveryIcon className='absolute w-24 h-20 lg:w-16 lg:h-16 -left-4 lg:-left-2 top-8' />

    <div className='ml-24 lg:ml-16 mr-6'>
      <div className='font-semibold text-accent-blue text-xl lg:text-lg leading-[1.625rem] lg:leading-tight'>
        Получай товары БЕСПЛАТНО!
      </div>
    </div>

    <div className='flex justify-end mr-6 lg:mr-0 lg:justify-center mx-2 lg:mt-3'>
      <Button
        as='a'
        href='#'
        className='mt-3 lg:text-sm btn-primary font-semibold px-6 lg:tpx-4 py-2'
      >
        Узнать подробнее
      </Button>
    </div>
  </div>
)

export default FreeDeliveryBanner
