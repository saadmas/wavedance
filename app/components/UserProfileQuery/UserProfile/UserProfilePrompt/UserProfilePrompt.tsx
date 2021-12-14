import * as React from 'react';
import { Card, Divider, Text, useTheme } from 'react-native-paper';
import { PromptAnswer } from '../../../PromptsManager/PromptsManager';
import SpotifyEmbed from '../../../SpotifyEmbed/SpotifyEmbed';

interface UserProfilePromptProps {
  promptQuestion: string;
  promptAnswer: PromptAnswer;
}

const UserProfilePrompt = ({ promptQuestion, promptAnswer }: UserProfilePromptProps) => {
  const { answer, spotifyUri } = promptAnswer;
  const { fonts } = useTheme();
  const fontFamily = fonts.thin.fontFamily;
  const marginVertical = 20;

  return (
    <>
      <Card style={{ width: '100%', marginTop: marginVertical, borderRadius: 5 }}>
        <Card.Title title={promptQuestion} titleStyle={{ padding: 5, fontSize: 13 }} titleNumberOfLines={10} />
        <Divider style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }} />
        <Card.Content>
          <Text style={{ fontSize: 25, fontFamily }}>{answer}</Text>
        </Card.Content>
      </Card>
      <SpotifyEmbed uri={spotifyUri} />
    </>
  );
};

export default UserProfilePrompt;
