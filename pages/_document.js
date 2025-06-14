/**
 * Overloads the _document container from Next.js in order to add custom fonts
 */

import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheet.getStyleElement()
        ]
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{'body { margin: 0 } /* custom! */'}</style>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <link
            href={
              'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800' +
              '&display=optional'
            }
            rel='stylesheet'
          />
          <Script
            src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js'
            strategy='beforeInteractive'
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
