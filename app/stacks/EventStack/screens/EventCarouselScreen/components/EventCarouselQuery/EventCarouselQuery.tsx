import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import ErrorDisplay from '../../../../../../components/ErrorDisplay/ErrorDisplay';
import { ResponseStatus } from '../../../../../../state/enums/responseStatus';

interface EventCarouselQueryProps {
  eventId: number;
}

const EventCarouselQuery = ({ eventId }: EventCarouselQueryProps) => {
  const [eventMembers, setEventMembers] = React.useState(undefined);
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);

  if (responseStatus === ResponseStatus.Loading) {
    return <ActivityIndicator style={{ height: '90%' }} size={60} />;
  }

  if (responseStatus === ResponseStatus.Error) {
    return <ErrorDisplay />;
  }

  return null;
};

export default EventCarouselQuery;
