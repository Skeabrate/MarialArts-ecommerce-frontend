import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/GlobalStyle';
import { theme } from 'styles/theme';
import Footer from 'components/Footer/Footer';
import Navigation from 'components/Navigation/Navigation';
import { ApolloProvider } from '@apollo/client';
import client from 'graphql/apollo';

const ShoppingCartProvider = dynamic(() => import('context/ShoppingCartContext'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ShoppingCartProvider>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </ShoppingCartProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
