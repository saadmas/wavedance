import * as React from 'react';
import Title from '../../../../components/Title/Title';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import NextScreenButton from '../../../../components/NextScreenButton/NextScreenButton';

interface PassionsInputProps extends SignUpStepProps {}

const PassionsInput = ({ goToNextStep }: PassionsInputProps) => {
  const [passions, setPassions] = React.useState<string[]>([]);
  const dispatch = useSignUpDispatch();

  const onPassionsSubmit = () => {
    // dispatch({ type: 'BIRTHDAY_UPDATE', payload: birthday.toISOString() });
    goToNextStep();
  };

  const isNextButtonDisabled = () => {
    const doPassionsMeetRequirements = passions.length > 3;
    return !doPassionsMeetRequirements;
  };

  return (
    <>
      <Title title="When's your birthday?" />
      <NextScreenButton onPress={onPassionsSubmit} isDisabled={isNextButtonDisabled()} />
    </>
  );
};

export default PassionsInput;
