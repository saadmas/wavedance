import * as React from 'react';
import InputCard from '../../../../components/InputCard/InputCard';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';

interface InstagramHandleInputInputProps extends SignUpStepProps {}

const InstagramHandleInputInput = ({ goToNextStep }: InstagramHandleInputInputProps) => {
  const dispatch = useSignUpDispatch();

  const onInstagramHandleSubmit = (instagramHandle: string) => {
    dispatch({ type: 'CURRENT_LOCATION_UPDATE', payload: instagramHandle });
    goToNextStep();
  };

  const onInstagramHandleSkip = () => {
    goToNextStep();
  };

  //* Limit - 30 symbols. Username must contains only letters, numbers, periods and underscores.

  return (
    <>
      <InputCard
        title="Add Instagram handle to profile?"
        onSubmit={onInstagramHandleSubmit}
        maxLength={50}
        placeholder="Enter Instagram handle"
        secondaryButtonProps={{
          onPress: onInstagramHandleSkip,
          text: 'Skip',
          width: 100,
        }}
      />
    </>
  );
};

export default InstagramHandleInputInput;
