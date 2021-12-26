import * as React from 'react';
import { Avatar } from 'react-native-paper';
import { getPhotoUri } from '../../../../../../firebase/queries';

interface WaveProfilePhotoProps {
  userId: string;
}

export const wavePhotoSize = 100;

const WaveProfilePhoto = ({ userId }: WaveProfilePhotoProps) => {
  const [uri, setUri] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const fetchPhotoUri = async () => {
      const photoUri = await getPhotoUri(userId);
      setUri(photoUri);
    };

    fetchPhotoUri();
  }, [userId]);

  return <Avatar.Image source={{ uri }} size={wavePhotoSize} />;
};

export default WaveProfilePhoto;
