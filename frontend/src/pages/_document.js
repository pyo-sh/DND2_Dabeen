import React from "react";
import Document, { Main, NextScript, Head } from "next/document";
import Helmet from "react-helmet";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
       html, body {
            height: 100%;
            overflow: auto;
            font-family: "Noto Sans KR", sans-serif;
          }
          #__next {
            height: 100%;
          }
`;
class MyDocument extends Document {
  static getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    const page = context.renderPage(App => props =>
      sheet.collectStyles(
        <>
          <GlobalStyles />
            <App {...props} />
        </>
      )
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, helmet: Helmet.renderStatic(), styleTags };
  }
  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <Head>
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
          <link
            href='https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap&subset=korean'
            rel='stylesheet'
          />
          <link
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
            rel='stylesheet'
          />
          <link
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
            rel='stylesheet'
          />
          <link
            href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css'
            rel='stylesheet'
          />
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())}
        </Head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
