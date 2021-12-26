import * as React from 'react';
import { WaveEvent } from '../../../../../../firebase/types';
import WaveProfileEvent from '../WaveProfileEvent/WaveProfileEvent';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';

interface WaveProfileEventListProps {
  event: WaveEvent;
  goToPreviousEvent: () => void;
  goToNextEvent: () => void;
}

const WaveProfileEventList = ({ event, goToNextEvent, goToPreviousEvent }: WaveProfileEventListProps) => {
  const animatableRef = React.useRef<Animatable.View & View>(null);

  const onSwipeLeft = () => {
    animatableRef.current?.fadeOutRight?.();
    goToNextEvent();
  };

  return (
    <GestureRecognizer onSwipeLeft={onSwipeLeft} onSwipeRight={goToPreviousEvent}>
      <Animatable.View ref={animatableRef}>
        <WaveProfileEvent event={event} />
      </Animatable.View>
    </GestureRecognizer>
  );
};

export default WaveProfileEventList;
