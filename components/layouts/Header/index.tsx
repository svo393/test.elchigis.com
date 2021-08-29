import HeaderCity from './HeaderCity'
import HeaderLogo from './HeaderLogo'
import HeaderSearchBar from './HeaderSearchBar'
import HeaderUser from './HeaderUser'

let Header = () => {
  return (
    <header className='flex items-center justify-between min-w-0 pt-5 px-12 xl:px-8 md:px-6 sm:px-4 bg-secondary-white lg:grid lg:grid-cols-12 gap-x-4 gap-y-2'>
      <HeaderLogo />
      <HeaderCity />
      <HeaderSearchBar />
      <HeaderUser />
    </header>
  )
}

export default Header
