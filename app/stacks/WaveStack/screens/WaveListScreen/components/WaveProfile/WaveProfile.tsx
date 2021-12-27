import { NavigationContext } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Card, Divider } from 'react-native-paper';
import { WaveEvent } from '../../../../../../firebase/types';
import { Path } from '../../../../../../routing/paths';
import WaveCurrentEventIndicator from '../WaveCurrentEventIndicator/WaveCurrentEventIndicator';
import WaveProfileEvent from '../WaveProfileEvent/WaveProfileEvent';
import WaveProfileEventList from '../WaveProfileEventList/WaveProfileEventList';
import WaveProfileName from '../WaveProfileName/WaveProfileName';
import WaveProfilePhoto from '../WaveProfilePhoto/WaveProfilePhoto';

interface WaveProfileProps {
  userId: string;
  events: WaveEvent[];
}

const WaveProfile = ({ userId, events }: WaveProfileProps) => {
  const navigation = React.useContext(NavigationContext);
  const [eventIndex, setEventIndex] = React.useState(0);

  const event = events[eventIndex];

  const openFullProfile = () => {
    navigation?.navigate(Path.WaveFullUserProfile, { event, userId });
  };

  const goToNextEvent = () => {
    setEventIndex(prevIndex => (prevIndex + 1 === events.length ? 0 : prevIndex + 1));
  };

  const goToPreviousEvent = () => {
    setEventIndex(prevIndex => (prevIndex - 1 === -1 ? events.length - 1 : prevIndex - 1));
  };

  return (
    <Card style={{ padding: 10, marginVertical: 15 }}>
      <TouchableWithoutFeedback onPress={openFullProfile}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 10 }}>
            <WaveProfilePhoto userId={userId} />
          </View>
          <WaveProfileName userId={userId} />
        </View>
        <Divider style={{ marginTop: 10 }} />
      </TouchableWithoutFeedback>
      <WaveProfileEventList
        goToNextEvent={goToNextEvent}
        goToPreviousEvent={goToPreviousEvent}
        event={event}
        eventCount={events.length}
      />
      <WaveCurrentEventIndicator eventCount={events.length} currentEventIndex={eventIndex} />
    </Card>
  );
};

export default WaveProfile;
