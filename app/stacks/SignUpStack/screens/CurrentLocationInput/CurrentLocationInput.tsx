import * as React from 'react';
import { Button, useTheme } from 'react-native-paper';
import InputCard from '../../../../components/InputCard/InputCard';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';

interface CurrentLocationInputProps extends SignUpStepProps {}

const CurrentLocationInput = ({ goToNextStep }: CurrentLocationInputProps) => {
  const { colors } = useTheme();
  const dispatch = useSignUpDispatch();

  const onCurrentLocationEnter = (currentLocation: string) => {
    dispatch({ type: 'CURRENT_LOCATION_UPDATE', payload: currentLocation });
    goToNextStep();
  };

  const onCurrentLocationSameAsHometown = () => {
    dispatch({ type: 'CURRENT_LOCATION_AS_HOMETOWN' });
    goToNextStep();
  };

  return (
    <>
      <InputCard
        title="Where do you live?"
        onSubmit={onCurrentLocationEnter}
        maxLength={50}
        placeholder="e.g. Karachi, Pakistan"
      />
      <Button
        mode="outlined"
        style={{ width: 150, borderRadius: 40, marginTop: 20, borderColor: colors.text }}
        labelStyle={{ fontSize: 10 }}
        compact={true}
        uppercase={false}
        onPress={onCurrentLocationSameAsHometown}
        theme={{ colors: { primary: colors.text }, fonts: { regular: { fontFamily: 'Montserrat_400Regular' } } }}
      >
        Live in hometown
      </Button>
    </>
  );
};

export default CurrentLocationInput;
