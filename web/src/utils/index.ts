export function* chunks<T extends any = any>(
  arr: T[],
  n: number
): Generator<T[]> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export const toPercentage = (val: number): string =>
  `${Math.round(val * 10000) / 100}%`;
