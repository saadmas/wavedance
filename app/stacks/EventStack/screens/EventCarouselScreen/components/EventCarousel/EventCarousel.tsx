import * as React from 'react';
import ErrorDisplay from '../../../../../../components/ErrorDisplay/ErrorDisplay';
import UserProfileQuery from '../../../../../../components/UserProfileQuery/UserProfileQuery';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import EventCarouselEnd from '../EventCarouselEnd/EventCarouselEnd';
import { MembersViewedStatus } from '../EventCarouselQuery/EventCarouselQuery';

interface EventCarouselProps {
  event: EdmTrainEvent;
  eventMemberIds: string[];
  membersViewedStatus: MembersViewedStatus;
  refetchMembers: () => void;
}

const EventCarousel = ({ eventMemberIds, event, membersViewedStatus, refetchMembers }: EventCarouselProps) => {
  const { isPermanent, hasViewedAllMembers } = membersViewedStatus;
  const [currentMemberIndex, setCurrentMemberIndex] = React.useState<number>(0);

  React.useEffect(() => {
    setCurrentMemberIndex(0);
  }, [eventMemberIds]);

  const goToNextProfile = () => {
    setCurrentMemberIndex(prevIndex => ++prevIndex);
  };

  if (eventMemberIds.length === 0 && !hasViewedAllMembers) {
    return <ErrorDisplay errorText="No one is interested in this event yet" />;
  }

  if (hasViewedAllMembers || eventMemberIds.length === currentMemberIndex) {
    return <EventCarouselEnd refetchMembers={refetchMembers} eventId={event.id} isPermanentEnd={isPermanent} />;
  }

  return (
    <UserProfileQuery userId={eventMemberIds[currentMemberIndex]} event={event} goToNextProfile={goToNextProfile} />
  );
};

export default EventCarousel;
