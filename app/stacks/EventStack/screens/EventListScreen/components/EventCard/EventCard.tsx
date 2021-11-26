import * as React from 'react';
import { View } from 'react-native';
import EventDetails from '../EventDetails/EventDetails';
import EventHeader from '../EventHeader/EventHeader';
import EventImage from '../EventImage/EventImage';
import { DisplayEvent } from '../EventList/EventList';

interface EventCardProps {
  event: DisplayEvent;
  isFavorite: boolean;
  locationId: number;
}

const EventCard = ({ event, locationId, isFavorite }: EventCardProps) => {
  const [spotifyArtistId, setSpotifyArtistId] = React.useState<string | undefined>(undefined);

  return (
    <View style={{ margin: 5 }}>
      <EventHeader event={event} spotifyArtistId={spotifyArtistId} isFavorite={isFavorite} locationId={locationId} />
      <EventImage locationId={locationId} eventId={event.id} setSpotifyArtistId={setSpotifyArtistId} />
      <EventDetails event={event} />
    </View>
  );
};

export default React.memo(EventCard);
