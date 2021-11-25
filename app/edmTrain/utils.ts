import { getEdmTrainCities, getEdmTrainStates } from './locations';
import { EdmTrainEvent, EdmTrainLocation } from './types';

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
    location.city ? userCurrentLocation.toLowerCase().includes(location.city.toLowerCase()) : undefined
  );

  if (matchedCity) {
    return matchedCity;
  }

  const edmTrainStates = [...getEdmTrainStates().values()];

  const matchedState = edmTrainStates.find(location =>
    userCurrentLocation.toLowerCase().includes(location.state.toLowerCase())
  );

  if (matchedState) {
    return matchedState;
  }
};

export const getArtistsDisplay = (event: EdmTrainEvent): string =>
  event.artistList.map(artist => artist.name).join(', ');
