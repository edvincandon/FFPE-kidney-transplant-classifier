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

export const DEFAULT_GENE_STATE: GeneState = {
  DSA: "0",
  CARD16: "0",
  CD72: "0",
  CD68: "0",
  CCL4: "0",
  CTLA4: "0",
  PLA1A: "0",
  ROBO4: "0",
  KLRD1: "0",
  FCGR3: "0",
  GNLY: "0",
  CXCL11: "0",
  CCL18: "0",
  CAV1: "0",
  PECAM: "0",
  PRF1: "0",
  ADAMDEC1: "0",
  IFNG: "0",
};
