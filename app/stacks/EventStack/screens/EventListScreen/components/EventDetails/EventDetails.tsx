import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { getArtistsDisplay } from '../../../../../../edmTrain/utils';
import { getEventDateDisplay } from '../../../../../../utils/prompts/date.util';
import { DisplayEvent } from '../EventList/EventList';

interface EventDetailProps {
  event: DisplayEvent;
}

const EventDetails = ({ event }: EventDetailProps) => {
  const renderEventDetail = (title: string, icon: string) => {
    const iconSize = 15;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          <IconButton
            icon={icon}
            style={{ margin: 0, padding: 0, height: iconSize, width: iconSize }}
            size={iconSize}
            color="#fff"
          />
        </Text>
        <Text style={{ fontSize: 9, position: 'relative', bottom: 2, marginLeft: 2 }}>{title}</Text>
      </View>
    );
  };

  const renderArtists = (): React.ReactNode => {
    if (event.artistList?.length) {
      const artists = getArtistsDisplay(event);
      return renderEventDetail(artists, 'account-music-outline');
    }
  };

  const renderEventDate = (): React.ReactNode => {
    if (event.date) {
      const dateDisplay = getEventDateDisplay(event.date);
      return renderEventDetail(dateDisplay, 'calendar-range');
    }
  };

  const renderEventVenue = (): React.ReactNode => {
    if (event.venue?.name) {
      const { name } = event.venue;
      const clippedEventVenueName = name.length > 54 ? `${name.substring(0, 48)}...` : name;
      return renderEventDetail(clippedEventVenueName, 'map-marker-outline');
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 4,
        }}
      >
        {renderEventVenue()}
        {renderEventDate()}
      </View>
      {renderArtists()}
    </View>
  );
};

export default React.memo(EventDetails);
