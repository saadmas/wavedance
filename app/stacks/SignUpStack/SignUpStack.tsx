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
import PhotoInput from './screens/PhotoInput/PhotoInput';
import GenresInput from './screens/GenresInput/GenresInput';
import InstagramHandleInputInput from './screens/InstagramHandleInput/InstagramHandleInput';
import PromptsManager from './screens/PromptsManager/PromptsManager';

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
  GenresInput,
  PassionsInput,
  PromptsManager,
  InstagramHandleInputInput,
  PhotoInput,
  SignUp,
];

const stepIcons = [
  'rename-box',
  'cake-variant',
  'home-circle',
  'map-marker',
  'briefcase-outline',
  'music-circle',
  'heart-outline',
  'thought-bubble',
  'instagram',
  'camera',
  'lock-outline',
];

const SignUpStack = () => {
  const { colors } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(7); ///

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
