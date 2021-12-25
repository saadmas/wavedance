import * as React from 'react';
import { View } from 'react-native';
import { EdmTrainEvent } from '../../../../../../edmTrain/types';
import WaveProfileEventImage from '../WaveProfileEventImage/WaveProfileEventImage';

interface WaveProfileEventProps {
  event: EdmTrainEvent;
}

const WaveProfileEvent = ({ event }: WaveProfileEventProps) => {
  return (
    <View>
      <WaveProfileEventImage eventId={event.id} />
    </View>
  );
};

export default WaveProfileEvent;
