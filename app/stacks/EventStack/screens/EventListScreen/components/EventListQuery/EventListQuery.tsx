import * as React from 'react';
import { useEventQuery } from '../../../../../../edmTrain/useEventQuery';
import EventList from '../EventList/EventList';
import EventListError from '../EventListError/EventListError';
import EventListLoadingSkeleton from '../EventListLoadingSkeleton/EventListLoadingSkeleton';

interface EventListQueryProps {
  searchText: string;
  locationId?: number;
}

const EventListQuery = ({ searchText, locationId }: EventListQueryProps) => {
  const { isLoading, isError, data, isRefetching } = useEventQuery(locationId);
  const isFailure = data ? !data.success : false;

  if (isLoading || isRefetching || !locationId) {
    return <EventListLoadingSkeleton />;
  }

  if (isError || isFailure) {
    return <EventListError />;
  }

  return (
    <EventList events={data?.data ?? []} searchText={searchText} locationId={locationId} isFavoritesList={false} />
  );
};

export default EventListQuery;
