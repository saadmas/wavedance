import * as React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import WaveProfileName from '../WaveProfileName/WaveProfileName';
import WaveProfilePhoto from '../WaveProfilePhoto/WaveProfilePhoto';

interface WaveProfileProps {
  userId: string;
  events: EdmTrainEvent[];
}

const WaveProfile = ({ userId }: WaveProfileProps) => {
  return (
    <Card style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 10 }}>
          <WaveProfilePhoto userId={userId} />
        </View>
        <WaveProfileName userId={userId} />
      </View>
    </Card>
  );
};

export default WaveProfile;
