import * as React from 'react';
import { FAB, useTheme } from 'react-native-paper';

interface NextScreenButtonProps {
  onPress: () => void;
  isDisabled: boolean;
}

const NextScreenButton = ({ onPress, isDisabled }: NextScreenButtonProps) => {
  const { colors } = useTheme();
  return (
    <FAB
      onPress={onPress}
      icon={'check'}
      theme={{ colors: { accent: colors.primary } }}
      disabled={isDisabled}
      style={{ position: 'absolute', bottom: 100, right: 40 }}
    />
  );
};

export default NextScreenButton;
