import { DrawerScreenProps } from '@react-navigation/drawer';
import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
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

  console.log(selectedPrompt.value); ///

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ height: '100%' }}>
        <InputCard
          title={selectedPrompt.prompt}
          onSubmit={onSubmit}
          maxLength={100} ///
          blurOnSubmit={false}
          // defaultValue={selectedPrompt.value}
          // placeholder="e.g.Lane 8" ///
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PromptInput;
