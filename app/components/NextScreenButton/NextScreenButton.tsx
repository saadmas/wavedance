import * as React from 'react';
import { GestureResponderEvent } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

interface NextScreenButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  isDisabled: boolean;
}

const NextScreenButton = ({ onPress, isDisabled }: NextScreenButtonProps) => {
  const { colors } = useTheme();
  return (
    <IconButton
      onPress={onPress}
      size={60}
      icon="arrow-right-bold-circle"
      theme={{ colors: { text: colors.primary } }}
      disabled={isDisabled}
      style={{ position: 'absolute', bottom: 60, right: 20 }}
    />
  );
};

export default NextScreenButton;
