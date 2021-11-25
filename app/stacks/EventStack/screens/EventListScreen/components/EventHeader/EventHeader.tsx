import * as React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { getArtistsDisplay } from '../../../../../../edmTrain/utils';
import EventActions from '../EventActions/EventActions';
import { DisplayEvent } from '../EventList/EventList';

interface EventHeaderProps {
  event: DisplayEvent;
  locationId: number;
  isFavorite: boolean;
  spotifyArtistId?: string;
}

const EventHeader = ({ event, spotifyArtistId, isFavorite, locationId }: EventHeaderProps) => {
  const { fonts } = useTheme();

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
          {event.name ?? getArtistsDisplay(event)}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', height: 55 }}>
      {renderTitle()}
      <EventActions
        eventLink={event.link}
        spotifyArtistId={spotifyArtistId}
        isFavorite={isFavorite}
        eventId={event.id}
        locationId={locationId}
      />
    </View>
  );
};

export default React.memo(EventHeader);
