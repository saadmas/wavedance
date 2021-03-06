import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Path } from '../../../../routing/paths';
import { EventStackParamList } from '../../EventStack';
import EventCarouselQuery from './components/EventCarouselQuery/EventCarouselQuery';

type EventCarouselScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventCarousel>;

const EventCarouselScreen = ({ route }: EventCarouselScreenProps) => {
  const { waveEvent } = route.params;

  return <EventCarouselQuery event={waveEvent} />;
};

export default EventCarouselScreen;
