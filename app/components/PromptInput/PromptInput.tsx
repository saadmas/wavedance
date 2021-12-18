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
import Dialog from '../Dialog/Dialog';

interface PromptInputProps extends DrawerScreenProps<PromptDrawerParamList, Path.PromptInput> {
  addPrompt: (selectedPrompt: SelectedPrompt) => void;
}

const PromptInput = ({ route, addPrompt, navigation }: PromptInputProps) => {
  const { selectedPrompt } = route.params;
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = React.useState<boolean>(false);

  const isPromptEmbeddable = spotifyEmbeddablePrompts.has(selectedPrompt.prompt);

  const openSubmitConfirmDialog = () => {
    setIsSubmitDialogOpen(true);
  };

  const closeSubmitConfirmDialog = () => {
    setIsSubmitDialogOpen(false);
  };

  const goToPromptSelector = () => {
    setIsSubmitDialogOpen(false);

    navigation.navigate(Path.PromptSelector);
  };

  const onSubmit = (answerText: string) => {
    Keyboard.dismiss();

    addPrompt({
      prompt: selectedPrompt.prompt,
      answer: { ...selectedPrompt.answer, answer: answerText.trim() },
    });

    if (isPromptEmbeddable && !selectedPrompt.answer.spotifyUri) {
      openSubmitConfirmDialog();
      return;
    }

    goToPromptSelector();
  };

  const openSpotifySearchInput = (searchText?: string) => {
    Keyboard.dismiss();
    navigation.navigate(Path.SpotifySearch, { searchText, selectedPrompt });
  };

  const getSpotifyEmbedButtonProps = () => {
    if (isPromptEmbeddable) {
      return {
        onPress: openSpotifySearchInput,
        text: selectedPrompt.answer.spotifyUri ? 'Change Image' : 'Add Image',
        width: 140,
        icon: 'spotify',
        color: '#1DB954',
      };
    }
  };

  return (
    <>
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
      <Dialog
        isVisible={isSubmitDialogOpen}
        title="Are you sure you want to continue without adding an image?"
        primaryButtonText="Continue"
        description="Adding an image results in a richer profile, leading to more matches"
        onPrimaryAction={goToPromptSelector}
        onDismiss={closeSubmitConfirmDialog}
      />
    </>
  );
};

export default PromptInput;
