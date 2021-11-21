import * as React from 'react';
import { View } from 'react-native';
import { Button, Searchbar, useTheme } from 'react-native-paper';
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
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 20,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Button
          mode={isFavoriteList ? 'contained' : 'outlined'}
          style={{ width: 100, borderRadius: 40, borderColor: isFavoriteList ? undefined : colors.text }}
          labelStyle={{ fontSize: 10 }}
          compact={true}
          uppercase={false}
          onPress={onFavoriteSwitch}
          theme={isFavoriteList ? undefined : { colors: { primary: colors.text } }}
          icon="heart-outline"
        >
          Favorites
        </Button>
        <Button
          mode="outlined"
          style={{ flex: 1, marginLeft: 10, borderRadius: 40, borderColor: colors.text }}
          labelStyle={{ fontSize: 10 }}
          compact={true}
          uppercase={false}
          // onPress={onFavoriteSwitch}
          theme={{ colors: { primary: colors.text } }}
          icon="map-marker-outline"
        >
          Grand Rapids, MI
        </Button>
      </View>
      <EventListQuery searchText={searchText} />
    </View>
  );
};

export default EventsScreen;
