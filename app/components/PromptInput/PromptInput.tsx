import { DrawerScreenProps } from '@react-navigation/drawer';
import * as React from 'react';
import { Path } from '../../routing/paths';
import { PromptDrawerParamList, SelectedPrompt } from '../../stacks/SignUpStack/screens/PromptsManager/PromptsManager';
import InputCard from '../InputCard/InputCard';

interface PromptInputProps extends DrawerScreenProps<PromptDrawerParamList, Path.SignUpPromptInput> {
  addPrompt: (selectedPrompt: SelectedPrompt) => void;
}

const PromptInput = ({ route, addPrompt, navigation }: PromptInputProps) => {
  const { selectedPrompt } = route.params;

  const onSubmit = (value: string) => {
    addPrompt({ prompt: selectedPrompt.prompt, value });
    navigation.navigate(Path.SignUpPromptSelector);
  };

  return (
    <InputCard
      title={selectedPrompt.prompt}
      onSubmit={onSubmit}
      maxLength={100} ///
      defaultValue={selectedPrompt.value}
      // placeholder="e.g. Karachi, Pakistan" ///
    />
  );
};

export default PromptInput;
