import * as React from 'react';
import UserNameInput from './screens/UserNameInput/UserNameInput';
import SignUp from '../AuthStack/screens/SignUp/SignUp';
import { SignUpProvider } from '../../state/signUp/SignUpProvider';
import { IconButton, ProgressBar, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import BirthdayInput from './screens/BirthdayInput/BirthdayInput';
import { defaultScreenPadding } from '../../styles/theme';
import HometownInput from './screens/HometownInput/HometownInput';
import CurrentLocationInput from './screens/CurrentLocationInput/CurrentLocationInput';
import OccupationInput from './screens/OccupationInput/OccupationInput';
import PassionsInput from './screens/PassionsInput/PassionsInput';

export interface SignUpStepProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const StepComponents = [
  UserNameInput,
  BirthdayInput,
  HometownInput,
  CurrentLocationInput,
  OccupationInput,
  PassionsInput,
  SignUp,
];

const stepIcons = [
  'rename-box',
  'cake-variant',
  'home-circle',
  'map-marker',
  'briefcase-outline',
  'heart-outline',
  'lock-outline',
];

const SignUpStack = () => {
  const { colors } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(5); ///

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
