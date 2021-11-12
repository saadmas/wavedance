export const getFirebasePath = (...args: string[]): string => {
  return args.join('/');
};
