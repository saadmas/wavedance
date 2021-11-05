import * as React from 'react';
import Title from '../../../../components/Title/Title';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import NextScreenButton from '../../../../components/NextScreenButton/NextScreenButton';
import { Avatar } from 'react-native-paper';

interface PhotoInputProps extends SignUpStepProps {}

const PhotoInput = ({ goToNextStep }: PhotoInputProps) => {
  const [photo, setPhoto] = React.useState<string | undefined>(undefined);
  const dispatch = useSignUpDispatch();

  const onPhotoSubmit = () => {
    // if (birthday) {
    //   dispatch({ type: 'BIRTHDAY_UPDATE', payload: birthday.toISOString() });
    //   goToNextStep();
    // }
  };

  return (
    <>
      <Title title="Choose a profile picture" />
      <Avatar.Icon size={50} icon="pencil-outline" theme={{ colors: { primary: 'white' } }} />
      <NextScreenButton onPress={onPhotoSubmit} isDisabled={!photo} />
    </>
  );
};

export default PhotoInput;
