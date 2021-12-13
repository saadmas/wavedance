import * as React from 'react';
import { Controller, Noop, useForm } from 'react-hook-form';
import { View } from 'react-native';
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
  blurOnSubmit = true,
}: InputCardProps) => {
  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    mode: 'onBlur',
    defaultValues: { primaryInput: defaultValue },
  });

  const watchAllFields = watch();

  React.useEffect(() => {
    setValue('primaryInput', defaultValue ?? '');
  }, [defaultValue, setValue]);

  const onInputComplete = ({ primaryInput }: FormInput) => {
    setValue('primaryInput', '');
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
    );
  };

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
        onPress={() => onPress(watch().primaryInput)}
        theme={{ colors: { primary: colors.text } }}
      >
        {text}
      </Button>
    );
  };

  const isSubmitButtonDisabled = () => {
    const isDisabled = !!errors.primaryInput || !isValid || !watchAllFields.primaryInput.length;
    return isDisabled;
  };

  const getSubmitButton = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
        <NextScreenButton onPress={handleSubmit(onInputComplete)} isDisabled={isSubmitButtonDisabled()} />
      </View>
    );
  };

  const renderActionButtonsRow = () => {
    const submitButton = getSubmitButton();
    return secondaryButtonProps ? (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {renderSecondaryButton()}
        {submitButton}
      </View>
    ) : (
      submitButton
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
      {renderActionButtonsRow()}
    </>
  );
};

export default InputCard;
