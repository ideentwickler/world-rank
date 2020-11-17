import React from "react";
import App from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../../lib/apollo-client';

import '../styles/nprogress.css';
import '../styles/globals.css'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
*/

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);