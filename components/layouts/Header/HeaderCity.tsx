import PinIcon from 'components/icons/PinIcon'

let HeaderCity = () => (
  <button className='row-start-1 ml-7 xl:ml-5 lg:ml-3 xs:ml-0 flex flex-shrink w-40 xs:w-56 lg:w-auto xs:max-w-max group hover:mt-px col-span-5 col-start-4 xs:row-start-2 xs:col-start-1'>
    <PinIcon className='flex-shrink-0 text-primary-dark h-5 w-[0.9375rem]' />
    <span className='ml-2 text-sm truncate text-primary-body group-hover:border-b border-dashed border-primary-body border-opacity-40'>
      Александровск-Сахалинский
    </span>
  </button>
)

export default HeaderCity
