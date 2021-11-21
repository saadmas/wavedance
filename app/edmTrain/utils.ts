import { EdmTrainLocation } from './types';

export const getLocationDisplayText = (location: EdmTrainLocation): string => {
  if (location.city) {
    return `${location.city}, ${location.stateCode}`;
  }
  return location.state;
};
