import * as React from 'react';
import Title from '../../../../components/Title/Title';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { IconButton, useTheme } from 'react-native-paper';

interface BirthdayInputProps extends SignUpStepProps {}

const BirthdayInput = ({ goToNextStep }: BirthdayInputProps) => {
  const [birthday, setBirthday] = React.useState<Date | undefined>(undefined);
  const dispatch = useSignUpDispatch();
  const { colors } = useTheme();

  const onBirthdayEnter = () => {
    // dispatch({ type: 'NAME_UPDATE', payload: name }); ///
    goToNextStep();
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

  const maxDate = getMaxDate();

  return (
    <>
      <Title title="When's your birthday?" />
      <DateTimePicker
        value={birthday ?? maxDate}
        maximumDate={maxDate}
        minimumDate={getMinDate()}
        mode={'date'}
        display="spinner"
        themeVariant="dark"
        onChange={onDateChange}
      />
      <IconButton
        onPress={onBirthdayEnter}
        size={60}
        icon="arrow-right-bold-circle"
        theme={{ colors: { text: colors.primary } }}
        disabled={!birthday}
        style={{ position: 'absolute', bottom: 60, right: 20 }}
      />
    </>
  );
};

export default BirthdayInput;
