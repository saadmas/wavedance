import * as React from 'react';
import { Path } from '../../routing/paths';

const wizardSteps = [Path.EnterName, Path.SignUp];

const SignUpWizard = () => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);

  React.useEffect(() => {}, [currentStepIndex]);

  const goToNextStep = () => {
    setCurrentStepIndex(previousIndex => previousIndex++);
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex(previousIndex => previousIndex--);
  };

  return null;
};

export default SignUpWizard;
