import * as React from 'react';
import { View } from 'react-native';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { useEventQuery } from '../../../../../../edmTrain/useEventQuery';
import EventList from '../EventList/EventList';
import EventListError from '../EventListError/EventListError';
import EventListLoadingSkeleton from '../EventListLoadingSkeleton/EventListLoadingSkeleton';

interface EventListQueryProps {
  searchText: string;
  locationId?: number;
}

const EventListQuery = ({ searchText, locationId }: EventListQueryProps) => {
  const { isLoading, isError, data } = useEventQuery(locationId);
  const isFailure = data ? !data.success : false;

  if (isLoading || !locationId) {
    return <EventListLoadingSkeleton />;
  }

  if (isError || isFailure) {
    return <EventListError />;
  }

  return <EventList events={data?.data ?? []} searchText={searchText} />;
};

export default EventListQuery;
