import { DarkTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DarkTheme as PaperDefaultTheme } from 'react-native-paper';

export const backgroundColor = 'black';
export const inputTextColor = '#444';
export const defaultScreenPadding = 20;

const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#fB2588',
    accent: '#111759',
    text: '#fff',
    background: backgroundColor,
  },
};

export default theme;
