import * as React from 'react';
import { Card, Divider, IconButton, Text, useTheme } from 'react-native-paper';
import SpotifyEmbed from '../SpotifyEmbed/SpotifyEmbed';

interface PromptCardActionHandlers {
  onEdit: () => void;
  onDelete: () => void;
}

interface PromptCardProps {
  question: string;
  answer: string;
  spotifyUri?: string;
  cardActionHandlers?: PromptCardActionHandlers;
}

const PromptCard = ({ question, answer, spotifyUri, cardActionHandlers }: PromptCardProps) => {
  const { fonts } = useTheme();
  const fontFamily = fonts.thin.fontFamily;
  const cardActionIconSize = 15;

  const renderCardActions = () => {
    if (!cardActionHandlers) {
      return;
    }

    const { onEdit, onDelete } = cardActionHandlers;

    return (
      <Card.Actions>
        <IconButton icon="pencil-outline" size={cardActionIconSize} onPress={onEdit} />
        <IconButton icon="trash-can-outline" size={cardActionIconSize} onPress={onDelete} />
      </Card.Actions>
    );
  };

  return (
    <>
      <Card style={{ width: '100%', borderRadius: 5, paddingBottom: 10 }}>
        <Card.Title title={question} titleStyle={{ fontSize: 10 }} titleNumberOfLines={10} />
        <Card.Content>
          <Text style={{ fontSize: 25, fontFamily }}>{answer}</Text>
        </Card.Content>
        {renderCardActions()}
      </Card>
      {/* <SpotifyEmbed uri={spotifyUri} /> */}
    </>
  );
};

export default PromptCard;
