import firebase from 'firebase';
import * as React from 'react';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import { useEventQuery } from '../../../../../../edmTrain/useEventQuery';
import { FirebaseNode } from '../../../../../../firebase/keys';
import { getFirebasePath } from '../../../../../../firebase/utils';
import EventList from '../EventList/EventList';
import EventListError from '../EventListError/EventListError';
import EventListLoadingSkeleton from '../EventListLoadingSkeleton/EventListLoadingSkeleton';

interface EventListQueryProps {
  searchText: string;
  locationId?: number;
}

const EventListQuery = ({ searchText, locationId }: EventListQueryProps) => {
  const [locationFavoriteEventIds, setLocationFavoriteEventIds] = React.useState<Set<string>>(new Set());
  const { isLoading, isError, data, isRefetching } = useEventQuery(locationId);
  const isFailure = data ? !data.success : false;

  React.useEffect(() => {
    const fetchLocationFavoriteEvents = async () => {
      if (locationId === undefined) {
        return;
      }

      /// remove foo
      const uid = firebase.auth().currentUser?.uid ?? 'foo';
      const path = getFirebasePath(FirebaseNode.UserEvents, uid, locationId.toString());

      try {
        const snapshot = await firebase.database().ref(path).get();
        const favoritedEvents = snapshot.val();
        if (favoritedEvents) {
          const favoriteEventIds = Object.keys(favoritedEvents);
          setLocationFavoriteEventIds(new Set(favoriteEventIds));
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

  if (isLoading || isRefetching || !locationId) {
    return <EventListLoadingSkeleton />;
  }

  if (isError || isFailure) {
    return <EventListError />;
  }

  return (
    <EventList
      events={data?.data ?? []}
      searchText={searchText}
      locationId={locationId}
      isFavoritesList={false}
      locationFavoriteEventIds={locationFavoriteEventIds}
    />
  );
};

export default EventListQuery;
