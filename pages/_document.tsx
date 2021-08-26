import { inProduction } from 'lib/misc'
import Document, { Head, Html, Main, NextScript } from 'next/document'

let csp = ` base-uri 'self';`
csp += ` form-action 'self';`
csp += ` default-src 'self';`
csp += ` object-src 'self' webpack-internal: webpack:;`
csp += ` connect-src ${process.env['NEXT_PUBLIC_MEDIA_URL']} 'self';`
csp += ` script-src 'self' ${
  inProduction ? '' : "'unsafe-eval'"
} 'unsafe-inline';`
csp += ` style-src 'self' 'unsafe-inline' data:;`
csp += ` img-src 'self' ${process.env['NEXT_PUBLIC_MEDIA_URL']} data: blob:;`
csp += ` font-src  'self';`
csp += ` frame-src *;`
csp += ` media-src *;`

class MyDocument extends Document {
  render() {
    return (
      <Html lang='ru'>
        <Head>
          <meta httpEquiv='Content-Security-Policy' content={csp} />
          <link
            rel='icon'
            type='image/png'
            href='/favicon-32x32.png'
          />

          <noscript>
            <style
              dangerouslySetInnerHTML={{
                __html: 'body::before { content: none !important; }',
              }}
            />
          </noscript>
        </Head>

        <body className='loading text-primary-dark min-w-[18.75rem]'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
