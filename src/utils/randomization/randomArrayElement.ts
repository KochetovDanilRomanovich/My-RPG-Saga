export function randomArrayElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  const index: number = Math.floor(Math.random() * array.length);
  return array[index];
}
