import * as React from 'react';
import { Image, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';

interface EventActionsProps {
  eventId: number;
  isFavorite?: boolean; /// handle
  spotifyArtistId?: number; /// only render spotify btn if this prop is there
}

const EventActions = ({ eventId, spotifyArtistId, isFavorite }: EventActionsProps) => {
  const { colors } = useTheme();
  const baseSize = 40;
  const spotifySize = baseSize - 10;
  const favoriteSize = baseSize + 5;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
        top: 5,
        left: 10,
      }}
    >
      <IconButton
        icon={require('../../../../../../../assets/icons/spotify-icon.png')}
        size={spotifySize}
        color="#1DB954"
        onPress={() => {}}
      />
      <View>
        <Image
          source={require('../../../../../../../assets/icons/edm-train-icon.png')}
          style={{ height: baseSize, width: baseSize, borderRadius: 1000 }}
        />
      </View>
      <LottieAnimation
        source={require(`'../../../../../../../assets/animations/heart-favorite.json`)}
        finalFramePosition={1}
        shouldLoop={false}
        style={{
          width: favoriteSize,
          height: favoriteSize,
        }}
      />
    </View>
  );
};

export default EventActions;
