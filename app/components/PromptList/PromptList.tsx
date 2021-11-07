import * as React from 'react';
import Title from '../Title/Title';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Divider, Text } from 'react-native-paper';
import { Prompt } from '../../state/enums/prompt';
import { Path } from '../../routing/paths';

interface PromptListProps {
  filledPrompts: Map<Prompt, string>;
  navigate: (path: Path, params: object) => void;
}

const PromptList = ({ filledPrompts, navigate }: PromptListProps) => {
  const renderListItems = () => {
    const listItems: JSX.Element[] = [];

    Object.values(Prompt).forEach(prompt => {
      if (filledPrompts.has(prompt)) {
        return;
      }

      const onPromptSelect = () => {
        navigate(Path.SignUpPromptInput, {
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
