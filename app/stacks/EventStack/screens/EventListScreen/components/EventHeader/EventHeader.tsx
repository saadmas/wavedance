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
  onFavoriteToggle: () => void;
}

const EventHeader = ({ event, isFavorite, locationId, onFavoriteToggle }: EventHeaderProps) => {
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: 45,
        position: 'relative',
        top: 5,
      }}
    >
      {renderTitle()}
      <EventActions onFavoriteToggle={onFavoriteToggle} isFavorite={isFavorite} locationId={locationId} event={event} />
    </View>
  );
};

export default React.memo(EventHeader);
