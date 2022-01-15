import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { LastMessageSent } from '../../../../../../firebase/types';

interface MatchListRowProps {
  name: string;
  photoUri?: string;
  lastMessageSent?: LastMessageSent;
}

const MatchListRow = ({ name, photoUri, lastMessageSent }: MatchListRowProps) => {
  const { fonts, colors } = useTheme();
  const color = lastMessageSent?.isRead ? colors.text : colors.primary;

  const getClippedText = (text: string, maxSize: number) => {
    if (text.length < maxSize) {
      return text;
    }
    return `${text.substring(0, maxSize)}...`;
  };

  const getLastMessageText = () => {
    //f const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const uid = 'foo';
    const messageText = lastMessageSent?.sentBy === uid ? `You: ${lastMessageSent?.message}` : lastMessageSent?.message;
    const clippedMessageText = getClippedText(messageText ?? '', 40);
    return clippedMessageText;
  };

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
      <Avatar.Image source={{ uri: photoUri }} size={60} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontFamily: fonts.light.fontFamily, color }}>{getClippedText(name, 30)}</Text>
        <Text style={{ fontSize: 12, color }}>{getLastMessageText()}</Text>
      </View>
    </View>
  );
};

export default MatchListRow;
