import * as React from 'react';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import { Passion } from '../../../../state/enums/passion';
import MultiPillSelector from '../../../../components/MultiPillSelector/MultiPillSelector';

interface PassionsInputProps extends SignUpStepProps {}

const PassionsInput = ({ goToNextStep }: PassionsInputProps) => {
  const [selectedPassions, setSelectedPassions] = React.useState<Set<string>>(new Set());
  const dispatch = useSignUpDispatch();
  const maxPassions = 5;
  const minPassions = 3;

  const onPassionsSubmit = () => {
    // dispatch({ type: 'BIRTHDAY_UPDATE', payload: birthday.toISOString() });
    goToNextStep();
  };

  const onPassionToggle = (passion: string) => {
    setSelectedPassions(prevSelectedPassions => {
      if (prevSelectedPassions.has(passion)) {
        prevSelectedPassions.delete(passion);
      } else if (prevSelectedPassions.size < maxPassions) {
        prevSelectedPassions.add(passion);
      }

      return new Set(prevSelectedPassions);
    });
  };

  const isNextButtonDisabled = () => {
    const doPassionsMeetRequirements = selectedPassions.size >= minPassions;
    return !doPassionsMeetRequirements;
  };

  return (
    <MultiPillSelector
      titleText={'What are your passions?'}
      minPillCount={minPassions}
      maxPillCount={maxPassions}
      pillTexts={Object.values(Passion)}
      selectedPillTexts={selectedPassions}
      isSubmitButtonDisabled={isNextButtonDisabled()}
      onPillToggle={onPassionToggle}
      onSubmit={onPassionsSubmit}
    />
  );
};

export default PassionsInput;
