import { GeneKeys, GeneState } from './genes';

export const DATA_MEAN: { [Key in GeneKeys]: number } = {
  DSA: 0.27727273,
  CARD16: 1.07547272,
  CD72: 1.08148273,
  CD68: 0.8455446,
  CCL4: 0.6931393,
  CTLA4: 1.97580184,
  PLA1A: 0.82212166,
  ROBO4: 0.72591353,
  KLRD1: 1.51158104,
  FCGR3: 0.80231897,
  GNLY: 0.16000746,
  CXCL11: 0.17233658,
  CCL18: 0.40086193,
  CAV1: 0.76826313,
  PECAM: 1.08586978,
  PRF1: 0.42418736,
  ADAMDEC1: 1.53051283,
  IFNG: 0.31082183,
};

export const DATA_VARIANCE: { [Key in GeneKeys]: number } = {
  DSA: 0.20039256,
  CARD16: 0.14192945,
  CD72: 0.20000686,
  CD68: 0.16766648,
  CCL4: 0.1230516,
  CTLA4: 0.19712733,
  PLA1A: 0.19779561,
  ROBO4: 0.28239375,
  KLRD1: 0.37945208,
  FCGR3: 0.1722958,
  GNLY: 0.06104552,
  CXCL11: 0.02882179,
  CCL18: 0.32426913,
  CAV1: 0.14537912,
  PECAM: 0.2179445,
  PRF1: 0.1582073,
  ADAMDEC1: 0.153628,
  IFNG: 0.06552386,
};

export const scalerTransform = (data: GeneState): GeneState =>
  Object.fromEntries(
    Object.entries(data).map(([key, val]) => [
      key,
      (
        (parseFloat(val) - DATA_MEAN[key as GeneKeys]) /
        DATA_VARIANCE[key as GeneKeys]
      ).toString(),
    ])
  );
