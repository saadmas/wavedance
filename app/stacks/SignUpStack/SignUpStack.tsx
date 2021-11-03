import * as React from 'react';
import UserNameInput from './screens/UserNameInput/UserNameInput';
import SignUp from '../AuthStack/screens/SignUp/SignUp';
import { SignUpProvider } from '../../state/signUp/SignUpProvider';
import { IconButton, ProgressBar, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import BirthdayInput from './screens/BirthdayInput/BirthdayInput';
import { defaultScreenPadding } from '../../styles/theme';

export interface SignUpStepProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const StepComponents = [UserNameInput, BirthdayInput, SignUp];

const stepIcons = ['rename-box', 'cake-variant', 'login-variant'];

const SignUpStack = () => {
  const { colors } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);

  const goToNextStep = () => {
    setCurrentStepIndex(previousIndex => ++previousIndex);
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex(previousIndex => --previousIndex);
  };

  const renderStep = () => {
    const StepComponent = StepComponents[currentStepIndex];
    return (
      <View style={{ padding: defaultScreenPadding, height: '100%' }}>
        <StepComponent goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
      </View>
    );
  };

  const getProgress = (): number => (currentStepIndex + 1) / StepComponents.length;

  return (
    <SignUpProvider>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton size={40} icon={stepIcons[currentStepIndex]} />
      </View>
      <ProgressBar progress={getProgress()} color={colors.text} />
      {renderStep()}
    </SignUpProvider>
  );
};

export default SignUpStack;
