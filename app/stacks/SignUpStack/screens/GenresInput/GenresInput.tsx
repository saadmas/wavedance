import * as React from 'react';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import { Genre } from '../../../../state/enums/genre';
import MultiPillSelector from '../../../../components/MultiPillSelector/MultiPillSelector';

interface GenresInputProps extends SignUpStepProps {}

const GenresInput = ({ goToNextStep }: GenresInputProps) => {
  const [selectedGenres, setSelectedGenres] = React.useState<Set<string>>(new Set());
  const dispatch = useSignUpDispatch();
  const maxGenres = 5;
  const minGenres = 1;

  const onGenresSubmit = () => {
    // dispatch({ type: 'BIRTHDAY_UPDATE', payload: birthday.toISOString() });
    goToNextStep();
  };

  const onGenreToggle = (genre: string) => {
    setSelectedGenres(prevSelectedGenres => {
      if (prevSelectedGenres.has(genre)) {
        prevSelectedGenres.delete(genre);
      } else if (prevSelectedGenres.size < maxGenres) {
        prevSelectedGenres.add(genre);
      }

      return new Set(prevSelectedGenres);
    });
  };

  const isNextButtonDisabled = () => {
    const doGenresMeetRequirements = selectedGenres.size >= minGenres;
    return !doGenresMeetRequirements;
  };

  return (
    <MultiPillSelector
      titleText={'What are your favorite electronic music genres?'}
      minPillCount={minGenres}
      maxPillCount={maxGenres}
      pillTexts={Object.values(Genre)}
      selectedPillTexts={selectedGenres}
      isSubmitButtonDisabled={isNextButtonDisabled()}
      onPillToggle={onGenreToggle}
      onSubmit={onGenresSubmit}
    />
  );
};

export default GenresInput;
