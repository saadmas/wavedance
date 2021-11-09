import { DrawerNavigationProp } from '@react-navigation/drawer';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Divider, IconButton, Paragraph, Text, useTheme } from 'react-native-paper';
import { Path } from '../../routing/paths';
import { PromptDrawerParamList } from '../../stacks/SignUpStack/screens/PromptsManager/PromptsManager';
import { Prompt } from '../../state/enums/prompt';
import NextScreenButton from '../NextScreenButton/NextScreenButton';
import Title from '../Title/Title';

interface PromptsSelectorProps {
  filledPrompts: Map<Prompt, string>;
  navigation: DrawerNavigationProp<PromptDrawerParamList, Path.SignUpPromptSelector>;
  onPromptsSubmit: () => void;
  deletePrompt: (prompt: Prompt) => void;
}

const PromptsSelector = ({ filledPrompts, onPromptsSubmit, navigation, deletePrompt }: PromptsSelectorProps) => {
  const { fonts } = useTheme();
  const cardActionIconSize = 20;

  const openPromptDrawer = () => {
    navigation.openDrawer();
  };

  const renderPromptCards = () => {
    const promptCards = [...filledPrompts.entries()].reverse().map(entry => {
      const [prompt, value] = entry;

      const onEdit = () => {
        navigation.navigate(Path.SignUpPromptInput, {
          selectedPrompt: { prompt, value },
        });
      };

      const onDelete = () => {
        deletePrompt(prompt);
      };

      return (
        <Card style={{ width: '100%', marginTop: 20, borderRadius: 5 }} key={prompt}>
          <Card.Title title={prompt} titleStyle={{ fontFamily: fonts.thin.fontFamily }} />
          <Divider style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }} />
          <Card.Content>
            <Paragraph>{value}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <IconButton icon="pencil-outline" size={cardActionIconSize} onPress={onEdit} />
            <IconButton icon="trash-can-outline" size={cardActionIconSize} onPress={onDelete} />
          </Card.Actions>
        </Card>
      );
    });
    return promptCards;
  };

  return (
    <>
      <Title title="Let's get to know you" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text>Answer 3 prompts</Text>
        <Text>{filledPrompts.size}/3</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {filledPrompts.size < 3 && (
          <Button
            icon="plus"
            mode="outlined"
            onPress={openPromptDrawer}
            theme={{ colors: { primary: '#fff' } }}
            labelStyle={{ fontSize: 10 }}
            style={{ width: '50%', marginTop: filledPrompts.size ? 10 : 100 }}
          >
            Add prompt
          </Button>
        )}
        {renderPromptCards()}
      </ScrollView>
      <NextScreenButton onPress={onPromptsSubmit} isDisabled={filledPrompts.size < 3} />
    </>
  );
};
3;

export default PromptsSelector;
