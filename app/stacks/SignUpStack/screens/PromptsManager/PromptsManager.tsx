import * as React from 'react';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import { Prompt } from '../../../../state/enums/prompt';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import PromptsSelector from '../../../../components/PromptsSelector/PromptsSelector';
import PromptList from '../../../../components/PromptList/PromptList';
import { Path } from '../../../../routing/paths';
import { Text } from 'react-native-paper';

interface PromptsManagerProps extends SignUpStepProps {}

export interface SelectedPrompt {
  prompt: Prompt;
  value: string;
}

export type PromptDrawerParamList = {
  [Path.SignUpPromptInput]: { selectedPrompt: SelectedPrompt };
  [Path.SignUpPromptSelector]: undefined;
};

const DrawerNavigator = createDrawerNavigator();

const PromptsManager = ({ goToNextStep }: PromptsManagerProps) => {
  const [filledPrompts, setFilledPrompts] = React.useState<Map<Prompt, string>>(new Map());
  const dispatch = useSignUpDispatch();

  const onPromptsSubmit = () => {
    // dispatch({ type: 'BIRTHDAY_UPDATE', payload: birthday.toISOString() });
    goToNextStep();
  };

  const renderDrawerContent = (props: DrawerContentComponentProps) => {
    return <PromptList filledPrompts={filledPrompts} navigate={props.navigation.navigate} />;
  };

  return (
    <DrawerNavigator.Navigator
      initialRouteName={Path.SignUpPromptSelector}
      backBehavior="initialRoute"
      drawerType="front"
      overlayColor="transparent"
      drawerStyle={{ width: '100%' }}
      drawerContent={renderDrawerContent}
    >
      <DrawerNavigator.Screen name={Path.SignUpPromptSelector}>
        {({ navigation }) => (
          <PromptsSelector filledPrompts={filledPrompts} onPromptsSubmit={onPromptsSubmit} navigation={navigation} />
        )}
      </DrawerNavigator.Screen>
      <DrawerNavigator.Screen name={Path.SignUpPromptInput}>{props => <Text>FOO</Text>}</DrawerNavigator.Screen>
    </DrawerNavigator.Navigator>
  );
};
3;

export default PromptsManager;
