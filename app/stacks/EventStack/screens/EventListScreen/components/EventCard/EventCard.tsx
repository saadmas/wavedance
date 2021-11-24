import * as React from 'react';
import { View } from 'react-native';
import { IconButton, List, Text, useTheme } from 'react-native-paper';
import { getEventDateDisplay } from '../../../../../../utils/prompts/date.util';
import EventCardImage from '../EventCardImage/EventCardImage';
import { DisplayEvent } from '../EventList/EventList';

interface EventCardProps {
  event: DisplayEvent;
  locationId: number;
}

const EventCard = ({ event, locationId }: EventCardProps) => {
  const { fonts } = useTheme();

  const getArtists = (): string => event.artistList.map(artist => artist.name).join(', ');

  const getTitle = (): string => {
    return event.name ?? getArtists();
  };

  const renderListItem = (title: string, icon: string) => {
    return (
      <List.Item
        style={{ padding: 0, marginBottom: 5 }}
        titleStyle={{ padding: 0, margin: 0, fontSize: 9.5, color: '#fff' }}
        title={title}
        titleNumberOfLines={100}
        left={_ => (
          <IconButton icon={icon} style={{ margin: 0, padding: 0, height: 20, width: 15 }} size={15} color="#fff" />
        )}
      />
    );
  };

  const renderArtists = (): React.ReactNode => {
    if (!event.artistList.length) {
      return;
    }

    const artists = getArtists();
    return renderListItem(artists, 'account-music-outline');
  };

  const renderEventDate = (): React.ReactNode => {
    if (event.date) {
      const dateDisplay = getEventDateDisplay(event.date);
      return renderListItem(dateDisplay, 'calendar-range');
    }
  };

  const renderEventVenue = (): React.ReactNode => {
    if (event.venue?.name) {
      return renderListItem(event.venue.name, 'map-marker-outline');
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        margin: 25,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: fonts.thin.fontFamily,
          color: '#fff',
        }}
      >
        {getTitle()}
      </Text>
      <EventCardImage locationId={locationId} eventId={event.id} />
      {renderEventDate()}
      {renderArtists()}
      {renderEventVenue()}
    </View>
  );
};

export default React.memo(EventCard);
