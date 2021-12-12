import * as React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface UserProfileHeaderProps {
  name: string;
  pronouns: string[];
}

const UserProfileHeader = ({ name, pronouns }: UserProfileHeaderProps) => {
  const { fonts } = useTheme();
  const fontFamily = fonts.thin.fontFamily;
  const color = '#fff';

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text
        style={{
          fontSize: 25,
          fontFamily,
          color,
        }}
      >
        {name}
      </Text>
      <Text style={{ fontFamily, color }}>{pronouns?.join(', ')}</Text>
    </View>
  );
};

export default UserProfileHeader;
