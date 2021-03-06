import * as React from 'react';
import { ListRenderItemInfo, VirtualizedList } from 'react-native';
import NoDataDisplay from '../../../../../../components/NoDataDisplay/NoDataDisplay';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import EventCard from '../EventCard/EventCard';

export type DisplayEvent = EdmTrainEvent;

interface EventListProps {
  events: DisplayEvent[];
  locationId: number;
  searchText: string;
  isFavoritesList: boolean;
}

const EventList = ({ events, searchText, locationId, isFavoritesList }: EventListProps) => {
  const listRef = React.useRef<VirtualizedList<EdmTrainEvent>>(null);
  const [filteredEvents, setFilteredEvents] = React.useState<DisplayEvent[]>(events);

  React.useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  React.useEffect(() => {
    if (!searchText) {
      setFilteredEvents(events);
      return;
    }

    const nextFilteredEvents = events.filter(event => {
      const lowerCaseSearchText = searchText.trim().toLowerCase();

      const isNameMatch = event.name?.toLowerCase?.()?.includes(lowerCaseSearchText);
      if (isNameMatch) {
        return true;
      }

      const isVenueMatch = event.venue?.name?.toLowerCase?.()?.includes(lowerCaseSearchText);
      if (isVenueMatch) {
        return true;
      }

      const isArtistMatch = event.artistList?.some(artist => artist.name.toLowerCase().includes(lowerCaseSearchText));
      if (isArtistMatch) {
        return true;
      }

      return false;
    });

    setFilteredEvents(nextFilteredEvents);

    if (nextFilteredEvents.length > 1) {
      try {
        listRef.current?.scrollToOffset({ animated: false, offset: 0 });
      } catch (e) {
        console.error('scrollToOffset failed');
        console.error(e);
      }
    }
  }, [searchText]);

  React.useEffect(() => {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }, [locationId]);

  const getItemCount = (listItems: DisplayEvent[]): number => listItems.length;

  const getItem = (listItems: DisplayEvent[], index: number): DisplayEvent => listItems[index];

  const getItemKey = (listItem: DisplayEvent): string => listItem.id.toString();

  const removeEventFromList = (index: number) => {
    setFilteredEvents(prevEvents => {
      prevEvents.splice(index, 1);
      const nextEvents = [...prevEvents];
      return nextEvents;
    });
  };

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<EdmTrainEvent>): JSX.Element => (
      <EventCard
        event={item}
        locationId={locationId}
        isFavoritesList={isFavoritesList}
        removeEventFromList={removeEventFromList}
        eventIndex={index}
      />
    ),
    [locationId, isFavoritesList]
  );

  const renderNoData = React.useCallback(() => {
    return <NoDataDisplay noDataText="Bummer, no events found" />;
  }, []);

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    console.error('onScrollToIndexFailed');
    console.error(info);
  };

  return (
    <VirtualizedList
      data={filteredEvents}
      renderItem={renderItem}
      keyExtractor={getItemKey}
      getItemCount={getItemCount}
      getItem={getItem}
      contentContainerStyle={{ paddingBottom: 150 }}
      ListEmptyComponent={renderNoData}
      ref={listRef}
      removeClippedSubviews={true}
      initialNumToRender={1} //* double check 1 is ok for all screen sizes
      windowSize={5}
    />
  );
};

export default EventList;
