import * as React from 'react';
import { ListRenderItemInfo, View, VirtualizedList } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { MatchListItem } from '../../MatchListScreen';

interface MatchListProps {
  listItems: MatchListItem[];
}

const MatchList = ({ listItems }: MatchListProps) => {
  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<MatchListItem>): JSX.Element => (
      <View>
        <Avatar.Image source={{ uri: item.photoUri }} size={20} />
        <View>
          <Text>{item.name}</Text>
          <Text>{item.lastMessageSent?.message}</Text>
        </View>
      </View>
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
      contentContainerStyle={{ paddingBottom: 150 }}
      // ListEmptyComponent={renderNoData} ///
      removeClippedSubviews={true}
      initialNumToRender={10} //* double check 1 is ok for all screen sizes
      windowSize={5}
    />
  );
};

export default MatchList;
