import * as React from 'react';
import { Controller, Noop, useForm } from 'react-hook-form';
import { IconButton, TextInput, useTheme } from 'react-native-paper';
import Title from '../Title/Title';

interface InputCardProps {
  title: string;
  onSubmit: (input: string) => void;
  placeholder?: string;
  maxLength?: number;
}

interface FormInput {
  primaryInput: string;
}

const InputCard = ({ title, placeholder, maxLength, onSubmit }: InputCardProps) => {
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
        style={{
          fontSize: 20,
        }}
        placeholder={placeholder}
        multiline={true}
        maxLength={maxLength}
        autoCapitalize={'words'}
        theme={{ fonts: { regular: { fontFamily: 'Montserrat_400Regular' } } }}
      />
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
      <IconButton
        onPress={handleSubmit(onInputComplete)}
        size={60}
        icon="arrow-right-bold-circle"
        theme={{ colors: { text: colors.primary } }}
        disabled={!!errors.primaryInput || !isDirty}
        style={{ position: 'absolute', bottom: 60, right: 20 }}
      />
    </>
  );
};

export default InputCard;
