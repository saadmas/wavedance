import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import { EdmTrainLocation } from '../../../../edmTrain/types';
import { Path } from '../../../../routing/paths';
import { EventStackParamList } from '../../EventStack';
import EventListFilterRow from './components/EventListFilterRow/EventListFilterRow';
import EventListQuery from './components/EventListQuery/EventListQuery';

type EventListScreenNavProps = NativeStackScreenProps<EventStackParamList, Path.EventList>;

interface EventListScreenProps extends EventListScreenNavProps {}

const EventListScreen = ({ navigation, route }: EventListScreenProps) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [location, setLocation] = React.useState<EdmTrainLocation | undefined>(route.params?.location);
  const [isFavoriteList, setFavoriteList] = React.useState(false);

  React.useEffect(() => {
    if (!location) {
      /// try get from DB
    }

    /// try get from DB current location

    // default to NY
  }, []);

  React.useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  const onFavoriteSwitch = () => setFavoriteList(prev => !prev);

  const onLocationClick = () => {
    navigation.navigate(Path.LocationSelect);
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
        location={location}
        onFavoriteSwitch={onFavoriteSwitch}
        isFavoriteList={isFavoriteList}
        onLocationClick={onLocationClick}
      />
      <EventListQuery searchText={searchText} locationId={location?.id} />
    </View>
  );
};

export default EventListScreen;
