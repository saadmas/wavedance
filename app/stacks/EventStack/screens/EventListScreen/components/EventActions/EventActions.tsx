import * as React from 'react';
import { View } from 'react-native';
import { EdmTrainEvent } from '../../../../../../../functions/src/types';
import EventActionsMenu from '../EventActionsMenu/EventActionsMenu';
import EventFavoriteButton from '../EventFavoriteButton/EventFavoriteButton';

interface EventActionsProps {
  event: EdmTrainEvent;
  locationId: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const EventActions = ({ event, isFavorite, locationId, onFavoriteToggle }: EventActionsProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        position: 'relative',
        left: 10,
      }}
    >
      <EventFavoriteButton
        isFavorite={isFavorite}
        locationId={locationId}
        eventId={event.id}
        onFavoriteToggle={onFavoriteToggle}
      />
      <EventActionsMenu event={{ ...event, locationId }} isFavorite={isFavorite} />
    </View>
  );
};

export default EventActions;
