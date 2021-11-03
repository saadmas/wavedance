import * as React from 'react';
import Title from '../../../../components/Title/Title';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import NextScreenButton from '../../../../components/NextScreenButton/NextScreenButton';

interface BirthdayInputProps extends SignUpStepProps {}

const BirthdayInput = ({ goToNextStep }: BirthdayInputProps) => {
  const [birthday, setBirthday] = React.useState<Date | undefined>(undefined);
  const dispatch = useSignUpDispatch();

  const onBirthdayEnter = () => {
    if (birthday) {
      dispatch({ type: 'BIRTHDAY_UPDATE', payload: birthday.toISOString() });
      goToNextStep();
    }
  };

  const onDateChange = (_: Event, date?: Date) => {
    setBirthday(date);
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    return maxDate;
  };

  const getMinDate = () => {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 80);
    return minDate;
  };

  const getDefaultDate = () => {
    const defaultDate = new Date(2000, 0, 1);
    return defaultDate;
  };

  return (
    <>
      <Title title="When's your birthday?" />
      <DateTimePicker
        value={birthday ?? getDefaultDate()}
        maximumDate={getMaxDate()}
        minimumDate={getMinDate()}
        mode={'date'}
        display="spinner"
        themeVariant="dark"
        onChange={onDateChange}
      />
      <NextScreenButton onPress={onBirthdayEnter} isDisabled={!birthday} />
    </>
  );
};

export default BirthdayInput;
