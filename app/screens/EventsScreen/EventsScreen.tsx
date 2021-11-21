import * as React from 'react';
import { View } from 'react-native';
import { Button, Searchbar, useTheme } from 'react-native-paper';
import EventListFilterRow from './components/EventListFilterRow/EventListFilterRow';
import EventListQuery from './components/EventListQuery/EventListQuery';

const EventsScreen = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = React.useState<string>('');
  const [locationId, setLocationId] = React.useState<number | null>(null);
  const [isFavoriteList, setFavoriteList] = React.useState(false);

  const onFavoriteSwitch = () => setFavoriteList(prev => !prev);

  return (
    <View>
      <Searchbar
        onChangeText={setSearchText}
        value={searchText}
        style={{ margin: 20, marginBottom: 0, marginTop: 0, borderRadius: 5, fontSize: 10, height: 40 }}
        inputStyle={{ fontSize: 12 }}
      />
      <EventListFilterRow onFavoriteSwitch={onFavoriteSwitch} isFavoriteList={isFavoriteList} />
      <EventListQuery searchText={searchText} />
    </View>
  );
};

export default EventsScreen;
