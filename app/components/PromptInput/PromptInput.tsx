import { DrawerScreenProps } from '@react-navigation/drawer';
import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Path } from '../../routing/paths';
import { promptPlaceholders } from '../../state/prompts/promptPlaceholders';
import { spotifyEmbeddablePrompts } from '../../spotify/utils';
import InputCard from '../InputCard/InputCard';
import { PromptDrawerParamList, SelectedPrompt } from '../PromptsManager/PromptsManager';
import SpotifyEmbed from '../SpotifyEmbed/SpotifyEmbed';
import { defaultScreenPadding } from '../../styles/theme';
import { ScrollView } from 'react-native-gesture-handler';

interface PromptInputProps extends DrawerScreenProps<PromptDrawerParamList, Path.PromptInput> {
  addPrompt: (selectedPrompt: SelectedPrompt) => void;
}

const PromptInput = ({ route, addPrompt, navigation }: PromptInputProps) => {
  const { selectedPrompt } = route.params;

  const onSubmit = (answerText: string) => {
    addPrompt({
      prompt: selectedPrompt.prompt,
      answer: { ...selectedPrompt.answer, answer: answerText.trim() },
    });
    navigation.navigate(Path.PromptSelector);
  };

  const openSpotifySearchInput = (searchText?: string) => {
    Keyboard.dismiss();
    navigation.navigate(Path.SpotifySearch, { searchText, selectedPrompt });
  };

  const getSpotifyEmbedButtonProps = () => {
    const isPromptEmbeddable = spotifyEmbeddablePrompts.has(selectedPrompt.prompt);
    if (isPromptEmbeddable) {
      return {
        onPress: openSpotifySearchInput,
        text: 'Embed Spotify content',
        width: 200,
        icon: 'spotify',
        color: '#1DB954',
      };
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ padding: defaultScreenPadding }}>
        <InputCard
          title={selectedPrompt.prompt}
          onSubmit={onSubmit}
          maxLength={100} //*
          blurOnSubmit={false}
          defaultValue={selectedPrompt.answer.answer}
          placeholder={promptPlaceholders.get(selectedPrompt.prompt)}
          secondaryButtonProps={getSpotifyEmbedButtonProps()}
        />
        <SpotifyEmbed photoUri={selectedPrompt.answer.photoUri} contentUri={selectedPrompt.answer.spotifyUri} />
        <View style={{ paddingBottom: 100 }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PromptInput;
