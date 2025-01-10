export function randomNumber(minValue: number, maxValue: number): number {
  if (minValue > maxValue) {
    return -1;
  }
  if (minValue === maxValue) {
    return minValue;
  }

  const span: number = maxValue - minValue + 1;
  const randomNum: number = Math.floor(Math.random() * span) + minValue;

  return randomNum;
}
