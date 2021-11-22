import { getEdmTrainCities, getEdmTrainStates } from './locations';
import { EdmTrainLocation } from './types';

export const getLocationDisplayText = (location: EdmTrainLocation): string => {
  if (location.city) {
    return `${location.city}, ${location.stateCode}`;
  }
  return location.state;
};

export const getEdmTrainLocationFromUserCurrentLocation = (
  userCurrentLocation: string
): EdmTrainLocation | undefined => {
  const edmTrainCities = [...getEdmTrainCities().values()];

  const matchedCity = edmTrainCities.find(location =>
    location.city?.toLowerCase().includes(userCurrentLocation.toLowerCase())
  );

  if (matchedCity) {
    return matchedCity;
  }

  const edmTrainStates = [...getEdmTrainStates().values()];

  const matchedState = edmTrainStates.find(location =>
    location.state.toLowerCase().includes(userCurrentLocation.toLowerCase())
  );

  if (matchedState) {
    return matchedState;
  }
};
