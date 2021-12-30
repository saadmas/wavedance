export enum FirebaseNode {
  EventMembers = 'eventMembers',
  EventPhotos = 'eventPhotos',
  ChatMessages = 'chatMessages',
  UserAdditionalInfo = 'userAdditionalInfo',
  UserBasicInfo = 'userBasicInfo',
  UserBlocks = 'userBlocks',
  UserEventIgnores = 'userEventIgnores',
  UserWaveIgnores = 'userWaveIgnores',
  UserEventPrompts = 'userEventPrompts',
  UserFavoriteEvents = 'userFavoriteEvents',
  UserPhotos = 'userPhoto',
  UserPrompts = 'userPrompts',
  UserReports = 'userReports',
  UserWavesSent = 'userWavesSent',
  UserWavesReceived = 'userWavesReceived',
  UserChats = 'userChats',
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
  Pronouns = 'pronouns',
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
