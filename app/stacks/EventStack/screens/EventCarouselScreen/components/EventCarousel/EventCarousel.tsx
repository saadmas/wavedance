import * as React from 'react';
import ErrorDisplay from '../../../../../../components/ErrorDisplay/ErrorDisplay';
import UserProfileQuery from '../../../../../../components/UserProfileQuery/UserProfileQuery';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import EventCarouselEnd from '../EventCarouselEnd/EventCarouselEnd';

interface EventCarouselProps {
  event: EdmTrainEvent;
  eventMemberIds: string[];
}

const EventCarousel = ({ eventMemberIds, event }: EventCarouselProps) => {
  const [currentMemberIndex, setCurrentMemberIndex] = React.useState<number>(0);

  const goToNextProfile = () => {
    setCurrentMemberIndex(prevIndex => ++prevIndex);
  };

  if (eventMemberIds.length === 0) {
    return <ErrorDisplay errorText="No one is interested in this event yet" />;
  }

  const hasViewedAllMembers = 1 === currentMemberIndex;
  if (hasViewedAllMembers) {
    return <EventCarouselEnd />;
  }

  return (
    <UserProfileQuery userId={eventMemberIds[currentMemberIndex]} event={event} goToNextProfile={goToNextProfile} />
  );
};

export default EventCarousel;
