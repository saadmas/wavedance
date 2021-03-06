import * as React from 'react';
import { FlatList, Image, ListRenderItemInfo, TouchableWithoutFeedback, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { SpotifyItem } from '../../spotify/types';
import { ResponseStatus } from '../../state/enums/responseStatus';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import NoDataDisplay from '../NoDataDisplay/NoDataDisplay';

interface SpotifyListProps {
  listItems: SpotifyItem[];
  responseStatus: ResponseStatus;
  onItemSelect: (item: SpotifyItem) => void;
}

const SpotifyList = ({ responseStatus, listItems, onItemSelect }: SpotifyListProps) => {
  const imageSize = 50;

  const renderItem = ({ item }: ListRenderItemInfo<SpotifyItem>) => {
    const onPress = () => {
      onItemSelect(item);
    };

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
          <Image
            source={item.photoUri ? { uri: item.photoUri } : require('../../../assets/icons/spotify-icon.png')}
            style={{ width: imageSize, height: imageSize, marginRight: 10 }}
            resizeMode="cover"
          />
          <View>
            <Text>{item.title}</Text>
            {item.subtitle ? <Text style={{ fontSize: 10 }}>{item.subtitle}</Text> : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
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
      contentInset={{ bottom: 150, top: 20 }}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={renderNoData}
    />
  );
};

export default SpotifyList;
