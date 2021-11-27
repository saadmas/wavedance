import firebase from 'firebase';
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import { useEventQuery } from '../../../../../../edmTrain/useEventQuery';
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
  const [favoriteEvents, setFavoriteEvents] = React.useState<EdmTrainEvent[] | undefined>(undefined); // fetched from EDM Train API
  const [favoriteEventIds, setFavoriteEventIds] = React.useState<Set<string> | undefined>(undefined); // fetched from firebase
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);
  const { isError, data } = useEventQuery(locationId);

  React.useEffect(() => {
    if (data && favoriteEventIds) {
      const favEvents = (data.data ?? []).filter(event => favoriteEventIds.has(event.id.toString()));
      setFavoriteEvents(favEvents);
      setResponseStatus(ResponseStatus.Success);
    }
  }, [data, favoriteEventIds]);

  React.useEffect(() => {
    if (isError || !data?.success) {
      setResponseStatus(ResponseStatus.Error);
    }
  }, [isError, data?.success]);

  React.useEffect(() => {
    const fetchFavoriteEventIds = async () => {
      //f remove foo
      const uid = firebase.auth().currentUser?.uid ?? 'foo';
      const path = getUserFavoriteEventsPath(uid);

      try {
        const snapshot = await firebase.database().ref(path).get();
        const snapshotValue = snapshot.val();

        if (!snapshotValue) {
          setFavoriteEventIds(new Set());
          setFavoriteEvents([]);
          setResponseStatus(ResponseStatus.Success);
          return;
        }

        setFavoriteEventIds(new Set(Object.keys(snapshotValue)));
      } catch (e) {
        setResponseStatus(ResponseStatus.Error);
        console.error('fetchFavoriteEvents failed');
        console.error(e);
        console.error(`locationId: ${locationId}`);
        console.error(`uid: ${uid}`);
      }
    };

    fetchFavoriteEventIds();
  }, []);

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
