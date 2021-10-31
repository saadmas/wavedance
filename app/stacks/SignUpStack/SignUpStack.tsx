import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Path } from '../../routing/paths';
import { IconButton } from 'react-native-paper';
import SignUpWizard from '../../components/SignUpWizard/SignUpWizard';
import UserNameInput from './screens/UserNameInput/UserNameInput';
import { navigate } from '../../routing/rootNavigation';

const Stack = createNativeStackNavigator();

export type SignUpStackParamList = {
  [Path.SignUp]: undefined;
  [Path.EnterName]: undefined;
};

const wizardSteps = [Path.EnterName, Path.SignUp];

const SignUpStack = () => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const nextStep = wizardSteps[currentStepIndex];
    navigate(nextStep);
  }, [currentStepIndex]);

  const goToNextStep = () => {
    setCurrentStepIndex(previousIndex => previousIndex++);
  };

  return (
    <>
      <Stack.Navigator
        initialRouteName={Path.EnterName}
        screenOptions={({ navigation }) => ({
          animation: 'slide_from_bottom',
          headerTransparent: true,
          headerTitle: '',
          headerLeft: ({ canGoBack }) =>
            canGoBack && <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />,
        })}
      >
        <Stack.Screen name={Path.EnterName} component={UserNameInput} />
      </Stack.Navigator>
      {/* <SignUpWizard /> /// DELETE */}
    </>
  );
};

export default SignUpStack;
