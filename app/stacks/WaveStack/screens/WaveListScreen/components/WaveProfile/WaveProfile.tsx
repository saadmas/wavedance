import * as React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { WaveEvent } from '../../../../../../firebase/types';
import WaveProfileEvent from '../WaveProfileEvent/WaveProfileEvent';
import WaveProfileName from '../WaveProfileName/WaveProfileName';
import WaveProfilePhoto from '../WaveProfilePhoto/WaveProfilePhoto';

interface WaveProfileProps {
  userId: string;
  events: WaveEvent[];
}

const WaveProfile = ({ userId, events }: WaveProfileProps) => {
  return (
    <Card style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 10 }}>
          <WaveProfilePhoto userId={userId} />
        </View>
        <WaveProfileName userId={userId} />
      </View>
      <WaveProfileEvent event={events[0]} />
    </Card>
  );
};

export default WaveProfile;
