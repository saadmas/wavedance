import * as React from 'react';
import { Image, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import EventFavoriteButton from '../EventFavoriteButton/EventFavoriteButton';
import { useEventImageCache } from '../../../../../../state/events/EventImageCacheProvider';

interface EventActionsProps {
  eventLink: string;
  eventId: number;
  locationId: number;
  isFavorite: boolean;
  onHeartPress: () => void;
}

const EventActions = ({ eventLink, isFavorite, locationId, eventId, onHeartPress }: EventActionsProps) => {
  const baseSize = 40;
  const spotifySize = baseSize - 10;
  const favoriteSize = baseSize + 5;

  const eventImageCache = useEventImageCache();
  const spotifyArtistId = eventImageCache.get(eventId)?.spotifyArtistId;

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
      <EventFavoriteButton
        size={favoriteSize}
        isFavorite={isFavorite}
        locationId={locationId}
        eventId={eventId}
        onHeartPress={onHeartPress}
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
