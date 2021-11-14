import * as React from 'react';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import { Prompt } from '../../../../state/enums/prompt';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import PromptsSelector from '../../../../components/PromptsSelector/PromptsSelector';
import PromptList from '../../../../components/PromptList/PromptList';
import { Path } from '../../../../routing/paths';
import PromptInput from '../../../../components/PromptInput/PromptInput';
import { useTheme } from 'react-native-paper';

interface PromptsManagerProps extends SignUpStepProps {}

export interface SelectedPrompt {
  prompt: Prompt;
  value: string;
}

export type PromptDrawerParamList = {
  [Path.SignUpPromptInput]: { selectedPrompt: SelectedPrompt };
  [Path.SignUpPromptSelector]: undefined;
};

const DrawerNavigator = createDrawerNavigator<PromptDrawerParamList>();

const PromptsManager = ({ goToNextStep }: PromptsManagerProps) => {
  const [filledPrompts, setFilledPrompts] = React.useState<Map<Prompt, string>>(new Map());
  const dispatch = useSignUpDispatch();
  const { colors } = useTheme();

  const onPromptsSubmit = () => {
    dispatch({ type: 'PROMPT_UPDATE', payload: filledPrompts });
    goToNextStep();
  };

  const renderDrawerContent = (props: DrawerContentComponentProps) => {
    return <PromptList filledPrompts={filledPrompts} navigate={props.navigation.navigate} />;
  };

  const addPrompt = (selectedPrompt: SelectedPrompt) => {
    setFilledPrompts(prevPrompts => {
      prevPrompts.set(selectedPrompt.prompt, selectedPrompt.value);
      return new Map(prevPrompts);
    });
  };

  const deletePrompt = (prompt: Prompt) => {
    setFilledPrompts(prevPrompts => {
      prevPrompts.delete(prompt);
      return new Map(prevPrompts);
    });
  };

  return (
    <DrawerNavigator.Navigator
      initialRouteName={Path.SignUpPromptSelector}
      backBehavior="initialRoute"
      drawerType="front"
      overlayColor="transparent"
      drawerStyle={{ width: '100%', backgroundColor: colors.background }}
      drawerContent={renderDrawerContent}
    >
      <DrawerNavigator.Screen name={Path.SignUpPromptSelector}>
        {({ navigation }) => (
          <PromptsSelector
            filledPrompts={filledPrompts}
            onPromptsSubmit={onPromptsSubmit}
            navigation={navigation}
            deletePrompt={deletePrompt}
          />
        )}
      </DrawerNavigator.Screen>
      <DrawerNavigator.Screen name={Path.SignUpPromptInput}>
        {props => <PromptInput addPrompt={addPrompt} {...props} />}
      </DrawerNavigator.Screen>
    </DrawerNavigator.Navigator>
  );
};
3;

export default PromptsManager;
