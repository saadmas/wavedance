import { useQuery } from 'react-query';
import { edmTrainApiKey } from './config';
import { EdmTrainResponse } from './types';

const fetchEvents = async (locationId = 70) => {
  const response = await fetch(
    `https://edmtrain.com/api/events?locationIds=${locationId}&client=${edmTrainApiKey}&livestreamInd=false`
  );
  const data = await response.json();
  return data;
};

export const useEventQuery = (locationId?: number) => {
  const { isLoading, isError, data, isRefetching } = useQuery<EdmTrainResponse, Error>(
    ['events', locationId],
    () => fetchEvents(locationId),
    {
      enabled: locationId !== undefined,
      cacheTime: 1800000, // 30 min
    }
  );

  return { isLoading, isError, data, isRefetching };
};
