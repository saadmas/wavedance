import * as React from 'react';
import { View } from 'react-native';
import PromptCard from '../../../PromptCard/PromptCard';
import { PromptAnswer } from '../../../PromptsManager/PromptsManager';

interface UserProfilePromptProps {
  promptQuestion: string;
  promptAnswer: PromptAnswer;
}

const UserProfilePrompt = ({ promptQuestion, promptAnswer }: UserProfilePromptProps) => {
  const { answer, spotifyUri, photoUri } = promptAnswer;

  return (
    <View style={{ marginVertical: 20 }}>
      <PromptCard question={promptQuestion} answer={answer} spotifyUri={spotifyUri} photoUri={photoUri} />
    </View>
  );
};

export default UserProfilePrompt;
