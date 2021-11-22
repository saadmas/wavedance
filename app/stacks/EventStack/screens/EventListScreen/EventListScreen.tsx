import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import { View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import { getEdmTrainCities } from '../../../../edmTrain/locations';
import { EdmTrainLocation } from '../../../../edmTrain/types';
import { getEdmTrainLocationFromUserCurrentLocation } from '../../../../edmTrain/utils';
import { FirebaseNode, UserAdditionalInfo } from '../../../../firebase/keys';
import { getFirebasePath } from '../../../../firebase/utils';
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
    if (location) {
      return;
    }

    const setDefaultLocation = () => {
      const nycId = 70;
      const defaultLocation = getEdmTrainCities().get(nycId);
      setLocation(defaultLocation);
    };

    /// test this fn
    const setUserLocationFromFirebase = async () => {
      try {
        const uid = firebase.auth().currentUser?.uid;

        if (!uid) {
          // setDefaultLocation();
          throw Error('Failed to run getUserLocationFromFirebase, uid undefined');
        }

        const userSelectedLocationPath = getFirebasePath(FirebaseNode.UserSelectedLocation, uid);
        const userSelectedLocationSnapshot = await firebase.database().ref(userSelectedLocationPath).get();
        const userSelectedLocation = userSelectedLocationSnapshot.val();

        if (userSelectedLocation) {
          setLocation(userSelectedLocation);
          return;
        }

        const userCurrentLocationPath = getFirebasePath(
          FirebaseNode.UserAdditionalInfo,
          uid,
          UserAdditionalInfo.CurrentLocation
        );
        const userCurrentLocationSnapshot = await firebase.database().ref(userCurrentLocationPath).get();
        const userCurrentLocation = userCurrentLocationSnapshot.val();

        if (userCurrentLocation) {
          const edmTrainCurrentLocation = getEdmTrainLocationFromUserCurrentLocation(userCurrentLocation);
          if (edmTrainCurrentLocation) {
            setLocation(userCurrentLocation);
          }
        }
      } catch {
        setDefaultLocation();
      }
    };

    setUserLocationFromFirebase();
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