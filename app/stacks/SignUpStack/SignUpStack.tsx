import * as React from 'react';
import UserNameInput from './screens/UserNameInput/UserNameInput';
import SignUp from '../AuthStack/screens/SignUp/SignUp';
import { SignUpProvider } from '../../state/signUp/SignUpProvider';
import { IconButton, ProgressBar, useTheme } from 'react-native-paper';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import BirthdayInput from './screens/BirthdayInput/BirthdayInput';
import { defaultScreenPadding } from '../../styles/theme';
import HometownInput from './screens/HometownInput/HometownInput';
import CurrentLocationInput from './screens/CurrentLocationInput/CurrentLocationInput';
import OccupationInput from './screens/OccupationInput/OccupationInput';
import PassionsInput from './screens/PassionsInput/PassionsInput';
import PhotoInput from './screens/PhotoInput/PhotoInput';
import GenresInput from './screens/GenresInput/GenresInput';
import InstagramHandleInputInput from './screens/InstagramHandleInput/InstagramHandleInput';
import SignupPromptsManager from './screens/SignupPromptsManager/SignupPromptsManager';
import PronounsInput from './screens/PronounsInput/PronounsInput';

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
  PronounsInput,
  GenresInput,
  PassionsInput,
  SignupPromptsManager,
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
  'account-circle-outline',
  'music-circle',
  'heart-outline',
  'thought-bubble',
  'instagram',
  'camera',
  'lock-outline',
];

const SignUpStack = () => {
  const { colors } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(10);

  const goToNextStep = () => {
    setCurrentStepIndex(previousIndex => ++previousIndex);
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex(previousIndex => --previousIndex);
  };

  const renderStep = () => {
    const StepComponent = StepComponents[currentStepIndex];
    return (
      <View style={{ margin: defaultScreenPadding, height: '100%' }}>
        <StepComponent goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
      </View>
    );
  };

  const getProgress = (): number => (currentStepIndex + 1) / StepComponents.length;

  return (
    <SignUpProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton size={40} icon={stepIcons[currentStepIndex]} />
        </View>
      </TouchableWithoutFeedback>
      <ProgressBar progress={getProgress()} color={colors.text} />
      {renderStep()}
    </SignUpProvider>
  );
};

export default SignUpStack;
