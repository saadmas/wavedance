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
import { defaultScreenPadding, textFontSize } from '../../styles/theme';
import PromptCard from '../PromptCard/PromptCard';

interface PromptsSelectorProps {
  selectionType: PromptSelectionType;
  filledPrompts: Map<Prompt | EventPrompt, PromptAnswer>;
  navigation: DrawerNavigationProp<PromptDrawerParamList, Path.PromptSelector>;
  scrollViewRef: React.RefObject<ScrollView>;
  onPromptsSubmit: () => void;
  deletePrompt: (prompt: Prompt | EventPrompt) => void;
}

const PromptsSelector = ({
  filledPrompts,
  onPromptsSubmit,
  navigation,
  deletePrompt,
  selectionType,
  scrollViewRef,
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

      return (
        <Animatable.View key={prompt} animation="fadeIn" duration={1000} style={{ marginBottom: 10 }}>
          <PromptCard
            question={prompt}
            answer={answer.answer}
            photoUri={answer.photoUri}
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
    <View style={{ padding: defaultScreenPadding, height: '100%' }}>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <Title title={getTitleText()} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: textFontSize }}>{renderCurrentSelectionText()}</Text>
          <NextScreenButton onPress={onPromptsSubmit} isDisabled={isDisabled} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: filledPrompts.size ? 0 : 30,
            marginBottom: 10,
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
        {renderPromptCards()}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
3;

export default PromptsSelector;
