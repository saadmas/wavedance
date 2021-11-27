import { NavigationContext } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { Path } from '../../../../../../routing/paths';
import {
  useEventFavoritesCache,
  useEventFavoritesCacheUpdater,
} from '../../../../../../state/events/EventFavoritesCacheProvider';
import EventDetails from '../EventDetails/EventDetails';
import EventHeader from '../EventHeader/EventHeader';
import EventImage from '../EventImage/EventImage';
import { DisplayEvent } from '../EventList/EventList';

interface EventCardProps {
  event: DisplayEvent;
  isFavoritesList: boolean;
  locationId: number;
}

export interface SpotifyArtist {
  id?: string;
  imageUrl?: string;
}

const EventCard = ({ event, locationId, isFavoritesList }: EventCardProps) => {
  const navigation = React.useContext(NavigationContext);

  const eventId = event.id;
  const eventCacheKey = eventId.toString();
  const eventFavoritesCache = useEventFavoritesCache();
  const setEventFavoritesCache = useEventFavoritesCacheUpdater();

  const [spotifyArtist, setSpotifyArtist] = React.useState<SpotifyArtist>({});
  const [isEventFavorited, setIsEventFavorited] = React.useState<boolean>(
    isFavoritesList || eventFavoritesCache.has(eventCacheKey)
  );

  React.useEffect(() => {
    setIsEventFavorited(eventFavoritesCache.has(eventCacheKey));
  }, [eventFavoritesCache, eventId]);

  const navigateToEventPrompts = () => {
    navigation?.navigate(Path.EventPrompts, { eventId });
  };

  const navigateToEventCarousel = () => {
    navigation?.navigate(Path.EventCarousel, { eventId: eventId });
  };

  const addEventToFavorites = async () => {
    await new Promise(r => setTimeout(r, 400)); // To let the heart-favorite animation play out nicely :)
    openEvent();
  };

  const removeEventFromFavorites = async () => {
    /// open modal for below
    if (!isFavoritesList) {
      setEventFavoritesCache(prevCache => {
        prevCache.delete(eventCacheKey);
        return new Set(prevCache);
      });
      return;
    }
  };

  const openEvent = () => {
    if (isFavoritesList || eventFavoritesCache.has(eventCacheKey)) {
      navigateToEventCarousel();
      return;
    }

    setEventFavoritesCache(prevCache => {
      prevCache.add(eventCacheKey);
      return new Set(prevCache);
    });

    navigateToEventPrompts();
  };

  const onEventFavoriteToggle = () => {
    if (isEventFavorited) {
      removeEventFromFavorites();
    } else {
      addEventToFavorites();
    }
  };

  return (
    <View style={{ margin: 5 }}>
      <EventHeader
        event={event}
        spotifyArtistId={spotifyArtist?.id}
        isFavorite={isEventFavorited}
        locationId={locationId}
        onHeartPress={onEventFavoriteToggle}
      />
      <EventImage
        locationId={locationId}
        eventId={eventId}
        setSpotifyArtist={setSpotifyArtist}
        onImagePress={openEvent}
      />
      <EventDetails event={event} />
    </View>
  );
};

export default React.memo(EventCard);
