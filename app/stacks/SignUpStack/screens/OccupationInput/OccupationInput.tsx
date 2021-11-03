import * as React from 'react';
import InputCard from '../../../../components/InputCard/InputCard';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';

interface OccupationInputProps extends SignUpStepProps {}

const OccupationInput = ({ goToNextStep }: OccupationInputProps) => {
  const dispatch = useSignUpDispatch();

  const onOccupationEnter = (occupation: string) => {
    dispatch({ type: 'OCCUPATION_UPDATE', payload: occupation });
    goToNextStep();
  };

  const onOccupationSkip = () => {
    goToNextStep();
  };

  return (
    <>
      <InputCard
        title="What's your occupation?"
        onSubmit={onOccupationEnter}
        maxLength={50}
        secondaryButtonProps={{
          onPress: onOccupationSkip,
          text: 'Skip',
          width: 100,
        }}
      />
    </>
  );
};

export default OccupationInput;
