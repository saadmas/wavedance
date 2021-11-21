import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import { Path } from '../../../../routing/paths';
import { EventStackParamList } from '../../EventStack';
import EventListFilterRow from './components/EventListFilterRow/EventListFilterRow';
import EventListQuery from './components/EventListQuery/EventListQuery';

type EventListScreenNavProps = NativeStackScreenProps<EventStackParamList, Path.EventList>;

interface EventListScreenProps extends EventListScreenNavProps {}

const EventListScreen = ({ navigation }: EventListScreenProps) => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = React.useState<string>('');
  const [locationId, setLocationId] = React.useState<number | null>(null);
  const [isFavoriteList, setFavoriteList] = React.useState(false);

  const onFavoriteSwitch = () => setFavoriteList(prev => !prev);

  const onLocationClick = () => {
    navigation.navigate(Path.CurrentLocationSelect);
  };

  return (
    <View>
      <Searchbar
        onChangeText={setSearchText}
        value={searchText}
        style={{ margin: 20, marginBottom: 0, marginTop: 0, borderRadius: 5, fontSize: 10, height: 40 }}
        inputStyle={{ fontSize: 12 }}
      />
      <EventListFilterRow
        onFavoriteSwitch={onFavoriteSwitch}
        isFavoriteList={isFavoriteList}
        onLocationClick={onLocationClick}
      />
      <EventListQuery searchText={searchText} />
    </View>
  );
};

export default EventListScreen;
