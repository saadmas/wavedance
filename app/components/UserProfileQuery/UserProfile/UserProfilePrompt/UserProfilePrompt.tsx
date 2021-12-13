import * as React from 'react';
import { Card, Divider, Text, useTheme } from 'react-native-paper';

interface UserProfilePromptProps {
  promptQuestion: string;
  promptAnswer: string;
}

const UserProfilePrompt = ({ promptQuestion, promptAnswer }: UserProfilePromptProps) => {
  const { fonts } = useTheme();
  const fontFamily = fonts.thin.fontFamily;
  const marginVertical = 20;

  return (
    <>
      <Card style={{ width: '100%', marginTop: marginVertical, borderRadius: 5 }}>
        <Card.Title title={promptQuestion} titleStyle={{ padding: 5, fontSize: 13 }} titleNumberOfLines={10} />
        <Divider style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }} />
        <Card.Content>
          <Text style={{ fontSize: 25, fontFamily }}>{promptAnswer}</Text>
        </Card.Content>
      </Card>
    </>
  );
};

export default UserProfilePrompt;
