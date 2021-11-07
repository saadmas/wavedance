import * as React from 'react';
import Title from '../Title/Title';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Divider, Text } from 'react-native-paper';
import { Prompt } from '../../state/enums/prompt';

interface PromptListProps {
  closePromptDrawer: () => void;
  filledPrompts: Map<Prompt, string>;
  selectPrompt: (prompt: Prompt) => void;
}

const PromptList = ({ closePromptDrawer, filledPrompts, selectPrompt }: PromptListProps) => {
  const renderListItems = () => {
    const listItems: JSX.Element[] = [];
    const prompts = Object.values(Prompt);

    prompts.forEach(prompt => {
      if (filledPrompts.has(prompt)) {
        return;
      }

      const onPromptSelect = () => {
        selectPrompt(prompt);
        closePromptDrawer();
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
