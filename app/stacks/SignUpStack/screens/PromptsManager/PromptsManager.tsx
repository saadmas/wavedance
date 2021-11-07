import * as React from 'react';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import { Prompt } from '../../../../state/enums/prompt';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PromptsSelector from '../../../../components/PromptsSelector/PromptsSelector';
import PromptList from '../../../../components/PromptList/PromptList';

interface PromptsManagerProps extends SignUpStepProps {}

const DrawerNavigator = createDrawerNavigator();

const PromptsManager = ({ goToNextStep }: PromptsManagerProps) => {
  const [filledPrompts, setFilledPrompts] = React.useState<Map<Prompt, string>>(new Map());
  const [selectedPrompt, setSelectedPrompt] = React.useState<Prompt | undefined>(undefined);
  const dispatch = useSignUpDispatch();

  const onPromptsSubmit = () => {
    // dispatch({ type: 'BIRTHDAY_UPDATE', payload: birthday.toISOString() });
    goToNextStep();
  };

  return (
    <DrawerNavigator.Navigator
      backBehavior="initialRoute"
      drawerType="front"
      overlayColor="transparent"
      drawerStyle={{ width: '100%' }}
      /// TS
      drawerContent={props => (
        <PromptList
          closePromptDrawer={() => props.navigation.closeDrawer()}
          filledPrompts={filledPrompts}
          selectPrompt={setSelectedPrompt}
        />
      )}
    >
      <DrawerNavigator.Screen name="SignUpPrompts">
        {props => (
          <PromptsSelector
            {...props}
            filledPrompts={filledPrompts}
            onPromptsSubmit={onPromptsSubmit}
            openPromptDrawer={() => props.navigation.openDrawer()}
          />
        )}
      </DrawerNavigator.Screen>
    </DrawerNavigator.Navigator>
  );
};
3;

export default PromptsManager;
