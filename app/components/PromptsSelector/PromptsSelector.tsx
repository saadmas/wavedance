import { DrawerNavigationProp } from '@react-navigation/drawer';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Divider, IconButton, Paragraph, Text, useTheme } from 'react-native-paper';
import { Path } from '../../routing/paths';
import { Prompt } from '../../state/enums/prompt';
import NextScreenButton from '../NextScreenButton/NextScreenButton';
import Title from '../Title/Title';
import * as Animatable from 'react-native-animatable';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { PromptDrawerParamList } from '../PromptsManager/PromptsManager';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';

interface PromptsSelectorProps {
  selectionType: PromptSelectionType;
  filledPrompts: Map<Prompt | EventPrompt, string>;
  navigation: DrawerNavigationProp<PromptDrawerParamList, Path.PromptSelector>;
  onPromptsSubmit: () => void;
  deletePrompt: (prompt: Prompt | EventPrompt) => void;
}

const PromptsSelector = ({
  filledPrompts,
  onPromptsSubmit,
  navigation,
  deletePrompt,
  selectionType,
}: PromptsSelectorProps) => {
  const { fonts } = useTheme();
  const cardActionIconSize = 20;
  const minPromptCount = selectionType == PromptSelectionType.General ? 1 : 0;
  const maxPromptCount = 3;

  const openPromptDrawer = () => {
    navigation.openDrawer();
  };

  const renderPromptCards = () => {
    const promptCards = [...filledPrompts.entries()].reverse().map(entry => {
      const [prompt, value] = entry;

      const onEdit = () => {
        navigation.navigate(Path.PromptInput, {
          selectedPrompt: { prompt, value },
        });
      };

      const onDelete = () => {
        deletePrompt(prompt);
      };

      return (
        <Animatable.View key={prompt} animation="fadeInLeft">
          <Card style={{ width: '100%', marginTop: 20, borderRadius: 5 }}>
            <Card.Title
              title={prompt}
              titleStyle={{ fontFamily: fonts.thin.fontFamily, padding: 5 }}
              titleNumberOfLines={10}
            />
            <Divider style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }} />
            <Card.Content>
              <Paragraph>{value}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="pencil-outline" size={cardActionIconSize} onPress={onEdit} />
              <IconButton icon="trash-can-outline" size={cardActionIconSize} onPress={onDelete} />
            </Card.Actions>
          </Card>
        </Animatable.View>
      );
    });
    return promptCards;
  };

  const getTitleText = () => {
    if (selectionType === PromptSelectionType.General) {
      return 'Add some flair to your profile';
    }
    return 'Share your excitement about this event';
  };

  const getDescription = () => {
    if (selectionType === PromptSelectionType.General) {
      return `Answer at least ${minPromptCount} prompt`;
    }
    return 'Answer a prompt';
  };

  return (
    <>
      <Title title={getTitleText()} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text>{getDescription()}</Text>
        <Text>
          {filledPrompts.size}/{maxPromptCount}
        </Text>
      </View>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        {filledPrompts.size < maxPromptCount && (
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
      </View>
      <ScrollView contentInset={{ bottom: 50 }} showsVerticalScrollIndicator={false}>
        {renderPromptCards()}
      </ScrollView>
      <NextScreenButton onPress={onPromptsSubmit} isDisabled={filledPrompts.size < minPromptCount} />
    </>
  );
};
3;

export default PromptsSelector;
