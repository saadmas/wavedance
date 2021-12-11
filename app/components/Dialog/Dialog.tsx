import * as React from 'react';
import { Button, Paragraph, Dialog as RnpDialog, Portal, Provider, useTheme } from 'react-native-paper';

interface DialogProps {
  isVisible: boolean;
  title: string;
  primaryButtonText: string;
  description: string;
  onPrimaryAction: () => void;
  onDismiss: () => void;
}

const Dialog = ({ isVisible, onPrimaryAction, onDismiss, primaryButtonText, title, description }: DialogProps) => {
  const { colors, fonts } = useTheme();
  const fontSize = 10;
  const lineHeight = 0;

  if (!isVisible) {
    return null;
  }

  return (
    <Portal>
      <RnpDialog
        visible={isVisible}
        onDismiss={onDismiss}
        style={{ borderRadius: 5, backgroundColor: colors.onSurface }}
      >
        <RnpDialog.Title style={{ fontSize: 14, lineHeight, fontFamily: fonts.thin.fontFamily }}>
          {title}
        </RnpDialog.Title>
        <RnpDialog.Content>
          <Paragraph style={{ fontSize, lineHeight }}>{description}</Paragraph>
        </RnpDialog.Content>
        <RnpDialog.Actions>
          <Button
            onPress={onPrimaryAction}
            mode="contained"
            labelStyle={{ fontSize }}
            style={{ marginRight: 10 }}
            uppercase={false}
          >
            {primaryButtonText}
          </Button>
          <Button
            onPress={onDismiss}
            mode="text"
            labelStyle={{ fontSize }}
            theme={{ colors: { primary: '#fff' } }}
            uppercase={false}
          >
            Cancel
          </Button>
        </RnpDialog.Actions>
      </RnpDialog>
    </Portal>
  );
};

export default Dialog;
