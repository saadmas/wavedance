import * as React from 'react';
import { FAB, useTheme } from 'react-native-paper';

interface NextScreenButtonProps {
  onPress: () => void;
  isDisabled: boolean;
}

const NextScreenButton = ({ onPress, isDisabled }: NextScreenButtonProps) => {
  const { colors } = useTheme();
  const size = 40;

  if (isDisabled) {
    return null;
  }

  return (
    <FAB
      onPress={onPress}
      icon={'check'}
      theme={{ colors: { accent: colors.primary } }}
      disabled={isDisabled}
      style={{ width: size, height: size, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
    />
  );
};

export default NextScreenButton;
