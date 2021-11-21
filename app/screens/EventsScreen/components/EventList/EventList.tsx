import * as React from 'react';
import { ListRenderItemInfo, VirtualizedList } from 'react-native';
import { EdmTrainEvent } from '../../../../edmTrain/types';
import EventCard from '../EventCard/EventCard';

export type DisplayEvent = EdmTrainEvent;

interface EventListProps {
  events: DisplayEvent[];
  isFavoriteList?: boolean;
}

const EventList = ({ events }: EventListProps) => {
  const getItemCount = (listItems: DisplayEvent[]): number => listItems.length;

  const getItem = (listItems: DisplayEvent[], index: number): DisplayEvent => listItems[index];

  const getItemKey = (listItem: DisplayEvent): string => listItem.id.toString();

  const renderItem = (itemInfo: ListRenderItemInfo<EdmTrainEvent>): JSX.Element => <EventCard event={itemInfo.item} />;

  return (
    <VirtualizedList
      data={events}
      renderItem={renderItem}
      keyExtractor={getItemKey}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
};

export default EventList;
