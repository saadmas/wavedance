import { DarkTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DarkTheme as PaperDefaultTheme } from 'react-native-paper';

export const backgroundColor = '#000';
export const inputTextColor = '#444';
export const defaultScreenPadding = 20;

const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#1d8dbc',
    accent: '#239874',
    text: '#ffffdf',
    background: backgroundColor,
  },
};

export default theme;
