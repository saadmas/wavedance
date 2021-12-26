import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import UserProfileQuery from '../../../../components/UserProfileQuery/UserProfileQuery';
import { Path } from '../../../../routing/paths';
import { WaveStackParamList } from '../../WaveStack';

type WaveFullUserProfileScreenNavProps = NativeStackScreenProps<WaveStackParamList, Path.WaveFullUserProfile>;

interface WaveFullUserProfileScreenProps extends WaveFullUserProfileScreenNavProps {}

const WaveFullUserProfileScreen = ({ route, navigation }: WaveFullUserProfileScreenProps) => {
  const { userId, event } = route.params;

  const onProfileViewComplete = () => {
    navigation.goBack();
  };

  return (
    <UserProfileQuery userId={userId} event={event} onProfileViewComplete={onProfileViewComplete} isWaveMode={true} />
  );
};

export default WaveFullUserProfileScreen;
