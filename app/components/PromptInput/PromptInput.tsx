import { DrawerScreenProps } from '@react-navigation/drawer';
import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Path } from '../../routing/paths';
import { promptPlaceholders } from '../../state/prompts/promptPlaceholders';
import InputCard from '../InputCard/InputCard';
import { PromptDrawerParamList, SelectedPrompt } from '../PromptsManager/PromptsManager';

interface PromptInputProps extends DrawerScreenProps<PromptDrawerParamList, Path.PromptInput> {
  addPrompt: (selectedPrompt: SelectedPrompt) => void;
}

const PromptInput = ({ route, addPrompt, navigation }: PromptInputProps) => {
  const { selectedPrompt } = route.params;

  const onSubmit = (value: string) => {
    addPrompt({ prompt: selectedPrompt.prompt, value: value.trim() });
    navigation.navigate(Path.PromptSelector);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ height: '100%' }}>
        <InputCard
          title={selectedPrompt.prompt}
          onSubmit={onSubmit}
          maxLength={100} //*
          blurOnSubmit={false}
          defaultValue={selectedPrompt.value}
          placeholder={promptPlaceholders.get(selectedPrompt.prompt)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PromptInput;
