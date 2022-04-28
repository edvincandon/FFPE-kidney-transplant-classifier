export type Color = [number, number, number];

const zip = <T extends any = any>(arr: T[], ...arrs: T[][]): T[][] =>
  arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));

export const generateHeatMap = (colors: Color[], steps: number) => {
  const mod = steps / (colors.length - 1);

  return Array.from({ length: steps }, (_, i) => i).reduce<Color[]>(
    (heatmap, idx) => {
      const p0 = Math.floor((idx / steps) * (colors.length - 1));
      const p1 = Math.ceil((idx / steps) * (colors.length - 1));
      const rgb = zip(colors[p0], colors[p1]).map(
        (_colors) =>
          _colors[0] +
          Math.round((_colors[1] - _colors[0]) * ((idx % mod) / mod))
      ) as Color;

      return [...heatmap, rgb];
    },
    []
  );
};
