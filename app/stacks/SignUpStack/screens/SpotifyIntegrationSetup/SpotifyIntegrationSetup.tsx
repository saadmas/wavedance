import * as React from 'react';
import Title from '../../../../components/Title/Title';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';

interface SpotifyIntegrationSetupProps extends SignUpStepProps {}

const SpotifyIntegrationSetup = ({ goToNextStep }: SpotifyIntegrationSetupProps) => {
  const dispatch = useSignUpDispatch();

  // const onInstagramHandleSubmit = (instagramHandle: string) => {
  //   dispatch({ type: 'INSTAGRAM_HANDLE_UPDATE', payload: instagramHandle });
  //   goToNextStep();
  // };

  // const onInstagramHandleSkip = () => {
  //   goToNextStep();
  // };

  return (
    <>
      <Title title="Connect to Spotify" />
    </>
  );
};

export default SpotifyIntegrationSetup;
