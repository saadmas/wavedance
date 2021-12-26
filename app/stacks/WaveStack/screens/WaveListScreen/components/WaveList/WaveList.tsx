import * as React from 'react';
import { ScrollView } from 'react-native';
import { defaultScreenPadding } from '../../../../../../styles/theme';
import { Waves } from '../../WaveListScreen';
import WaveProfile from '../WaveProfile/WaveProfile';

interface WaveListProps {
  waves: Waves;
}

const WaveList = ({ waves }: WaveListProps) => {
  const userProfiles = [...waves.entries()].map(([userId, events]) => (
    <WaveProfile key={userId} userId={userId} events={events} />
  ));

  return (
    <ScrollView
      contentContainerStyle={{ padding: defaultScreenPadding }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {userProfiles}
    </ScrollView>
  );
};

export default WaveList;
