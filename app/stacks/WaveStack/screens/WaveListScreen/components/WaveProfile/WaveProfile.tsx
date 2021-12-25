import { NavigationContext } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { WaveEvent } from '../../../../../../firebase/types';
import { Path } from '../../../../../../routing/paths';
import WaveProfileEvent from '../WaveProfileEvent/WaveProfileEvent';
import WaveProfileName from '../WaveProfileName/WaveProfileName';
import WaveProfilePhoto from '../WaveProfilePhoto/WaveProfilePhoto';

interface WaveProfileProps {
  userId: string;
  events: WaveEvent[];
}

const WaveProfile = ({ userId, events }: WaveProfileProps) => {
  const [eventIndex, setEventIndex] = React.useState(0);

  const navigation = React.useContext(NavigationContext);

  const openFullProfile = () => {
    navigation?.navigate(Path.WaveFullUserProfile, { event: events[eventIndex], userId });
  };

  return (
    <Card style={{ padding: 10, marginVertical: 15 }} onPress={openFullProfile}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 10 }}>
          <WaveProfilePhoto userId={userId} />
        </View>
        <WaveProfileName userId={userId} />
      </View>
      <Divider style={{ marginTop: 10 }} />
      <WaveProfileEvent event={events[eventIndex]} />
    </Card>
  );
};

export default WaveProfile;
