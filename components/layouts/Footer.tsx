import ALink from 'components/common/ALink'
import AppStoreButton from 'components/icons/AppStoreButton'
import FaceBookIcon from 'components/icons/FaceBookIcon'
import GooglePlayButton from 'components/icons/GooglePlayButton'
import InstagramIcon from 'components/icons/InstagramIcon'
import VkontakteIcon from 'components/icons/VkontakteIcon'

let Footer = () => (
  <footer className='px-12 xl:px-8 md:px-6 py-10 bg-secondary-very-light-grey'>
    <div className='flex justify-between sm:flex-col sm:items-center'>
      <ALink
        href='/'
        className='hover:text-accent-blue text-primary-dark font-extrabold tracking-wide text-[2.5rem] leading-none'
      >
        React
      </ALink>

      <div className='flex sm:flex-col sm:items-center space-x-8 sm:mt-6 sm:space-x-0'>
        <div>
          <h4>Присоединяйтесь к нам</h4>
          <div className='flex sm:justify-center text-accent-blue space-x-4 mt-2'>
            <ALink className='hover:brightness-150' href='#'>
              <FaceBookIcon className='w-7 h-7' />
            </ALink>
            <ALink className='hover:brightness-150' href='#'>
              <VkontakteIcon className='w-7 h-7' />
            </ALink>
            <ALink className='hover:brightness-150' href='#'>
              <InstagramIcon className='w-7 h-7' />
            </ALink>
          </div>
        </div>

        <div className='sm:mt-6'>
          <h4>Устанавливайте приложение</h4>
          <div className='flex text-primary-dark space-x-5 mt-2'>
            <ALink className='hover:brightness-150' href='#'>
              <GooglePlayButton />
            </ALink>
            <ALink className='hover:brightness-150' href='#'>
              <AppStoreButton />
            </ALink>
          </div>
        </div>
      </div>
    </div>

    <div className='flex sm:flex-wrap sm:space-x-0 space-x-5 text-secondary-grey text-sm justify-center mt-14'>
      <span className='mr-5'>© Sionic</span>
      <ALink className='hover:underline mr-5' href='#'>
        Правовая информация
      </ALink>
      <ALink className='hover:underline' href='#'>
        Политика конфиденциальности
      </ALink>
    </div>
  </footer>
)

export default Footer
