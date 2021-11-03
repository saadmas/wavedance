import * as React from 'react';
import InputCard from '../../../../components/InputCard/InputCard';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';

interface HometownInputProps extends SignUpStepProps {}

const HometownInput = ({ goToNextStep }: HometownInputProps) => {
  const dispatch = useSignUpDispatch();

  const onHometownEnter = (hometown: string) => {
    dispatch({ type: 'HOMETOWN_UPDATE', payload: hometown });
    goToNextStep();
  };

  return (
    <InputCard
      title="What's your hometown?"
      onSubmit={onHometownEnter}
      maxLength={50}
      placeholder="e.g. Karachi, Pakistan"
    />
  );
};

export default HometownInput;
