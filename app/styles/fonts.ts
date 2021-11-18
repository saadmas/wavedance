const fontWeight = 'normal' as const;
const defaultFont = {
  fontFamily: 'Montserrat_400Regular',
  fontWeight,
};

const crossPlatformFontConfig = {
  regular: defaultFont,
  medium: defaultFont,
  light: defaultFont,
  thin: { fontFamily: 'Lustria_400Regular', fontWeight },
};

export const fontConfig = {
  web: crossPlatformFontConfig,
  ios: crossPlatformFontConfig,
  android: crossPlatformFontConfig,
};
