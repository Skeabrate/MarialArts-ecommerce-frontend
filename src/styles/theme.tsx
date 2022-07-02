import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    black: '#000',
    white: '#FFF',
  },
  fontSize: {
    paragraph: '1.6rem',
  },
  mq: {
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1024px)',
    bigDesktop: '@media (min-width: 1280px)',
    huge: '@media (min-width: 1440px)',
  },
};
