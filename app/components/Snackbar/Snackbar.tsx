import * as React from 'react';
import { Snackbar as RnpSnackbar, useTheme } from 'react-native-paper';

interface SnackbarProps {
  text: string;
  isVisible: boolean;
  backgroundColor: string;
  closeSnackbar: () => void;
  icon?: string;
}

const Snackbar = ({ isVisible, icon, text, closeSnackbar, backgroundColor }: SnackbarProps) => {
  const { colors } = useTheme();

  return (
    <RnpSnackbar
      visible={isVisible}
      onDismiss={closeSnackbar}
      duration={5000}
      action={{
        icon,
        label: '',
        onPress: closeSnackbar,
      }}
      style={{ backgroundColor }}
      theme={{ colors: { surface: colors.text, accent: colors.text } }}
    >
      {text}
    </RnpSnackbar>
  );
};

export default Snackbar;
