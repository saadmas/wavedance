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

  if (eventMemberIds.length === currentMemberIndex) {
    /// handle this case
  }

  return <UserProfileQuery userId={eventMemberIds[2]} eventId={eventId} />;
};

export default EventCarousel;
