import Document, { Head, Main, NextScript, Html, DocumentContext } from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';

const stylesServer = createStylesServer();

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [initialProps.styles, <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />],
    };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/icons/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
