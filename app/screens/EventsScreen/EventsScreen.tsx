import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import EventListQuery from './components/EventListQuery/EventListQuery';

const EventsScreen = () => {
  const [searchText, setSearchText] = React.useState<string>('');

  return (
    <View>
      <Searchbar
        onChangeText={setSearchText}
        value={searchText}
        style={{ margin: 20, borderRadius: 5, fontSize: 10, height: 40 }}
        inputStyle={{ fontSize: 12 }}
      />
      <EventListQuery searchText={searchText} />
    </View>
  );
};

export default EventsScreen;
