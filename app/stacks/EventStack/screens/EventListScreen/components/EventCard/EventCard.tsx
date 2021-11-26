import { NavigationContext } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { FavoriteEvent } from '../../../../../../firebase/types';
import { Path } from '../../../../../../routing/paths';
import {
  useEventFavoritesCache,
  useEventFavoritesCacheUpdater,
} from '../../../../../../state/events/EventFavoritesCacheProvider';
import { EventPromptsProps } from '../../../EventPromptScreen/EventPromptScreen';
import EventDetails from '../EventDetails/EventDetails';
import EventHeader from '../EventHeader/EventHeader';
import EventImage from '../EventImage/EventImage';
import { DisplayEvent } from '../EventList/EventList';

interface EventCardProps {
  event: DisplayEvent;
  isFavoritesList: boolean;
  locationId: number;
}

export type SpotifyArtist = Pick<FavoriteEvent, 'spotifyArtistId' | 'spotifyArtistImageUri'>;

const EventCard = ({ event, locationId, isFavoritesList }: EventCardProps) => {
  const navigation = React.useContext(NavigationContext);

  const eventCacheKey = event.id.toString();
  const eventFavoritesCache = useEventFavoritesCache();
  const setEventFavoritesCache = useEventFavoritesCacheUpdater();

  const [spotifyArtist, setSpotifyArtist] = React.useState<SpotifyArtist>({});
  const [isEventFavorited, setIsEventFavorited] = React.useState<boolean>(
    isFavoritesList || eventFavoritesCache.has(eventCacheKey)
  );

  React.useEffect(() => {
    setIsEventFavorited(eventFavoritesCache.has(eventCacheKey));
  }, [eventFavoritesCache, event.id]);

  const navigateToEventPrompts = () => {
    const favoriteEvent: FavoriteEvent = {
      ...event,
      ...spotifyArtist,
      locationId,
    };

    const eventPromptsProps: EventPromptsProps = { favoriteEvent };

    navigation?.navigate(Path.EventPrompts, eventPromptsProps);
  };

  const navigateToEventCarousel = () => {
    ///
  };

  const addEventToFavorites = async () => {
    await new Promise(r => setTimeout(r, 400)); // To let the heart-favorite animation play out nicely :)
    openEvent();
  };

  const removeEventFromFavorites = async () => {
    if (isFavoritesList) {
      /// open modal
      return;
    }

    setEventFavoritesCache(prevCache => {
      prevCache.delete(eventCacheKey);
      return new Set(prevCache);
    });
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
        spotifyArtistId={spotifyArtist?.spotifyArtistId}
        isFavorite={isEventFavorited}
        locationId={locationId}
        onHeartPress={onEventFavoriteToggle}
      />
      <EventImage
        locationId={locationId}
        eventId={event.id}
        setSpotifyArtist={setSpotifyArtist}
        onImagePress={openEvent}
      />
      <EventDetails event={event} />
    </View>
  );
};

export default React.memo(EventCard);
