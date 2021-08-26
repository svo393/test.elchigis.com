import ALink from 'components/common/ALink'
import { BLUR_DATA_URL } from 'config/constants'
import Image from 'next/image'
import banner2 from 'public/images/banner2.jpg'

let Banner2 = () => (
  <ALink className='group' href='#'>
    <div className='flex max-w-[19.4375rem] overflow-hidden rounded justify-center items-center hover:ring-1 hover:ring-accent-blue hover:ring-opacity-75 hover:shadow-lg hover:ring-offset-8 child-w-full'>
      <Image
        src={banner2}
        objectFit='cover'
        placeholder='blur'
        blurDataURL={BLUR_DATA_URL}
      />
      <div className='max-w-[10.375rem] absolute text-xl font-bold text-secondary-white text-center leading-6'>
        Новая коллекция
      </div>
    </div>
  </ALink>
)

export default Banner2
