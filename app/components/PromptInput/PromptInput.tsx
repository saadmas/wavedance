import { DrawerScreenProps } from '@react-navigation/drawer';
import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Path } from '../../routing/paths';
import { promptPlaceholders } from '../../state/prompts/promptPlaceholders';
import { spotifyEmbeddablePrompts } from '../../spotify/utils';
import InputCard from '../InputCard/InputCard';
import { PromptDrawerParamList, SelectedPrompt } from '../PromptsManager/PromptsManager';

interface PromptInputProps extends DrawerScreenProps<PromptDrawerParamList, Path.PromptInput> {
  addPrompt: (selectedPrompt: SelectedPrompt) => void;
}

const PromptInput = ({ route, addPrompt, navigation }: PromptInputProps) => {
  const { selectedPrompt } = route.params;

  const onSubmit = (answer: string) => {
    addPrompt({ prompt: selectedPrompt.prompt, answer: { answer: answer.trim() } });
    navigation.navigate(Path.PromptSelector);
  };

  const openSpotifySearchInput = (searchText?: string) => {
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
      <View style={{ height: '100%' }}>
        <InputCard
          title={selectedPrompt.prompt}
          onSubmit={onSubmit}
          maxLength={100} //*
          blurOnSubmit={false}
          defaultValue={selectedPrompt.answer.answer}
          placeholder={promptPlaceholders.get(selectedPrompt.prompt)}
          secondaryButtonProps={getSpotifyEmbedButtonProps()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PromptInput;
