export enum Report {
  NotInterested = 'Not interested',
  FakeSpamOrScammer = 'Fake, spam, or scammer',
  HateSpeech = 'Hate speech',
  InappropriateContent = 'Inappropriate content',
  InappropriateBehavior = 'Inappropriate behavior',
  UnderageOrMinor = 'Underage or minor',
  SomeoneIsInDanger = 'Someone is in danger',
}

export enum FakeSpamOrScammer {
  LimitedInformation = 'Limited information',
  UsingPhotosFromSomeoneIKnow = 'Using photos from someone I know',
  UsingPhotosFromSomeoneFamous = 'Using photos from someone famous',
  UsingMyPhotos = 'Using my photos',
  RoboticReplies = 'Robotic replies',
  FakeLocation = 'Fake location',
  ContactDetailsOnProfile = 'Contact details on profile',
  SellingProductsOrServices = 'Selling products or services',
  PhotosDontFeatureAPerson = 'The photos don’t feature a person',
  PersonCatfishingOrScamming = 'This person is catfishing or scamming',
  PersonIsSellingSexualServices = 'This person is selling sexual services',
  PromotingSocialMedia = 'Promoting social media',
  FeelsLikeSpam = 'Feels like spam',
}

export enum HateSpeech {
  Racism = 'Racism',
  Homophobia = 'Homophobia',
  Misogyny = 'Misogyny',
  Transphobia = 'Transphobia',
  BodyShaming = 'Body-shaming',
}

export enum InappropriateContent {
  InappropriatePhotos = 'Inappropriate photos',
  InappropriateText = 'Inappropriate text',
  InappropriatePrompts = 'Inappropriate prompts',
}

export enum InappropriateBehavior {
  BadExperienceAtShow = 'Bad experience at show',
  SentMeSexualPhotos = 'Sent me sexual photos',
  SentMeSexualMessages = 'Sent me sexual messages',
  SentMeAbusiveMessages = 'Sent me abusive messages',
  AssaultedMe = 'Assaulted me',
  MetThisPersonAndWantToReport = 'I met this person and want to report',
  KnowThisPersonAndWantToReportThem = 'I know this person and want to report them',
  HarassedMeOnAnotherPlatform = 'Harassed me on another platform',
  ThisPersonIsAConvictedFelon = 'This person is a convicted felon',
}

export enum UnderageOrMinor {
  ProfileSaysUnder18 = 'Profile says they are under 18',
  LooksUnder18 = 'Looks under 18',
  ToldMeTheyAreUnder18 = 'Told me they are under 18',
  KnowThisPersonIsUnder18 = 'I know this person, they are under 18',
}

export enum SomeoneIsInDanger {
  Under18 = 'Under 18',
  ConvictedFelon = 'Convicted felon',
  EndangeringMinors = 'Endangering minors',
  ThreateningViolence = 'Threatening violence',
  PostingAboutTerrorism = 'Posting about terrorism',
  AssaultedSomeone = 'Assaulted someone',
  SelfHarm = 'Self-harm',
}