import { NavigationContext } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { FavoriteEvent } from '../../../../../../firebase/types';
import { Path } from '../../../../../../routing/paths';
import { EventPromptsProps } from '../../../EventPromptScreen/EventPromptScreen';
import EventDetails from '../EventDetails/EventDetails';
import EventHeader from '../EventHeader/EventHeader';
import EventImage from '../EventImage/EventImage';
import { DisplayEvent } from '../EventList/EventList';

interface EventCardProps {
  event: DisplayEvent;
  isFavorite: boolean;
  locationId: number;
}

export type SpotifyArtist = Pick<FavoriteEvent, 'spotifyArtistId' | 'spotifyArtistImageUri'>;

const EventCard = ({ event, locationId, isFavorite }: EventCardProps) => {
  const navigation = React.useContext(NavigationContext);
  const [spotifyArtist, setSpotifyArtist] = React.useState<SpotifyArtist>({});

  const onFavoriteEvent = async () => {
    await new Promise(r => setTimeout(r, 400));

    const favoriteEvent: FavoriteEvent = {
      ...event,
      ...spotifyArtist,
      locationId,
    };
    const eventPromptsProps: EventPromptsProps = { favoriteEvent };

    navigation?.navigate(Path.EventPrompts, eventPromptsProps);
  };

  return (
    <View style={{ margin: 5 }}>
      <EventHeader
        event={event}
        spotifyArtistId={spotifyArtist?.spotifyArtistId}
        isFavorite={isFavorite}
        locationId={locationId}
        onFavoriteEvent={onFavoriteEvent}
      />
      <EventImage
        locationId={locationId}
        eventId={event.id}
        setSpotifyArtist={setSpotifyArtist}
        onFavoriteEvent={onFavoriteEvent}
      />
      <EventDetails event={event} />
    </View>
  );
};

export default React.memo(EventCard);
