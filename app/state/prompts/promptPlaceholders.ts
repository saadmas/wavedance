import { Prompt } from '../enums/prompt';

export const promptPlaceholders: Map<Prompt, string> = new Map([
  [Prompt.AllIAskAtShow, "Don't disappear in the middle of the headline set"],
  [Prompt.FavoriteArtist, 'e.g. Lane 8'],
  [Prompt.FavoriteSong, 'e.g. Sunday Song - Lane 8'],
  [Prompt.FavoriteRemix, 'e.g. '],
]);
