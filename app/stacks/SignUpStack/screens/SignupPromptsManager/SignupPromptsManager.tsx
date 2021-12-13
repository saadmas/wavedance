import * as React from 'react';
import { useSignUpDispatch } from '../../../../state/signUp/SignUpProvider';
import { SignUpStepProps } from '../../SignUpStack';
import { Prompt } from '../../../../state/enums/prompt';
import PromptsManager, { PromptAnswer } from '../../../../components/PromptsManager/PromptsManager';
import { EventPrompt } from '../../../../state/enums/EventPrompt';
import { PromptSelectionType } from '../../../../state/enums/promptSelectionType';

interface SignupPromptsManagerProps extends SignUpStepProps {}

const SignupPromptsManager = ({ goToNextStep }: SignupPromptsManagerProps) => {
  const dispatch = useSignUpDispatch();

  const onPromptsSubmit = (filledPrompts: Map<Prompt | EventPrompt, PromptAnswer>) => {
    dispatch({ type: 'PROMPT_UPDATE', payload: filledPrompts as Map<Prompt, PromptAnswer> });
    goToNextStep();
  };

  return <PromptsManager onSubmit={onPromptsSubmit} selectionType={PromptSelectionType.General} />;
};

export default SignupPromptsManager;
