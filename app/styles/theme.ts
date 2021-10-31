import { DarkTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DarkTheme as PaperDefaultTheme } from 'react-native-paper';

export const backgroundColor = '#222';
export const defaultScreenPadding = 20;

const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#111759',
    accent: '#fB2588',
    text: '#fff',
    background: backgroundColor,
  },
};

export default theme;
