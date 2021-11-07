import * as React from 'react';
import { SelectedPrompt } from '../../stacks/SignUpStack/screens/PromptsManager/PromptsManager';
import InputCard from '../InputCard/InputCard';

interface PromptInputProps {
  selectedPrompt: SelectedPrompt;
}

const PromptInput = ({ selectedPrompt }: PromptInputProps) => {
  const onPromptEnter = () => {};

  return (
    <InputCard
      title={selectedPrompt.prompt}
      onSubmit={onPromptEnter}
      maxLength={50} ///
      defaultValue={selectedPrompt.value}
      // placeholder="e.g. Karachi, Pakistan" ///
    />
  );
};

export default PromptInput;
