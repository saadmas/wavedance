import { DrawerNavigationProp } from '@react-navigation/drawer';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Path } from '../../routing/paths';
import { Prompt } from '../../state/enums/prompt';
import NextScreenButton from '../NextScreenButton/NextScreenButton';
import Title from '../Title/Title';
import * as Animatable from 'react-native-animatable';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { PromptAnswer, PromptDrawerParamList } from '../PromptsManager/PromptsManager';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';
import { textFontSize } from '../../styles/theme';
import PromptCard from '../PromptCard/PromptCard';

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

      /// marginTop: 20
      return (
        <Animatable.View key={prompt} animation="fadeInLeft" style={{ marginTop: 10 }}>
          <PromptCard
            question={prompt}
            answer={answer.answer}
            spotifyUri={answer.spotifyUri}
            cardActionHandlers={{ onEdit, onDelete }}
          />
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
