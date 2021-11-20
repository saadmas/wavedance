import { StyleSheet } from 'react-native';
import { backgroundColor, defaultScreenPadding } from './styles/theme';

export const styles = StyleSheet.create({
  app: {
    backgroundColor,
    height: '100%',
    width: '100%',
    paddingTop: defaultScreenPadding,
  },
});
