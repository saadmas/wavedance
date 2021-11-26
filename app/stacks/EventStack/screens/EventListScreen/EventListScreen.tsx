import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { getEdmTrainCities } from '../../../../edmTrain/locations';
import { EdmTrainLocation } from '../../../../edmTrain/types';
import { getEdmTrainLocationFromUserCurrentLocation } from '../../../../edmTrain/utils';
import { FirebaseNode, UserAdditionalInfo } from '../../../../firebase/keys';
import { getFirebasePath } from '../../../../firebase/utils';
import { Path } from '../../../../routing/paths';
import { EventStackParamList } from '../../EventStack';
import EventListFilterRow from './components/EventListFilterRow/EventListFilterRow';
import EventListQuery from './components/EventListQuery/EventListQuery';
import * as SecureStore from 'expo-secure-store';
import { SecureStoreKey } from '../../../../secureStore/keys';
import useDebounce from '../../../../hooks/useDebounce';

type EventListScreenNavProps = NativeStackScreenProps<EventStackParamList, Path.EventList>;

interface EventListScreenProps extends EventListScreenNavProps {}

const EventListScreen = ({ navigation, route }: EventListScreenProps) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [location, setLocation] = React.useState<EdmTrainLocation | undefined>(route.params?.location);
  const [isFavoriteList, setFavoriteList] = React.useState(false);

  const debouncedSearchText = useDebounce(searchText, 200);

  React.useEffect(() => {
    if (location) {
      return;
    }

    const setDefaultLocation = () => {
      const nycId = 70;
      const defaultLocation = getEdmTrainCities().get(nycId);
      setLocation(defaultLocation);
    };

    const initializeUserLocation = async () => {
      try {
        const selectedLocationString = await SecureStore.getItemAsync(SecureStoreKey.UserSelectedLocation);
        if (selectedLocationString) {
          const selectedLocation = JSON.parse(selectedLocationString);
          setLocation(selectedLocation);
          return;
        }

        const uid = firebase.auth().currentUser?.uid;
        if (!uid) {
          throw Error('Failed to run getUserLocationFromFirebase, uid undefined');
        }

        const userCurrentLocationPath = getFirebasePath(
          FirebaseNode.UserAdditionalInfo,
          uid,
          UserAdditionalInfo.CurrentLocation
        );

        const userCurrentLocationSnapshot = await firebase.database().ref(userCurrentLocationPath).get();
        const userCurrentLocation = userCurrentLocationSnapshot.val();
        if (!userCurrentLocation) {
          throw Error(`Failed to run getUserLocationFromFirebase, userCurrentLocation: ${userCurrentLocation}`);
        }

        const edmTrainCurrentLocation = getEdmTrainLocationFromUserCurrentLocation(userCurrentLocation);
        if (!edmTrainCurrentLocation) {
          throw Error(`Failed to run getUserLocationFromFirebase, edmTrainCurrentLocation: ${edmTrainCurrentLocation}`);
        }

        setLocation(edmTrainCurrentLocation);
      } catch (e) {
        setDefaultLocation();
      }
    };

    initializeUserLocation();
  }, []);

  React.useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  React.useEffect(() => {
    setSearchText('');
  }, [location]);

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
      <EventListQuery searchText={debouncedSearchText} locationId={location?.id} />
    </View>
  );
};

export default EventListScreen;
