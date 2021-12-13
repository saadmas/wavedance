import * as React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SpotifyItem } from '../../spotify/types';
import { ResponseStatus } from '../../state/enums/responseStatus';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import NoDataDisplay from '../NoDataDisplay/NoDataDisplay';

interface SpotifyListProps {
  listItems: SpotifyItem[];
  responseStatus: ResponseStatus;
  onItemSelect: (item: SpotifyItem) => void;
}

const SpotifyList = ({ responseStatus, listItems }: SpotifyListProps) => {
  const renderItem = ({ item }: ListRenderItemInfo<SpotifyItem>) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.subtitle}</Text>
      </View>
    );
  };

  if (responseStatus === ResponseStatus.Error) {
    return <ErrorDisplay />;
  }

  if (responseStatus === ResponseStatus.Loading) {
    return null;
  }

  const renderNoData = React.useCallback(() => {
    return <NoDataDisplay noDataText="Bummer, no items found" />;
  }, []);

  return (
    <FlatList
      data={listItems}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={renderNoData}
    />
  );
};

export default SpotifyList;
