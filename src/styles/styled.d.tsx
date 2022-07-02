import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
    };
    fontSize: {
      paragraph: string;
    };
    mq: {
      tablet: string;
      desktop: string;
      bigDesktop: string;
      huge: string;
    };
  }
}
