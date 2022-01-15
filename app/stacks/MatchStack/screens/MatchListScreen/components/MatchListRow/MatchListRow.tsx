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

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
      <Avatar.Image source={{ uri: photoUri }} size={60} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontFamily: fonts.light.fontFamily, color }}>{name}</Text>
        <Text style={{ fontSize: 12, color }}>{lastMessageSent?.message}</Text>
      </View>
    </View>
  );
};

export default MatchListRow;
