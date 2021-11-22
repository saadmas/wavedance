import * as React from 'react';
import { ListRenderItemInfo, View, VirtualizedList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LottieAnimation from '../../../../../../components/LottieAnimation/LottieAnimation';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import EventCard from '../EventCard/EventCard';

export type DisplayEvent = EdmTrainEvent;

interface EventListProps {
  events: DisplayEvent[];
  searchText: string;
  isFavoriteList?: boolean;
}

const EventList = ({ events, searchText }: EventListProps) => {
  const { fonts } = useTheme();
  const listRef = React.useRef<VirtualizedList<EdmTrainEvent>>(null);
  const [filteredEvents, setFilteredEvents] = React.useState<DisplayEvent[]>(events);

  React.useEffect(() => {
    if (!searchText) {
      setFilteredEvents(events);
      return;
    }

    const nextFilteredEvents = events.filter(event => {
      const lowerCaseSearchText = searchText.trim().toLowerCase();
      const isNameMatch = event.name?.toLowerCase?.()?.includes(lowerCaseSearchText);
      const isArtistMatch = event.artistList?.some(artist => artist.name.toLowerCase().includes(lowerCaseSearchText));
      const isVenueMatch = event.venue?.name?.toLowerCase?.()?.includes(lowerCaseSearchText);
      const isMatch = isNameMatch || isArtistMatch || isVenueMatch;
      return isMatch;
    });

    setFilteredEvents(nextFilteredEvents);

    if (nextFilteredEvents.length) {
      listRef.current?.scrollToIndex({ index: 0 });
    }
  }, [searchText]);

  const getItemCount = (listItems: DisplayEvent[]): number => listItems.length;

  const getItem = (listItems: DisplayEvent[], index: number): DisplayEvent => listItems[index];

  const getItemKey = (listItem: DisplayEvent): string => listItem.id.toString();

  const renderItem = (itemInfo: ListRenderItemInfo<EdmTrainEvent>): JSX.Element => <EventCard event={itemInfo.item} />;

  const renderNoData = () => {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
        <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 18, letterSpacing: 0.8 }}>
          Bummer, no events found
        </Text>
        <LottieAnimation
          source={require(`../../../../../../../assets/animations/bummer.json`)}
          finalFramePosition={1}
          shouldLoop={true}
          style={{
            width: 200,
            height: 200,
            marginTop: 5,
          }}
        />
      </View>
    );
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
    />
  );
};

export default EventList;