import * as React from 'react';
import { Image } from 'react-native';

interface UserProfileImageProps {
  userPhotoUri: string;
}

const UserProfileImage = ({ userPhotoUri }: UserProfileImageProps) => {
  const onError = () => {
    //* use WD image
  };

  if (!userPhotoUri) {
    return null;
  }

  return (
    <Image
      onError={onError}
      source={{ uri: userPhotoUri }}
      style={{ height: 350, width: '100%' }}
      borderRadius={10}
      resizeMode="cover"
    />
  );
};

export default UserProfileImage;
