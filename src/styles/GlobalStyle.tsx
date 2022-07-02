import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	*, *::after, *::before{
		-webkit-font-smothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	html{
		font-size: 62.5%;
	}

	body {
		overflow-x: hidden !important;
		font-size: ${({ theme }) => theme.fontSize.paragraph};
		color: ${({ theme }) => theme.colors.black};

		button, a {
			color: ${({ theme }) => theme.colors.black};
		}
	}
`;
