import { DarkTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { configureFonts, DarkTheme as PaperDefaultTheme } from 'react-native-paper';
import { fontConfig } from './fonts';

export const backgroundColor = '#000';
export const inputTextColor = '#444';
export const defaultScreenPadding = 20;

const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#B79CED',
    accent: '#239874',
    text: '#efd9ce',
    background: backgroundColor,
  },
  fonts: configureFonts(fontConfig),
};

export default theme;
