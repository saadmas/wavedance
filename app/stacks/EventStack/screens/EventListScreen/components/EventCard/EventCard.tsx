import { NavigationContext } from '@react-navigation/native';
import firebase from 'firebase';
import * as React from 'react';
import { View } from 'react-native';
import { WaveEvent } from '../../../../../../firebase/types';
import { Path } from '../../../../../../routing/paths';
import {
  useEventFavoritesCache,
  useEventFavoritesCacheUpdater,
} from '../../../../../../state/events/EventFavoritesCacheProvider';
import {
  removeUserEvent,
  removeUserEventPrompts,
  removeUserFromEventMembers,
  saveUserEvent,
  saveUserUnderEventMembers,
} from '../../../../utils';
import EventDetails from '../EventDetails/EventDetails';
import EventHeader from '../EventHeader/EventHeader';
import EventImage from '../EventImage/EventImage';
import { DisplayEvent } from '../EventList/EventList';

interface EventCardProps {
  event: DisplayEvent;
  isFavoritesList: boolean;
  locationId: number;
  eventIndex: number;
  removeEventFromList: (eventIndex: number) => void;
}

const EventCard = ({ event, locationId, isFavoritesList, eventIndex, removeEventFromList }: EventCardProps) => {
  const navigation = React.useContext(NavigationContext);
  const eventId = event.id;
  const waveEvent: WaveEvent = {
    ...event,
    locationId,
  };

  const eventFavoritesCacheKey = eventId.toString();
  const eventFavoritesCache = useEventFavoritesCache();
  const setEventFavoritesCache = useEventFavoritesCacheUpdater();

  const [isEventFavorited, setIsEventFavorited] = React.useState<boolean>(
    isFavoritesList || eventFavoritesCache.has(eventFavoritesCacheKey)
  );

  React.useEffect(() => {
    setIsEventFavorited(isFavoritesList || eventFavoritesCache.has(eventFavoritesCacheKey));
  }, [eventFavoritesCache, eventId, isFavoritesList]);

  const navigateToEventPrompts = () => {
    navigation?.navigate(Path.EventPrompts, { event: waveEvent });
  };

  const navigateToEventCarousel = () => {
    navigation?.navigate(Path.EventCarousel, { waveEvent });
  };

  const onRemoveEventFromFavorites = async () => {
    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';
    await removeUserEvent(uid, eventId);
    await removeUserFromEventMembers(uid, eventId);
    await removeUserEventPrompts(uid, eventId);

    if (isFavoritesList) {
      removeEventFromList(eventIndex);
      return;
    }

    setEventFavoritesCache?.(prevCache => {
      prevCache.delete(eventFavoritesCacheKey);
      return new Set(prevCache);
    });
  };

  const onAddEventToFavorites = async () => {
    if (isFavoritesList || eventFavoritesCache.has(eventFavoritesCacheKey)) {
      navigateToEventCarousel();
      return;
    }

    setEventFavoritesCache?.(prevCache => {
      prevCache.add(eventFavoritesCacheKey);
      return new Set(prevCache);
    });

    //f remove foo
    const uid = firebase.auth().currentUser?.uid ?? 'foo';

    await saveUserEvent(uid, event);
    await saveUserUnderEventMembers(uid, event.id);

    navigateToEventPrompts();
  };

  const onEventFavoriteButtonToggle = async () => {
    if (isEventFavorited) {
      onRemoveEventFromFavorites();
    } else {
      await new Promise(r => setTimeout(r, 400)); // To let the heart-favorite animation play out nicely :)
      onAddEventToFavorites();
    }
  };

  return (
    <View style={{ margin: 5 }}>
      <EventHeader
        event={event}
        isFavorite={isEventFavorited}
        locationId={locationId}
        onFavoriteToggle={onEventFavoriteButtonToggle}
      />
      <EventImage locationId={locationId} eventId={eventId} onImagePress={onAddEventToFavorites} />
      <EventDetails event={event} />
    </View>
  );
};

export default React.memo(EventCard);
