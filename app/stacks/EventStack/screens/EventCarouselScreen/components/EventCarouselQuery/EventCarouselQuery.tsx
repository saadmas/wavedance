import firebase from 'firebase';
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import ErrorDisplay from '../../../../../../components/ErrorDisplay/ErrorDisplay';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import { getUserBlockedIds, getUserIgnoredIds, getUserWavedIds } from '../../../../../../firebase/queries';
import {
  getEventMembersPath,
  getUserBlocksPath,
  getUserEventIgnoresPath,
  getUserWavesSentPath,
} from '../../../../../../firebase/utils';
import { ResponseStatus } from '../../../../../../state/enums/responseStatus';
import EventCarousel from '../EventCarousel/EventCarousel';

interface EventCarouselQueryProps {
  event: EdmTrainEvent;
}

export interface MembersViewedStatus {
  hasViewedAllMembers: boolean;
  isPermanent?: boolean;
}

const EventCarouselQuery = ({ event }: EventCarouselQueryProps) => {
  const [eventMemberIds, setEventMemberIds] = React.useState<string[]>([]);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);
  const [refetchIndicator, setRefetchIndicator] = React.useState<number>(0);
  const [membersViewedStatus, setMembersViewedStatus] = React.useState<MembersViewedStatus>({
    hasViewedAllMembers: false,
  });

  React.useEffect(() => {
    const fetchEventMembers = async () => {
      try {
        const path = getEventMembersPath(event.id);
        const snapshot = await firebase.database().ref(path).get();
        const snapshotValue = snapshot.val();

        if (snapshotValue) {
          //f remove foo
          // const uid = firebase.auth().currentUser?.uid ?? 'foo';
          const uid = 'foo';

          const userBlockedIds = await getUserBlockedIds(uid);
          const userIgnoredIds = await getUserIgnoredIds(uid, event.id);
          const userWavedIds = await getUserWavedIds(uid, event.id);
          const permanentlyHiddenMemberIds = new Set<string>();
          const memberIds = Object.keys(snapshotValue);

          const isEmpty = memberIds.length === 0 || (memberIds.length === 1 && memberIds[0] === uid);
          if (isEmpty) {
            setEventMemberIds([]);
            setResponseStatus(ResponseStatus.Success);
            return;
          }

          const filteredEventMembersIds = memberIds.filter(memberId => {
            const isBlocked = userBlockedIds.has(memberId);
            const isIgnored = userIgnoredIds.has(memberId);
            const isWaved = userWavedIds.has(memberId);
            const isCurrentUser = memberId === uid;
            const isMatch = !isBlocked && !isIgnored && !isWaved && !isCurrentUser;

            if (isWaved || isBlocked) {
              permanentlyHiddenMemberIds.add(memberId);
            }

            return isMatch;
          });

          setEventMemberIds(filteredEventMembersIds);

          const hasPermanentlyViewedAllMembers = permanentlyHiddenMemberIds.size === memberIds.length - 1;
          const hasViewedAllMembers = filteredEventMembersIds.length === 0 && memberIds.length > 1;

          setMembersViewedStatus({
            hasViewedAllMembers: hasPermanentlyViewedAllMembers || hasViewedAllMembers,
            isPermanent: hasPermanentlyViewedAllMembers,
          });
        }

        setResponseStatus(ResponseStatus.Success);
      } catch (e) {
        setResponseStatus(ResponseStatus.Error);
        console.error('fetchEventMembers failed');
        console.error(e);
        console.error(`eventId: ${event.id}`);
      }
    };

    fetchEventMembers();
  }, [event.id, refetchIndicator]);

  const refetchMembers = () => {
    setRefetchIndicator(prev => ++prev);
  };

  if (responseStatus === ResponseStatus.Loading) {
    return <ActivityIndicator style={{ height: '90%' }} size={60} />;
  }

  if (responseStatus === ResponseStatus.Error) {
    return <ErrorDisplay />;
  }

  return (
    <EventCarousel
      eventMemberIds={eventMemberIds}
      event={event}
      membersViewedStatus={membersViewedStatus}
      refetchMembers={refetchMembers}
    />
  );
};

export default EventCarouselQuery;
