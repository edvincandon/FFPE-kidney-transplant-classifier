import React from 'react';
import { generateHeatMap } from '~/utils/heatmap';

import { GENES, GeneState } from './genes';

const CMAP_DEPTH = 500;
const CMAP_LIMITS: [number, number] = [-3, 6];
const CMAP = generateHeatMap(
  [
    [196, 229, 218],
    [70, 122, 201],
    [30, 30, 30],
    [168, 62, 68],
    [247, 212, 177],
  ],
  CMAP_DEPTH
);

export const Heatmap: React.FC<{ inputs: GeneState }> = ({ inputs }) => {
  return (
    <>
      <div className="grid" style={{ fontSize: "0.42em" }}>
        <span style={{ marginBottom: 4, display: "block" }}>
          Low expression
        </span>
        <span style={{ marginBottom: 4, display: "block", textAlign: "right" }}>
          High expression
        </span>
      </div>

      <div className="grid" style={{ gridGap: 0 }}>
        {CMAP.map((rgb, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `rgb(${rgb.join(", ")})`,
              height: 15,
            }}
          ></div>
        ))}
      </div>
      <div className="grid" style={{ gridGap: 0 }}>
        {GENES.filter((gene) => gene !== "DSA").map((gene, i) => {
          const value = parseFloat(
            (inputs[gene]?.trim() !== "" ? inputs[gene] : null) ?? "0"
          );

          const cmapVal = Number.isFinite(value)
            ? Math.floor(
                ((Math.min(Math.max(value, CMAP_LIMITS[0]), CMAP_LIMITS[1]) -
                  CMAP_LIMITS[0]) /
                  Math.abs(CMAP_LIMITS[1] - CMAP_LIMITS[0])) *
                  (CMAP_DEPTH - 1)
              )
            : Math.round(CMAP.length / 2);

          return (
            <div key={gene} style={{ textAlign: "center", fontSize: "0.42em" }}>
              <div
                style={{
                  display: "flex",
                  borderLeft:
                    i === 0 ? "none" : "1px dashed rgba(255,255,255,0.1)",
                  backgroundColor: `rgba(${CMAP[cmapVal].join(", ")}, 0.88)`,

                  height: 25,
                }}
              ></div>
              <span style={{ marginTop: 4, display: "block" }}>{gene}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
