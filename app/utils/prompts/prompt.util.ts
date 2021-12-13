import { PromptAnswer } from '../../components/PromptsManager/PromptsManager';
import { EventPrompt } from '../../state/enums/eventPrompt';
import { Prompt } from '../../state/enums/prompt';
import { PromptSelectionType } from '../../state/enums/promptSelectionType';

// Returns a map where k = full text of prompt, v = key of prompt
const getPromptInverseMap = (selectionType: PromptSelectionType): Map<Prompt | EventPrompt, string> => {
  const promptInverseMap: Map<Prompt | EventPrompt, string> = new Map();
  const promptValues =
    selectionType === PromptSelectionType.General ? Object.entries(Prompt) : Object.entries(EventPrompt);

  promptValues.forEach((entry: [string, Prompt | EventPrompt]) => {
    const [fullText, promptKey] = entry;
    promptInverseMap.set(promptKey, fullText);
  });

  return promptInverseMap;
};

export const getPromptsToStore = (
  selectionType: PromptSelectionType,
  displayPrompts: Map<Prompt | EventPrompt, PromptAnswer>
): { [promptKey: string]: PromptAnswer } => {
  const promptInverseMap = getPromptInverseMap(selectionType);
  const promptsToStore: Map<string, PromptAnswer> = new Map();

  displayPrompts.forEach((answer, prompt) => {
    const promptKey = promptInverseMap.get(prompt) ?? prompt;
    promptsToStore.set(promptKey, answer);
  });

  return Object.fromEntries(promptsToStore);
};

export const getFullTextFromPromptKey = (key: string): string => {
  const prompt = Object.entries(Prompt).find(entry => entry[0] === key);
  const fullText = prompt?.[1];
  return fullText ?? key;
};
