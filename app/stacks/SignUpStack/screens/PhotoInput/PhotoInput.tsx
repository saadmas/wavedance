import * as React from 'react';
import Title from '../../../../components/Title/Title';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import NextScreenButton from '../../../../components/NextScreenButton/NextScreenButton';
import { Button, FAB, Surface, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Image, View } from 'react-native';
import LottieAnimation from '../../../../components/LottieAnimation/LottieAnimation';

interface PhotoInputProps extends SignUpStepProps {}

const PhotoInput = ({ goToNextStep }: PhotoInputProps) => {
  const { colors } = useTheme();
  const [photoUri, setPhotoUri] = React.useState<string | undefined>(undefined);
  const [isLoadingPhoto, setIsLoadingPhoto] = React.useState<boolean>(false);

  const dispatch = useSignUpDispatch();
  const borderRadius = 10;

  const onPhotoSubmit = () => {
    if (photoUri) {
      dispatch({ type: 'PROFILE_PHOTO_UPDATE', payload: photoUri });
      goToNextStep();
    }
  };

  const onUploadPhoto = async () => {
    setIsLoadingPhoto(true);
    const imagePickResponse = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    setIsLoadingPhoto(false);

    if (!imagePickResponse.cancelled) {
      setPhotoUri(imagePickResponse.uri);
    }
  };

  const renderImageContent = () => {
    if (isLoadingPhoto) {
      return (
        <LottieAnimation
          source={require(`../../../../../assets/animations/loading-photo.json`)}
          finalFramePosition={1}
          style={{ height: 50, width: 50 }}
          shouldLoop={true}
        />
      );
    }

    if (photoUri) {
      return (
        <Image
          source={{ uri: photoUri }}
          style={{ height: '100%', width: '100%' }}
          borderRadius={borderRadius}
          resizeMode="cover"
        />
      );
    }

    return (
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
      {photoUri && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          {/* /// use IconButton */}
          <FAB
            onPress={onUploadPhoto}
            icon={'pencil-outline'}
            theme={{ colors: { accent: colors.onSurface } }}
            style={{ width: 40, height: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
          />
          <NextScreenButton onPress={onPhotoSubmit} isDisabled={!photoUri} />
        </View>
      )}
    </>
  );
};

export default PhotoInput;
