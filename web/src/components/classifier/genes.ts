export const GENES = [
  "DSA",
  "CARD16",
  "CD72",
  "CD68",
  "CCL4",
  "CTLA4",
  "PLA1A",
  "ROBO4",
  "KLRD1",
  "FCGR3",
  "GNLY",
  "CXCL11",
  "CCL18",
  "CAV1",
  "PECAM",
  "PRF1",
  "ADAMDEC1",
  "IFNG",
] as const;

export type GeneKeys = typeof GENES extends ReadonlyArray<infer U> ? U : never;

export type GeneState = {
  [Key in GeneKeys]?: string;
};
