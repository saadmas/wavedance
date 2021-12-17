import * as React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Divider, Text } from 'react-native-paper';
import { Prompt } from '../../state/enums/prompt';
import { Path } from '../../routing/paths';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { textFontSize } from '../../styles/theme';
import { PromptAnswer } from '../PromptsManager/PromptsManager';

interface PromptListProps {
  selectionType: PromptSelectionType;
  filledPrompts: Map<Prompt | EventPrompt, PromptAnswer>;
  navigate: (path: Path, params: object) => void;
}

const PromptList = ({ filledPrompts, navigate, selectionType }: PromptListProps) => {
  const renderListItems = () => {
    const listItems: JSX.Element[] = [];
    const promptValues =
      selectionType === PromptSelectionType.General ? Object.values(Prompt) : Object.values(EventPrompt);

    promptValues.forEach((prompt: Prompt | EventPrompt) => {
      if (filledPrompts.has(prompt)) {
        return;
      }

      const onPromptSelect = () => {
        navigate(Path.PromptInput, {
          selectedPrompt: { prompt, answer: { answer: '' } },
        });
      };

      listItems.push(
        <React.Fragment key={prompt}>
          <Text onPress={onPromptSelect} style={{ padding: 15, fontSize: textFontSize + 2 }}>
            {prompt}
          </Text>
          <Divider />
        </React.Fragment>
      );
    });

    return listItems;
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}>
      {renderListItems()}
    </DrawerContentScrollView>
  );
};

export default PromptList;
