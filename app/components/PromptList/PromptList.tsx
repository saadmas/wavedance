import * as React from 'react';
import Title from '../Title/Title';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Divider, Text } from 'react-native-paper';
import { Prompt } from '../../state/enums/prompt';
import { Path } from '../../routing/paths';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';
import { EventPrompt } from '../../state/enums/eventPrompt';

interface PromptListProps {
  selectionType: PromptSelectionType;
  filledPrompts: Map<Prompt | EventPrompt, string>;
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
          selectedPrompt: { prompt, value: '' },
        });
      };

      listItems.push(
        <React.Fragment key={prompt}>
          <Text onPress={onPromptSelect} style={{ padding: 20 }}>
            {prompt}
          </Text>
          <Divider style={{ width: '95%' }} />
        </React.Fragment>
      );
    });

    return listItems;
  };

  return (
    <>
      <Title title="Select a prompt" />
      <DrawerContentScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {renderListItems()}
      </DrawerContentScrollView>
    </>
  );
};

export default PromptList;
