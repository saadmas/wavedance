import * as React from 'react';
import { View } from 'react-native-animatable';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { getAge } from '../../../../utils/prompts/date.util';

interface UserBioProps {
  birthday: string;
  hometown: string;
  currentLocation: string;
  instagramHandle?: string;
  occupation?: string;
}

const UserBio = ({ birthday, hometown, currentLocation, instagramHandle, occupation }: UserBioProps) => {
  const { colors } = useTheme();

  const renderBioPill = (emoji: string, text?: string, isIcon?: boolean) => {
    if (!text) {
      return;
    }

    const emojiDisplay = isIcon ? (
      <IconButton icon={emoji} size={15} style={{ margin: 0 }} />
    ) : (
      <Text style={{ marginRight: 2 }}>{emoji}</Text>
    );

    return (
      <View
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
        {emojiDisplay}
        <Text>{text}</Text>
      </View>
    );
  };

  const renderBio = () => {
    return (
      <>
        {renderBioPill('🎂', getAge(birthday).toString())}
        {renderBioPill('🏠', hometown)}
        {renderBioPill('📍', currentLocation)}
        {renderBioPill('💼', occupation)}
        {renderBioPill('instagram', instagramHandle, true)}
      </>
    );
  };

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>About Me</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{renderBio()}</View>
    </View>
  );
};

export default UserBio;
