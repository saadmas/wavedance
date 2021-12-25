import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { getPhotoUri } from '../../../../../../firebase/queries';
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

  return <ScrollView contentContainerStyle={{ padding: defaultScreenPadding }}>{userProfiles}</ScrollView>;
};

export default WaveList;
