export const getRandomElement = (arr: unknown[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
