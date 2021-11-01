import * as React from 'react';
import { Controller, Noop, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { IconButton, Surface, TextInput, Title, useTheme } from 'react-native-paper';
import { defaultScreenPadding } from '../../styles/theme';

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
    formState: { errors },
  } = useForm<FormInput>();

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
          fontSize: 25,
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
    <View style={{ padding: defaultScreenPadding, height: '100%' }}>
      <Title
        style={{
          fontSize: 40,
          paddingTop: 10,
          paddingBottom: 10,
          lineHeight: 40,
          fontFamily: 'Lustria_400Regular',
        }}
      >
        {title}
      </Title>
      <Surface>
        <Controller
          name="primaryInput"
          control={control}
          rules={{ required: true, maxLength }}
          render={({ field: { onChange, onBlur, value } }) => renderTextInput(onChange, onBlur, value)}
        />
      </Surface>
      <View style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '60%' }}>
        <IconButton
          onPress={handleSubmit(onInputComplete)}
          size={60}
          icon="arrow-right-bold-circle"
          theme={{ colors: { text: colors.primary } }}
          disabled={!!errors.primaryInput}
          // style={{ position: 'absolute', bottom: 60, right: 20 }}
        />
      </View>
    </View>
  );
};

export default InputCard;
