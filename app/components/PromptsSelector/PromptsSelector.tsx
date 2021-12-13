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
import { PromptAnswer, PromptDrawerParamList } from '../PromptsManager/PromptsManager';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';
import { textFontSize } from '../../styles/theme';

interface PromptsSelectorProps {
  selectionType: PromptSelectionType;
  filledPrompts: Map<Prompt | EventPrompt, PromptAnswer>;
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
  const cardActionIconSize = 15;
  const minPromptCount = selectionType == PromptSelectionType.General ? 1 : 0;
  const maxPromptCount = 3;
  const isDisabled = filledPrompts.size < minPromptCount;

  const openPromptDrawer = () => {
    navigation.openDrawer();
  };

  const renderPromptCards = () => {
    const promptCards = [...filledPrompts.entries()].reverse().map(entry => {
      const [prompt, answer] = entry;

      const onEdit = () => {
        navigation.navigate(Path.PromptInput, {
          selectedPrompt: { prompt, answer },
        });
      };

      const onDelete = () => {
        deletePrompt(prompt);
      };

      return (
        <Animatable.View key={prompt} animation="fadeInLeft">
          <Card style={{ width: '100%', marginTop: 20, borderRadius: 5 }}>
            <Card.Title title={prompt} titleStyle={{ padding: 5, fontSize: 13 }} titleNumberOfLines={10} />
            <Divider style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }} />
            <Card.Content>
              <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 25 }}>{answer.answer}</Text>
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

  const renderCurrentSelectionText = () => {
    if (minPromptCount && isDisabled) {
      return getDescription();
    }
    return `${filledPrompts.size}/${maxPromptCount}`;
  };

  return (
    <>
      <Title title={getTitleText()} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: textFontSize }}>{renderCurrentSelectionText()}</Text>
        <NextScreenButton onPress={onPromptsSubmit} isDisabled={isDisabled} />
      </View>
      <ScrollView contentInset={{ bottom: 100 }} showsVerticalScrollIndicator={false}>
        {renderPromptCards()}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          {filledPrompts.size < maxPromptCount && (
            <Button
              icon="plus"
              mode="outlined"
              onPress={openPromptDrawer}
              theme={{ colors: { primary: '#fff' } }}
              labelStyle={{ fontSize: 10 }}
              style={{ width: 150, borderRadius: 20 }}
            >
              Add prompt
            </Button>
          )}
        </View>
      </ScrollView>
    </>
  );
};
3;

export default PromptsSelector;
