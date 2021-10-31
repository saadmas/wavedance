import * as React from 'react';
import { Controller, Noop, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, TextStyle } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

interface EmailPasswordFormProps {
  type: 'signUp' | 'signIn';
  onFormSubmit: (email: string, password: string) => void;
}

interface FormInput {
  email: string;
  password: string;
}

const EmailPasswordForm = ({ type, onFormSubmit }: EmailPasswordFormProps) => {
  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit = ({ email, password }: FormInput) => onFormSubmit(email, password);

  const renderTextInput = (
    onChange: (...event: any[]) => void,
    onBlur: Noop,
    value: string,
    inputType: 'email' | 'password'
  ) => {
    const inputStyle: TextStyle = {
      height: 40,
    };

    const passwordStyle: TextStyle = {
      ...inputStyle,
      marginTop: 10,
      marginBottom: 20,
    };

    const isPasswordInput = inputType === 'password';

    return (
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        mode="outlined"
        value={value}
        secureTextEntry={isPasswordInput}
        style={isPasswordInput ? passwordStyle : inputStyle}
        placeholder={isPasswordInput ? 'Password' : 'Email'}
        placeholderTextColor="grey"
        theme={{ colors: { text: 'black', background: '#fff' } }}
      />
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ padding: 20 }}>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => renderTextInput(onChange, onBlur, value, 'email')}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => renderTextInput(onChange, onBlur, value, 'password')}
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        uppercase={false}
        style={{
          backgroundColor: colors.accent,
          borderRadius: 40,
        }}
      >
        {type === 'signIn' ? 'Sign in' : 'Sign up'}
      </Button>
    </KeyboardAvoidingView>
  );
};

export default EmailPasswordForm;
