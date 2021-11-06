import * as React from 'react';
import Title from '../../../../components/Title/Title';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import NextScreenButton from '../../../../components/NextScreenButton/NextScreenButton';
import { Button, FAB, IconButton, Surface } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

interface PhotoInputProps extends SignUpStepProps {}

const PhotoInput = ({ goToNextStep }: PhotoInputProps) => {
  const [photoUri, setPhotoUri] = React.useState<string | undefined>(undefined);
  const dispatch = useSignUpDispatch();
  const borderRadius = 10;

  const onPhotoSubmit = () => {
    if (photoUri) {
      dispatch({ type: 'PROFILE_PHOTO_UPDATE', payload: photoUri });
      goToNextStep();
    }
  };

  const onUploadPhoto = async () => {
    const imagePickResponse = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!imagePickResponse.cancelled) {
      setPhotoUri(imagePickResponse.uri);
    }
  };

  const renderImageContent = () => {
    return photoUri ? (
      <Image
        source={{ uri: photoUri }}
        style={{ height: '100%', width: '100%' }}
        borderRadius={borderRadius}
        resizeMode="cover"
      />
    ) : (
      <Button
        icon="upload"
        onPress={onUploadPhoto}
        theme={{ colors: { primary: '#fff' } }}
        labelStyle={{ fontSize: 10 }}
      >
        Upload photo
      </Button>
    );
  };

  return (
    <>
      <Title title="Choose a profile picture" />
      <Surface
        style={{
          marginTop: 10,
          height: '55%',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 12,
          borderRadius,
        }}
      >
        {renderImageContent()}
      </Surface>
      <NextScreenButton onPress={onPhotoSubmit} isDisabled={!photoUri} />
      {photoUri && (
        <FAB
          onPress={onUploadPhoto}
          icon={'pencil-outline'}
          style={{ position: 'absolute', bottom: 80, left: 40 }}
          theme={{ colors: { accent: '#878484' } }}
        />
      )}
    </>
  );
};

export default PhotoInput;
