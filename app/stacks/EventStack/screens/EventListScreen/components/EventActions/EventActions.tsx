import * as React from 'react';
import { Image, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import * as WebBrowser from 'expo-web-browser';

interface EventActionsProps {
  eventLink: string;
  isFavorite?: boolean; /// handle
  spotifyArtistId?: string; /// only render spotify btn if this prop is there
}

const EventActions = ({ eventLink, spotifyArtistId, isFavorite }: EventActionsProps) => {
  const baseSize = 40;
  const spotifySize = baseSize - 10;
  const favoriteSize = baseSize + 5;
  const rippleColor = 'grey';

  const openEdmTrainEventWebpage = () => {
    WebBrowser.openBrowserAsync(eventLink);
  };

  const openSpotifyArtistWebpage = () => {
    WebBrowser.openBrowserAsync(`https://open.spotify.com/artist/${spotifyArtistId}`);
  };

  const renderSpotifyAction = () => {
    if (spotifyArtistId) {
      return (
        <IconButton
          icon={require('../../../../../../../assets/icons/spotify-icon.png')}
          size={spotifySize}
          color="#1DB954"
          onPress={openSpotifyArtistWebpage}
        />
      );
    }
  };

  const renderEdmTrainAction = () => {
    if (eventLink) {
      return (
        <TouchableRipple onPress={openEdmTrainEventWebpage}>
          <Image
            source={require('../../../../../../../assets/icons/edm-train-icon.png')}
            style={{ height: baseSize, width: baseSize, borderRadius: 1000 }}
          />
        </TouchableRipple>
      );
    }
  };

  const renderFavoriteAction = () => {
    return (
      <LottieAnimation
        source={require(`'../../../../../../../assets/animations/heart-favorite.json`)}
        finalFramePosition={1}
        shouldLoop={false}
        style={{
          width: favoriteSize,
          height: favoriteSize,
        }}
      />
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
        left: 10,
        top: 5,
      }}
    >
      {renderSpotifyAction()}
      {renderEdmTrainAction()}
      {renderFavoriteAction()}
    </View>
  );
};

export default EventActions;
