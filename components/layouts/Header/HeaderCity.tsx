import PinIcon from 'components/icons/PinIcon'

let HeaderCity = () => (
  <button className='ml-7 xl:ml-5 lg:ml-3 xs:ml-0 xs:mt-3 xs:order-1 flex flex-shrink w-40 xs:w-56 lg:w-auto xs:max-w-max lg:max-w-[10rem] group hover:mt-px'>
    <PinIcon className='flex-shrink-0 text-primary-dark h-5 w-[0.9375rem]' />
    <span className='ml-2 text-sm truncate text-primary-body group-hover:border-b border-dashed border-primary-body border-opacity-40'>
      Александровск-Сахалинский
    </span>
  </button>
)

export default HeaderCity
