import * as React from 'react';
import { Keyboard, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { backgroundColor } from '../../styles/theme';
import NextScreenButton from '../NextScreenButton/NextScreenButton';
import Title from '../Title/Title';

interface SecondaryButtonProps {
  onPress: (inputValue?: string) => void;
  text: string;
  width?: number;
  color?: string;
  icon?: string;
}

interface InputCardProps {
  title: string;
  onSubmit: (input: string) => void;
  shouldAutoCapitalize?: boolean;
  placeholder?: string;
  maxLength?: number;
  defaultValue?: string;
  blurOnSubmit?: boolean;
  secondaryButtonProps?: SecondaryButtonProps;
}

const InputCard = ({
  title,
  placeholder,
  maxLength,
  onSubmit,
  shouldAutoCapitalize,
  secondaryButtonProps,
  defaultValue,
  blurOnSubmit = true,
}: InputCardProps) => {
  const { colors } = useTheme();
  const [inputValue, setInputValue] = React.useState<string>(defaultValue ?? '');

  React.useEffect(() => {
    setInputValue(defaultValue ?? '');
  }, [defaultValue, title]);

  React.useEffect(() => {
    setInputValue(defaultValue ?? '');
  }, []);

  const renderSecondaryButton = () => {
    if (!secondaryButtonProps) {
      return;
    }

    const { onPress, text, width, icon, color } = secondaryButtonProps;

    return (
      <Button
        mode="outlined"
        icon={icon}
        style={{ width: width ?? 150, borderRadius: 40, marginTop: 20, borderColor: color ?? colors.text }}
        labelStyle={{ fontSize: 10, color: color ?? colors.text }}
        compact={true}
        uppercase={false}
        onPress={() => onPress(inputValue)}
        theme={{ colors: { primary: colors.text } }}
      >
        {text}
      </Button>
    );
  };

  const isSubmitButtonDisabled = () => {
    const isDisabled = !inputValue.length;
    return isDisabled;
  };

  const getSubmitButton = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
        <NextScreenButton onPress={() => onSubmit(inputValue)} isDisabled={isSubmitButtonDisabled()} />
      </View>
    );
  };

  const renderActionButtonsRow = () => {
    const submitButton = getSubmitButton();

    if (secondaryButtonProps) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {renderSecondaryButton()}
          {submitButton}
        </View>
      );
    }

    return submitButton;
  };

  const onBlur = () => {
    Keyboard.dismiss;
  };

  return (
    <>
      <Title title={title} />
      <TextInput
        onBlur={onBlur}
        onChangeText={setInputValue}
        mode="flat"
        value={inputValue}
        style={{
          fontSize: 16,
          backgroundColor,
        }}
        placeholder={placeholder}
        multiline={true}
        maxLength={maxLength}
        blurOnSubmit={blurOnSubmit}
        returnKeyType={blurOnSubmit ? 'done' : undefined}
        autoCapitalize={shouldAutoCapitalize ? 'words' : undefined}
      />
      {renderActionButtonsRow()}
    </>
  );
};

export default InputCard;
