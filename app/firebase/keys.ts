export enum FirebaseNode {
  UserBasicInfo = 'userBasicInfo',
  UserAdditionalInfo = 'userAdditionalInfo',
  UserPrompts = 'userPrompts',
  UserEventPrompts = 'userEventPrompts',
  UserPhotos = 'userPhoto',
  UserFavoriteEvents = 'userFavoriteEvents',
  EventMembers = 'eventMembers',
  EventPhotos = 'eventPhotos',
}

export enum UserBasicInfo {
  Birthday = 'birthday',
  Name = 'name',
  ProfilePhoto = 'profilePhoto',
}

export enum UserAdditionalInfo {
  CurrentLocation = 'currentLocation',
  Hometown = 'hometown',
  Passions = 'passions',
  Genres = 'genres',
  InstagramHandle = 'instagramHandle',
  Occupation = 'occupation',
}

export enum UserPhotos {
  ProfilePhoto = 'profilePhoto',
}

export enum EventPhotos {
  EdmTrainArtistId = 'edmTrainArtistId',
  SpotifyArtistId = 'spotifyArtistId',
  ImageUrl = 'imageUrl',
}
