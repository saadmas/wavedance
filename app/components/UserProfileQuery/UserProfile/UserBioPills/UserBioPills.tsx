import * as React from 'react';
import { View } from 'react-native-animatable';
import { Text, useTheme } from 'react-native-paper';

interface UserBioPillsProps {
  pillTexts: string[];
  titleText: string;
}

const UserBioPills = ({ pillTexts, titleText }: UserBioPillsProps) => {
  const { colors } = useTheme();

  const renderPills = () => {
    const pills = pillTexts.map(pillText => (
      <View
        key={pillText}
        //* put in common stylesheet
        style={{
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
        <Text style={{ fontSize: 12 }}>{pillText}</Text>
      </View>
    ));
    return pills;
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {/* //* put in common style */}
      <Text style={{ fontSize: 18 }}>{titleText}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{renderPills()}</View>
    </View>
  );
};

export default UserBioPills;
