import * as React from 'react';
import ErrorDisplay from '../../../../../../components/ErrorDisplay/ErrorDisplay';
import UserProfileQuery from '../../../../../../components/UserProfileQuery/UserProfileQuery';

interface EventCarouselProps {
  eventId: number;
  eventMemberIds: string[];
}

const EventCarousel = ({ eventMemberIds, eventId }: EventCarouselProps) => {
  const [currentMemberIndex, setCurrentMemberIndex] = React.useState<number>(0);

  const goToNextProfile = () => {
    setCurrentMemberIndex(prevIndex => ++prevIndex);
  };

  if (eventMemberIds.length === 0) {
    return <ErrorDisplay errorText="No one is interested in this event yet" />;
  }

  const hasViewedAllMembers = eventMemberIds.length === currentMemberIndex;
  if (hasViewedAllMembers) {
  }

  return <UserProfileQuery userId={eventMemberIds[0]} eventId={eventId} />;
};

export default EventCarousel;
