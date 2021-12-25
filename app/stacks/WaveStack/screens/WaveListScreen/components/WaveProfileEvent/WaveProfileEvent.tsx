import * as React from 'react';
import { View } from 'react-native';
import { WaveEvent } from '../../../../../../firebase/types';
import WaveProfileEventImage from '../WaveProfileEventImage/WaveProfileEventImage';

interface WaveProfileEventProps {
  event: WaveEvent;
}

const WaveProfileEvent = ({ event }: WaveProfileEventProps) => {
  return (
    <View>
      <WaveProfileEventImage eventId={event.id} locationId={event.locationId} />
    </View>
  );
};

export default WaveProfileEvent;
