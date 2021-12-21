import firebase from 'firebase';
import * as React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import NoDataDisplay from '../../../../../../components/NoDataDisplay/NoDataDisplay';
import { getUserEventIgnoresPath } from '../../../../../../firebase/utils';

interface EventCarouselEndProps {
  eventId: number;
  refetchMembers: () => void;
  isPermanentEnd?: boolean;
}

const EventCarouselEnd = ({ eventId, refetchMembers, isPermanentEnd }: EventCarouselEndProps) => {
  const { colors } = useTheme();

  const resetIgnoredMembers = async () => {
    //f remove foo

    // const uid = firebase.auth().currentUser?.uid ?? 'foo';
    const uid = 'foo';
    const path = getUserEventIgnoresPath(uid, eventId);

    try {
      //f remove foo
      await firebase.database().ref(path).remove();
    } catch (e) {
      console.error('resetIgnoredMembers failed');
      console.error(e);
      console.error(`uid: ${uid}`);
      console.error(`eventId: ${eventId}`);
    }
  };

  const onPress = () => {
    resetIgnoredMembers();
    refetchMembers();
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <NoDataDisplay
        noDataText={
          isPermanentEnd
            ? "You've waved at all members interested in this event"
            : "You've viewed all members interested in this event"
        }
        shouldLoop={false}
        source={require('../../../../../../../assets/animations/purple-success.json')}
      />
      {!isPermanentEnd && (
        <Button
          mode="outlined"
          icon="refresh"
          style={{ width: '80%', borderRadius: 40, marginTop: 50, borderColor: colors.text }}
          labelStyle={{ fontSize: 12, color: colors.text }}
          uppercase={false}
          onPress={onPress}
          theme={{ colors: { primary: colors.text } }}
        >
          Reset ignored members
        </Button>
      )}
    </View>
  );
};

export default EventCarouselEnd;
