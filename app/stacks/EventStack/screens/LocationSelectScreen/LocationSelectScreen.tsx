import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firebase from 'firebase';
import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { EdmTrainLocation } from '../../../../edmTrain/types';
import { FirebaseNode } from '../../../../firebase/keys';
import { getFirebasePath } from '../../../../firebase/utils';
import { Path } from '../../../../routing/paths';
import { EventStackParamList } from '../../EventStack';
import LocationList from './components/LocationList';

type LocationSelectScreenNavProps = NativeStackScreenProps<EventStackParamList, Path.LocationSelect>;

interface LocationSelectScreenProps extends LocationSelectScreenNavProps {}

const LocationSelectScreen = ({ navigation }: LocationSelectScreenProps) => {
  const [searchText, setSearchText] = React.useState<string>('');

  /// test this fn
  const saveSelectedLocationInFirebase = async (location: EdmTrainLocation) => {
    try {
      const uid = firebase.auth().currentUser?.uid;

      if (!uid) {
        throw Error('Failed to run saveSelectedLocationInFirebase, uid undefined');
      }

      const userSelectedLocationPath = getFirebasePath(FirebaseNode.UserSelectedLocation, uid);
      firebase.database().ref(userSelectedLocationPath).set(location);
    } catch {}
  };

  const onLocationSelect = async (location: EdmTrainLocation) => {
    await saveSelectedLocationInFirebase(location);
    navigation.navigate(Path.EventList, { location });
  };

  return (
    <View style={{ padding: 40 }}>
      <Searchbar
        onChangeText={setSearchText}
        value={searchText}
        style={{ borderRadius: 5, fontSize: 10, height: 40, margin: 10, marginBottom: 20 }}
        inputStyle={{ fontSize: 12 }}
      />
      <LocationList searchText={searchText.toLowerCase().trim()} onLocationSelect={onLocationSelect} />
    </View>
  );
};

export default LocationSelectScreen;
