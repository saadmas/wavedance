import React from 'react';

const EventFavoritesCacheContext = React.createContext<Set<string>>(new Set());
const EventFavoritesCacheUpdaterContext = React.createContext<
  React.Dispatch<React.SetStateAction<Set<string>>> | undefined
>(undefined);

export const EventFavoritesCacheProvider: React.FC = ({ children }) => {
  const [eventFavoriteIds, setEventFavoriteIds] = React.useState<Set<string>>(new Set());
  return (
    <EventFavoritesCacheContext.Provider value={eventFavoriteIds}>
      <EventFavoritesCacheUpdaterContext.Provider value={setEventFavoriteIds}>
        {children}
      </EventFavoritesCacheUpdaterContext.Provider>
    </EventFavoritesCacheContext.Provider>
  );
};

export const useEventFavoritesCache = () => {
  const eventFavoritesCache = React.useContext(EventFavoritesCacheContext);
  return eventFavoritesCache;
};

export const useEventFavoritesCacheUpdater = () => {
  const eventFavoritesCacheUpdater = React.useContext(EventFavoritesCacheUpdaterContext);
  return eventFavoritesCacheUpdater;
};
