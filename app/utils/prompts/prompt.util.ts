import { Prompt } from '../../state/enums/prompt';

// Returns a map where k = full text of prompt, v = key of prompt
const getPromptInverseMap = (): Map<string, Prompt> => {
  const promptInverseMap: Map<string, Prompt> = new Map();

  Object.entries(Prompt).forEach(([fullText, promptKey]) => {
    promptInverseMap.set(fullText, promptKey);
  });

  return promptInverseMap;
};

export const getPromptsToStore = (displayPrompts: Map<Prompt, string>): Map<string, string> => {
  const promptInverseMap = getPromptInverseMap();
  const promptsToStore: Map<string, string> = new Map();

  displayPrompts.forEach((answer, prompt) => {
    const promptKey = promptInverseMap.get(prompt) ?? prompt;
    promptsToStore.set(promptKey, answer);
  });

  return promptsToStore;
};
