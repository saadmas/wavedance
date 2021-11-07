import * as React from 'react';
import { Controller, Noop, useForm } from 'react-hook-form';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { backgroundColor } from '../../styles/theme';
import NextScreenButton from '../NextScreenButton/NextScreenButton';
import Title from '../Title/Title';

interface SecondaryButtonProps {
  onPress: () => void;
  text: string;
  width?: number;
}

interface InputCardProps {
  title: string;
  onSubmit: (input: string) => void;
  shouldAutoCapitalize?: boolean;
  placeholder?: string;
  maxLength?: number;
  defaultValue?: string;
  secondaryButtonProps?: SecondaryButtonProps;
}

interface FormInput {
  primaryInput: string;
}

const InputCard = ({
  title,
  placeholder,
  maxLength,
  onSubmit,
  shouldAutoCapitalize,
  secondaryButtonProps,
  defaultValue,
}: InputCardProps) => {
  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormInput>({
    mode: 'onBlur',
  });

  const onInputComplete = ({ primaryInput }: FormInput) => {
    onSubmit(primaryInput);
  };

  const renderTextInput = (onChange: (...event: any[]) => void, onBlur: Noop, value: string) => {
    return (
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        mode="flat"
        value={value}
        defaultValue={defaultValue}
        style={{
          fontSize: 20,
          backgroundColor,
        }}
        placeholder={placeholder}
        multiline={true}
        maxLength={maxLength}
        autoCapitalize={shouldAutoCapitalize ? 'words' : undefined}
      />
    );
  };

  const renderSecondaryButton = () => {
    if (!secondaryButtonProps) {
      return;
    }

    const { onPress, text, width } = secondaryButtonProps;

    return (
      <Button
        mode="outlined"
        style={{ width: width ?? 150, borderRadius: 40, marginTop: 20, borderColor: colors.text }}
        labelStyle={{ fontSize: 10 }}
        compact={true}
        uppercase={false}
        onPress={onPress}
        theme={{ colors: { primary: colors.text } }}
      >
        {text}
      </Button>
    );
  };

  return (
    <>
      <Title title={title} />
      <Controller
        name="primaryInput"
        control={control}
        rules={{ required: true, maxLength }}
        render={({ field: { onChange, onBlur, value } }) => renderTextInput(onChange, onBlur, value)}
      />
      {renderSecondaryButton()}
      <NextScreenButton onPress={handleSubmit(onInputComplete)} isDisabled={!!errors.primaryInput || !isDirty} />
    </>
  );
};

export default InputCard;
