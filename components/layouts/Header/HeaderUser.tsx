import ALink from 'components/common/ALink'
import CartIcon from 'components/icons/CartIcon'
import dynamic from 'next/dynamic'

let HeaderCartQty = dynamic(() => import('./HeaderCartQty'), {
  ssr: false,
})

let HeaderUser = () => (
  <div className='flex xs:order-0 flex-shrink-0 my-0.5'>
    <ALink
      href='/cart'
      className='group hover:border-accent-blue relative flex-shrink-0 flex items-center justify-center xs:w-10 xs:h-10 w-[3.125rem] h-[3.125rem] ml-3 border border-primary-body rounded-full hover:ring-1 hover:ring-accent-blue hover:ring-opacity-50 hover:ring-offset-1'
    >
      <CartIcon className='inset-0 z-10 flex-shrink-0 w-5 h-5 text-primary-body group-hover:text-accent-blue' />
      <div className='h-8 w-8 xs:w-7 xs:h-7 flex bg-secondary-white font-semibold absolute -top-2 -right-3 text-sm text-accent-blue items-center justify-center'>
        <HeaderCartQty />
      </div>
    </ALink>

    <ALink href='/orders'>
      <img
        className='hover:ring-1 hover:ring-accent-blue hover:ring-opacity-75 hover:ring-offset-1 xs:w-10 xs:h-10 w-[3.125rem] h-[3.125rem] ml-5 rounded-full'
        src='/images/avatar.png'
      />
    </ALink>
  </div>
)

export default HeaderUser
