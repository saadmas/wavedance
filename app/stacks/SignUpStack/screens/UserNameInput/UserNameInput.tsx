import * as React from 'react';
import InputCard from '../../../../components/InputCard/InputCard';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';

interface UserNameInputProps extends SignUpStepProps {}

const UserNameInput = ({ goToNextStep }: UserNameInputProps) => {
  const dispatch = useSignUpDispatch();

  const onNameEnter = (name: string) => {
    dispatch({ type: 'NAME_UPDATE', payload: name });
    goToNextStep();
  };

  return <InputCard title="What's your name?" onSubmit={onNameEnter} maxLength={50} withNextButton={true} />;
};

export default UserNameInput;
