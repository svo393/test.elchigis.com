import Banner1 from 'components/banners/Banner1'
import Banner2 from 'components/banners/Banner2'
import FreeDeliveryBanner from 'components/banners/FreeDeliveryBanner'

type Props = { showBanners?: boolean }

let Aside = ({ showBanners = true }: Props) => (
  <div className='border-l bg-secondary-white border-secondary-blue md:w-full md:flex md:flex-col md:items-center lg:w-64 xl:w-72 w-88 pl-4 pr-6 pt-5 pb-12'>
    <div>
      <FreeDeliveryBanner />
    </div>

    {showBanners && (
      <>
        <div className='mt-8'>
          <Banner1 />
        </div>
        <div className='mt-5'>
          <Banner2 />
        </div>
        <div className='mt-5'>
          <Banner1 />
        </div>
      </>
    )}
  </div>
)

export default Aside
