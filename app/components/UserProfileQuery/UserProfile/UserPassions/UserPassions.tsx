import * as React from 'react';
import { View } from 'react-native-animatable';
import { Text, useTheme } from 'react-native-paper';
import { Passion } from '../../../../state/enums/passion';

interface UserPassionsProps {
  passions: string[];
}

const UserPassions = ({ passions }: UserPassionsProps) => {
  const { colors } = useTheme();

  const renderPassions = () => {
    /// passions
    const passionPills = Object.values(Passion).map(passion => (
      <View
        //* put in common stylesheet
        style={{
          minWidth: 80,
          borderRadius: 40,
          borderColor: colors.text,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 5,
          justifyContent: 'center',
          marginRight: 8,
          marginTop: 10,
        }}
      >
        <Text>{passion}</Text>
      </View>
    ));
    return passionPills;
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {/* //* put in common style */}
      <Text style={{ fontSize: 18, marginBottom: 10 }}>My Passions</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{renderPassions()}</View>
    </View>
  );
};

export default UserPassions;
