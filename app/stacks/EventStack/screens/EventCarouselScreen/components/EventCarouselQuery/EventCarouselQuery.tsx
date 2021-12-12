import firebase from 'firebase';
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import ErrorDisplay from '../../../../../../components/ErrorDisplay/ErrorDisplay';
import { getEventMembersPath, getUserBlocksPath } from '../../../../../../firebase/utils';
import { ResponseStatus } from '../../../../../../state/enums/responseStatus';
import EventCarousel from '../EventCarousel/EventCarousel';

interface EventCarouselQueryProps {
  eventId: number;
}

const EventCarouselQuery = ({ eventId }: EventCarouselQueryProps) => {
  const [eventMemberIds, setEventMemberIds] = React.useState<string[]>([]);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

  React.useEffect(() => {
    const fetchUserBlockedIds = async (uid: string): Promise<Set<string>> => {
      try {
        const path = getUserBlocksPath(uid);
        const snapshot = await firebase.database().ref(path).get();
        const value = snapshot.val();
        if (value) {
          const userBlockedIds = new Set(Object.keys(value));
          return userBlockedIds;
        }
      } catch (e) {
        console.error('fetchUserBlocks failed');
        console.error(e);
        console.error(`uid: ${uid}`);
      }

      return new Set();
    };

    const fetchEventMembers = async () => {
      try {
        const path = getEventMembersPath(eventId);
        const snapshot = await firebase.database().ref(path).get();
        const snapshotValue = snapshot.val();

        if (snapshotValue) {
          //f remove foo
          // const uid = firebase.auth().currentUser?.uid ?? 'foo';
          const uid = 'foo';
          const userBlockedIds = await fetchUserBlockedIds(uid);
          const filteredEventMembersIds = Object.keys(snapshotValue).filter(
            memberId => !userBlockedIds.has(memberId) && memberId !== uid
          );
          setEventMemberIds(filteredEventMembersIds);
        }

        setResponseStatus(ResponseStatus.Success);
      } catch (e) {
        setResponseStatus(ResponseStatus.Error);
        console.error('fetchEventMembers failed');
        console.error(e);
        console.error(`eventId: ${eventId}`);
      }
    };

    fetchEventMembers();
  }, [eventId]);

  if (responseStatus === ResponseStatus.Loading) {
    return <ActivityIndicator style={{ height: '90%' }} size={60} />;
  }

  if (responseStatus === ResponseStatus.Error) {
    return <ErrorDisplay />;
  }

  return <EventCarousel eventMemberIds={eventMemberIds} eventId={eventId} />;
};

export default EventCarouselQuery;
