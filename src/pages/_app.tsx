import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/GlobalStyle';
import { theme } from 'styles/theme';
import Footer from 'components/Footer/Footer';
import Navigation from 'components/Navigation/Navigation';
import dynamic from 'next/dynamic';

const ShoppingCartProvider = dynamic(() => import('context/ShoppingCartContext'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ShoppingCartProvider>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ShoppingCartProvider>
    </ThemeProvider>
  );
}

export default MyApp;
