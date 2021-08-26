import { AppProps } from '@types'
import { RootErrorFallback } from 'components/common/ErrorComponent'
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect'
import useSlug from 'hooks/useSlug'
import { isServer } from 'lib/misc'
import App, { AppContext } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { wrapper } from 'store'
import 'styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  let getLayout = Component.getLayout ?? ((page) => page)
  let { router } = useSlug()

  useIsomorphicLayoutEffect(() => {
    let handleResize = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        // onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let appProps = { pageProps: {} }
  if (isServer) {
    appProps = await App.getInitialProps(appContext)
  }
  return { ...appProps }
}

export default wrapper.withRedux(MyApp)
