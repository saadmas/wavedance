import * as React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import EventActions from '../EventActions/EventActions';
import EventCardImage from '../EventCardImage/EventCardImage';
import EventDetails from '../EventDetails/EventDetails';
import { DisplayEvent } from '../EventList/EventList';

interface EventCardProps {
  event: DisplayEvent;
  locationId: number;
}

const EventCard = ({ event, locationId }: EventCardProps) => {
  const { fonts } = useTheme();

  const getArtists = (): string => event.artistList.map(artist => artist.name).join(', ');

  const renderTitle = (): React.ReactNode => {
    return (
      <View style={{ maxWidth: '62%' }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.thin.fontFamily,
            color: '#fff',
          }}
        >
          {event.name ?? getArtists()}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ margin: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        {/* /// Put EventHeader in sep comp Fix jank space b/w title/actions & image */}
        {renderTitle()}
        <EventActions eventId={event.id} />
      </View>
      <EventCardImage locationId={locationId} eventId={event.id} />
      <EventDetails event={event} />
    </View>
  );
};

export default React.memo(EventCard);
