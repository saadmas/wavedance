import * as React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';
import { Prompt } from '../../state/enums/prompt';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { Path } from '../../routing/paths';
import PromptList from '../PromptList/PromptList';
import PromptsSelector from '../PromptsSelector/PromptsSelector';
import PromptInput from '../PromptInput/PromptInput';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';
import SpotifySearch from '../SpotifySearch/SpotifySearch';
import { ScrollView } from 'react-native';

interface PromptsManagerProps {
  selectionType: PromptSelectionType;
  previouslyFilledPrompts?: Map<EventPrompt, PromptAnswer>;
  onSubmit: (filledPrompts: Map<Prompt | EventPrompt, PromptAnswer>) => void;
}

export interface SelectedPrompt {
  prompt: Prompt | EventPrompt;
  answer: PromptAnswer;
}

export interface PromptAnswer {
  answer: string;
  spotifyUri?: string;
  photoUri?: string;
}

export type PromptDrawerParamList = {
  [Path.PromptInput]: { selectedPrompt: SelectedPrompt };
  [Path.PromptSelector]: undefined;
  [Path.SpotifySearch]: { selectedPrompt: SelectedPrompt; searchText?: string };
};

const DrawerNavigator = createDrawerNavigator<PromptDrawerParamList>();

const PromptsManager = ({ onSubmit, selectionType, previouslyFilledPrompts }: PromptsManagerProps) => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [filledPrompts, setFilledPrompts] = React.useState<Map<Prompt | EventPrompt, PromptAnswer>>(
    previouslyFilledPrompts ?? new Map()
  );

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
      prevPrompts.set(selectedPrompt.prompt, selectedPrompt.answer);
      return new Map(prevPrompts);
    });

    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
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
      backBehavior="order"
      drawerType="front"
      drawerContent={renderDrawerContent}
      screenOptions={({ navigation }) => ({
        animation: 'slide_from_bottom',
        headerShown: selectionType === PromptSelectionType.Event,
        header: () => <IconButton icon="arrow-left" onPress={() => navigation.goBack()} style={{ height: 20 }} />,
      })}
    >
      <DrawerNavigator.Screen name={Path.PromptSelector}>
        {({ navigation }) => (
          <PromptsSelector
            filledPrompts={filledPrompts}
            onPromptsSubmit={onPromptsSubmit}
            navigation={navigation}
            deletePrompt={deletePrompt}
            selectionType={selectionType}
            scrollViewRef={scrollViewRef}
          />
        )}
      </DrawerNavigator.Screen>
      <DrawerNavigator.Screen name={Path.PromptInput}>
        {props => <PromptInput addPrompt={addPrompt} {...props} />}
      </DrawerNavigator.Screen>
      <DrawerNavigator.Screen name={Path.SpotifySearch} component={SpotifySearch} />
    </DrawerNavigator.Navigator>
  );
};
3;

export default PromptsManager;
