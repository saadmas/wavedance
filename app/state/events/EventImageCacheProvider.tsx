import React, { useEffect } from 'react';
import { EventImageInfo } from '../../firebase/types';

// K = Event ID, V = image info for the event
const EventImageCacheContext = React.createContext<Map<number, EventImageInfo>>(new Map());

const EventImageCacheUpdaterContext = React.createContext<
  React.Dispatch<React.SetStateAction<Map<number, EventImageInfo>>> | undefined
>(undefined);

export const EventImageCacheProvider: React.FC = ({ children }) => {
  const [eventImages, setEventImages] = React.useState<Map<number, EventImageInfo>>(new Map());

  useEffect(() => {
    const clearCache = () => {
      setEventImages(new Map());
    };

    setTimeout(() => {
      clearCache();
    }, 1800000);
  }, []);

  return (
    <EventImageCacheContext.Provider value={eventImages}>
      <EventImageCacheUpdaterContext.Provider value={setEventImages}>{children}</EventImageCacheUpdaterContext.Provider>
    </EventImageCacheContext.Provider>
  );
};

export const useEventImageCache = () => {
  const eventImageCache = React.useContext(EventImageCacheContext);
  return eventImageCache;
};

export const useEventImageCacheUpdater = () => {
  const eventImageCacheUpdater = React.useContext(EventImageCacheUpdaterContext);

  if (typeof eventImageCacheUpdater === 'undefined') {
    throw new Error('useEventImageCacheUpdater must be used within a EventImageCacheProvider');
  }

  return eventImageCacheUpdater;
};
