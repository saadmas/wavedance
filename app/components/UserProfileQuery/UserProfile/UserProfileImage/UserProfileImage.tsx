import * as React from 'react';
import { ImageBackground } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { ResponseStatus } from '../../../../state/enums/responseStatus';

interface UserProfileImageProps {
  photoUri?: string;
}

const UserProfileImage = ({ photoUri }: UserProfileImageProps) => {
  const [responseStatus, setResponseStatus] = React.useState<ResponseStatus>(ResponseStatus.Loading);
  const { colors } = useTheme();

  const borderRadius = 10;
  const height = 350;
  const width = '100%';

  const onError = () => {
    //* use WD image
    setResponseStatus(ResponseStatus.Error);
  };

  const onLoad = () => {
    setResponseStatus(ResponseStatus.Success);
  };

  const renderLoader = () => {
    if (responseStatus === ResponseStatus.Loading) {
      return <ActivityIndicator size={40} style={{ alignItems: 'center', height: '90%' }} />;
    }
  };

  return (
    <>
      <ImageBackground
        key={photoUri}
        onError={onError}
        onLoad={onLoad}
        source={{ uri: photoUri || undefined }}
        style={{ height, width, backgroundColor: colors.onSurface, borderRadius, marginBottom: 10 }}
        borderRadius={borderRadius}
        resizeMode="cover"
      >
        {renderLoader()}
      </ImageBackground>
    </>
  );
};

export default UserProfileImage;
