import * as React from 'react';
import { WaveEvent } from '../../../../../../firebase/types';
import WaveProfileEvent from '../WaveProfileEvent/WaveProfileEvent';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';

interface WaveProfileEventListProps {
  event: WaveEvent;
  eventCount: number;
  goToPreviousEvent: () => void;
  goToNextEvent: () => void;
}

const WaveProfileEventList = ({ event, goToNextEvent, goToPreviousEvent, eventCount }: WaveProfileEventListProps) => {
  const animationDuration = 400;
  const animatableRef = React.useRef<Animatable.View & View>(null);

  const onSwipeLeft = async () => {
    goToNextEvent();

    if (eventCount > 1) {
      animatableRef.current?.fadeInRight?.(animationDuration);
    }
  };

  const onSwipeRight = () => {
    goToPreviousEvent();

    if (eventCount > 1) {
      animatableRef.current?.fadeInLeft?.(animationDuration);
    }
  };

  return (
    <GestureRecognizer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
      <Animatable.View ref={animatableRef}>
        <WaveProfileEvent event={event} />
      </Animatable.View>
    </GestureRecognizer>
  );
};

export default WaveProfileEventList;
