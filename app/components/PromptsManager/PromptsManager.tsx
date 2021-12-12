import * as React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import { Prompt } from '../../state/enums/prompt';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { Path } from '../../routing/paths';
import PromptList from '../PromptList/PromptList';
import PromptsSelector from '../PromptsSelector/PromptsSelector';
import PromptInput from '../PromptInput/PromptInput';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';

interface PromptsManagerProps {
  selectionType: PromptSelectionType;
  previouslyFilledPrompts?: Map<EventPrompt, string>;
  onSubmit: (filledPrompts: Map<Prompt | EventPrompt, string>) => void;
}

export interface SelectedPrompt {
  prompt: Prompt | EventPrompt;
  value: string;
}

export type PromptDrawerParamList = {
  [Path.PromptInput]: { selectedPrompt: SelectedPrompt };
  [Path.PromptSelector]: undefined;
};

const DrawerNavigator = createDrawerNavigator<PromptDrawerParamList>();

const PromptsManager = ({ onSubmit, selectionType, previouslyFilledPrompts }: PromptsManagerProps) => {
  const [filledPrompts, setFilledPrompts] = React.useState<Map<Prompt | EventPrompt, string>>(
    previouslyFilledPrompts ?? new Map()
  );

  const { colors } = useTheme();

  const onPromptsSubmit = () => {
    onSubmit(filledPrompts);
  };

  const renderDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <PromptList filledPrompts={filledPrompts} navigate={props.navigation.navigate} selectionType={selectionType} />
    );
  };

  const addPrompt = (selectedPrompt: SelectedPrompt) => {
    setFilledPrompts(prevPrompts => {
      prevPrompts.set(selectedPrompt.prompt, selectedPrompt.value);
      return new Map(prevPrompts);
    });
  };

  const deletePrompt = (prompt: Prompt | EventPrompt) => {
    setFilledPrompts(prevPrompts => {
      prevPrompts.delete(prompt);
      return new Map(prevPrompts);
    });
  };

  return (
    <DrawerNavigator.Navigator
      initialRouteName={Path.PromptSelector}
      backBehavior="initialRoute"
      drawerType="front"
      overlayColor="transparent"
      drawerStyle={{ width: '100%', backgroundColor: colors.background }}
      drawerContent={renderDrawerContent}
    >
      <DrawerNavigator.Screen name={Path.PromptSelector}>
        {({ navigation }) => (
          <PromptsSelector
            filledPrompts={filledPrompts}
            onPromptsSubmit={onPromptsSubmit}
            navigation={navigation}
            deletePrompt={deletePrompt}
            selectionType={selectionType}
          />
        )}
      </DrawerNavigator.Screen>
      <DrawerNavigator.Screen name={Path.PromptInput}>
        {props => <PromptInput addPrompt={addPrompt} {...props} />}
      </DrawerNavigator.Screen>
    </DrawerNavigator.Navigator>
  );
};
3;

export default PromptsManager;
