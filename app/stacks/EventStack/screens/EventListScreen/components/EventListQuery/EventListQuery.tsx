import firebase from 'firebase';
import * as React from 'react';
import { useEventQuery } from '../../../../../../hooks/useEventQuery';
import { getUserFavoriteEventsPath } from '../../../../../../firebase/utils';
import { useEventFavoritesCacheUpdater } from '../../../../../../state/events/EventFavoritesCacheProvider';
import EventList from '../EventList/EventList';
import EventListError from '../EventListError/EventListError';
import EventListLoadingSkeleton from '../EventListLoadingSkeleton/EventListLoadingSkeleton';

interface EventListQueryProps {
  searchText: string;
  locationId?: number;
}

const EventListQuery = ({ searchText, locationId }: EventListQueryProps) => {
  const setEventFavoritesCache = useEventFavoritesCacheUpdater();
  const { isLoading, isError, data } = useEventQuery(locationId);
  const isFailure = data ? !data.success : false;

  React.useEffect(() => {
    const fetchLocationFavoriteEvents = async () => {
      if (locationId === undefined) {
        return;
      }

      //f remove foo
      const uid = firebase.auth().currentUser?.uid ?? 'foo';
      const path = getUserFavoriteEventsPath(uid);

      try {
        const snapshot = await firebase.database().ref(path).get();
        const snapshotValue = snapshot.val();
        if (snapshotValue) {
          const favoriteEventIds = Object.keys(snapshotValue);
          setEventFavoritesCache(new Set(favoriteEventIds));
        }
      } catch (e) {
        console.error('updateEventFavoriteStatus failed');
        console.error(e);
        console.error(`locationId: ${locationId}`);
        console.error(`uid: ${uid}`);
      }
    };

    fetchLocationFavoriteEvents();
  }, [locationId]);

  if (isLoading || !locationId) {
    return <EventListLoadingSkeleton />;
  }

  if (isError || isFailure) {
    return <EventListError />;
  }

  return (
    <EventList events={data?.data ?? []} searchText={searchText} locationId={locationId} isFavoritesList={false} />
  );
};

export default EventListQuery;
