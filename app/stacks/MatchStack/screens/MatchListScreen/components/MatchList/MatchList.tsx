import * as React from 'react';
import { ListRenderItemInfo, VirtualizedList } from 'react-native';
import { MatchListItem } from '../../MatchListScreen';
import MatchListRow from '../MatchListRow/MatchListRow';

interface MatchListProps {
  listItems: MatchListItem[];
}

const MatchList = ({ listItems }: MatchListProps) => {
  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<MatchListItem>): JSX.Element => (
      <MatchListRow lastMessageSent={item.lastMessageSent?.message} photoUri={item.photoUri} name={item.name} />
    ),
    []
  );

  const getItemKey = (listItem: MatchListItem): string => listItem.chatId.toString();

  const getItemCount = (listItems: MatchListItem[]): number => listItems.length;

  const getItem = (listItems: MatchListItem[], index: number): MatchListItem => listItems[index];

  const getMockedData = () => {
    const mockedData = [];

    for (let i = 0; i < 10; i++) {
      mockedData.push(listItems[0]);
    }

    return mockedData;
  };

  return (
    <VirtualizedList
      data={getMockedData()} ///
      renderItem={renderItem}
      keyExtractor={getItemKey}
      getItemCount={getItemCount}
      getItem={getItem}
      contentContainerStyle={{ paddingBottom: 100, padding: 20 }}
      // ListEmptyComponent={renderNoData} ///
      removeClippedSubviews={true}
      initialNumToRender={10} //* double check 1 is ok for all screen sizes
      windowSize={5}
    />
  );
};

export default MatchList;
