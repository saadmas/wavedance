import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    bg: '#222',
    white: '#fff',
    logoBg: '#111759',
    logoSymbol: '#fB2588',
  },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default theme;
