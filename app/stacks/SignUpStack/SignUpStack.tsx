import * as React from 'react';
import UserNameInput from './screens/UserNameInput/UserNameInput';
import SignUp from '../AuthStack/screens/SignUp/SignUp';
import { SignUpProvider } from '../../state/signUp/SignUpProvider';

export interface SignUpStepProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const StepComponents = [UserNameInput, SignUp];

const SignUpStack = () => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);

  const goToNextStep = () => {
    setCurrentStepIndex(previousIndex => previousIndex++);
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex(previousIndex => previousIndex++);
  };

  const renderStep = () => {
    const StepComponent = StepComponents[currentStepIndex];
    return <StepComponent goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
  };

  return <SignUpProvider>{renderStep()}</SignUpProvider>;
};

export default SignUpStack;
