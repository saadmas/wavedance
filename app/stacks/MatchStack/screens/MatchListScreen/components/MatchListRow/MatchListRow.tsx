import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

interface MatchListRowProps {
  name: string;
  photoUri?: string;
  lastMessageSent?: string;
}

const MatchListRow = ({ name, photoUri, lastMessageSent }: MatchListRowProps) => {
  const { fonts } = useTheme();

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
      <Avatar.Image source={{ uri: photoUri }} size={60} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontFamily: fonts.light.fontFamily }}>{name}</Text>
        <Text style={{ fontSize: 12 }}>{lastMessageSent}</Text>
      </View>
    </View>
  );
};

export default MatchListRow;
