import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text } from 'react-native-paper';
import { Path } from '../../../../routing/paths';
import { EventStackParamList } from '../../EventStack';

type EventCarouselScreenProps = NativeStackScreenProps<EventStackParamList, Path.EventCarousel>;

const EventCarouselScreen = (props: EventCarouselScreenProps) => {
  return <Text>Event Carousel incoming!</Text>;
};

export default EventCarouselScreen;
