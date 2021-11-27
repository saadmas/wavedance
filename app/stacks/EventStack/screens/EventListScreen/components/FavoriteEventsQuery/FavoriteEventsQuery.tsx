import firebase from 'firebase';
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { FavoriteEvent } from '../../../../../../firebase/types';
import { getUserFavoriteEventsPath } from '../../../../../../firebase/utils';
import { ResponseStatus } from '../../../../../../state/enums/responseStatus';
import EventList from '../EventList/EventList';
import EventListError from '../EventListError/EventListError';
import EventListLoadingSkeleton from '../EventListLoadingSkeleton/EventListLoadingSkeleton';

interface FavoriteEventsQueryProps {
  searchText: string;
  locationId?: number;
}

const FavoriteEventsQuery = ({ searchText, locationId }: FavoriteEventsQueryProps) => {
  const [favoriteEvents, setFavoriteEvents] = React.useState<FavoriteEvent[] | undefined>(undefined);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

  React.useEffect(() => {
    const fetchFavoriteEvents = async () => {
      if (!locationId) {
        return;
      }

      //f remove foo
      const uid = firebase.auth().currentUser?.uid ?? 'foo';
      const path = getUserFavoriteEventsPath(uid, locationId);

      try {
        const snapshot = await firebase.database().ref(path).get();
        const events = snapshot.val();
        setResponseStatus(ResponseStatus.Success);
        if (events) {
          setFavoriteEvents(Object.values(events));
          return;
        }
        setFavoriteEvents([]);
      } catch (e) {
        setResponseStatus(ResponseStatus.Error);
        console.error('fetchFavoriteEvents failed');
        console.error(e);
        console.error(`locationId: ${locationId}`);
        console.error(`uid: ${uid}`);
      }
    };

    fetchFavoriteEvents();
  }, [locationId]);

  if (responseStatus === ResponseStatus.Loading || !locationId) {
    return null; //* loading is really fast locally, check if that is the case after deploying!
    return <EventListLoadingSkeleton />;
    return <ActivityIndicator style={{ marginTop: 150 }} size={100} />;
  }

  if (responseStatus === ResponseStatus.Error) {
    return <EventListError />;
  }

  return favoriteEvents ? (
    <EventList events={favoriteEvents} searchText={searchText} locationId={locationId} isFavoritesList={false} />
  ) : null;
};

export default FavoriteEventsQuery;
