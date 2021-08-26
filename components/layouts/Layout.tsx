import { isPresent } from 'lib/utils'
import Head from 'next/head'
import { ReactNode } from 'react'
import Aside from './Aside'
import Footer from './Footer'
import Header from './Header'

export type LayoutProps = {
  title?: string
  description?: string
  canonical?: string
  children: ReactNode
  noindex?: boolean
}

let Layout = ({
  title,
  description,
  canonical,
  children,
  noindex = false,
}: LayoutProps) => (
  <>
    <Head>
      <title>{title || 'Lorem ipsum dolor sit amet'}</title>
      {noindex && <meta name='robots' content='noindex' />}
      {isPresent(description) && (
        <meta name='description' content={description} />
      )}

      {isPresent(canonical) && (
        <link rel='canonical' href={canonical} />
      )}
    </Head>

    <div className='flex flex-col justify-between w-full min-h-screen max-w-[110rem] mx-auto'>
      <div className='flex-grow flex justify-between md:flex-col'>
        <div className='flex-grow flex flex-col min-w-0'>
          <Header />
          {children}
        </div>
        <Aside />
      </div>
      <Footer />
    </div>
  </>
)

export default Layout
