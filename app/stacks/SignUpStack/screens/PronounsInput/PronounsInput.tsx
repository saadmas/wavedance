import * as React from 'react';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import { Pronoun } from '../../../../state/enums/pronoun';
import MultiPillSelector from '../../../../components/MultiPillSelector/MultiPillSelector';

interface PronounsInputProps extends SignUpStepProps {}

const PronounsInput = ({ goToNextStep }: PronounsInputProps) => {
  const [selectedPronouns, setSelectedPronouns] = React.useState<Set<string>>(new Set());
  const dispatch = useSignUpDispatch();
  const maxPronouns = 3;
  const minPronouns = 0;

  const onPronounsSubmit = () => {
    dispatch({ type: 'PRONOUNS_UPDATE', payload: selectedPronouns });
    goToNextStep();
  };

  const onPronounToggle = (pronoun: string) => {
    setSelectedPronouns(prevSelectedPronouns => {
      if (prevSelectedPronouns.has(pronoun)) {
        prevSelectedPronouns.delete(pronoun);
      } else if (prevSelectedPronouns.size < maxPronouns) {
        prevSelectedPronouns.add(pronoun);
      }

      return new Set(prevSelectedPronouns);
    });
  };

  const isNextButtonDisabled = () => {
    const doPronounsMeetRequirements = selectedPronouns.size >= minPronouns;
    return !doPronounsMeetRequirements;
  };

  return (
    <MultiPillSelector
      titleText={'What are your pronouns?'}
      minPillCount={minPronouns}
      maxPillCount={maxPronouns}
      pillTexts={Object.values(Pronoun)}
      selectedPillTexts={selectedPronouns}
      isSubmitButtonDisabled={isNextButtonDisabled()}
      onPillToggle={onPronounToggle}
      onSubmit={onPronounsSubmit}
    />
  );
};

export default PronounsInput;
