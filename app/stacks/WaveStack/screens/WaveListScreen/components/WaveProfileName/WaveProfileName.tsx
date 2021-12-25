import * as React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { getUserBasicInfo } from '../../../../../../firebase/queries';

interface WaveProfileProps {
  userId: string;
}

const WaveProfile = ({ userId }: WaveProfileProps) => {
  const [name, setName] = React.useState<string>('');
  const { fonts } = useTheme();

  React.useEffect(() => {
    const fetchName = async () => {
      const basicInfo = await getUserBasicInfo(userId);
      setName(basicInfo?.name ?? '');
    };

    fetchName();
  }, [userId]);

  return <Text style={{ fontFamily: fonts.thin.fontFamily, fontSize: 25 }}>{name}</Text>;
};

export default WaveProfile;
