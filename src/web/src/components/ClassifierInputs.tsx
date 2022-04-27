import React, { useMemo, useState } from 'react';
import { chunks } from '~/utils';

import { DSAInput } from './DSAInput';
import { GeneInput } from './GeneInput';

const GENES = [
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
  "PRF",
  "ADAMdec",
  "IFNg",
];

export const ClassifierInputs: React.FC = () => {
  const genesGrid = useMemo(() => [...chunks(GENES, 6)], []);
  const [withDSA, setWithDSA] = useState<boolean>(true);

  return (
    <>
      <label htmlFor="withDSA">
        <input
          type="checkbox"
          id="withDSA"
          name="withDSA"
          checked={withDSA}
          onChange={(e) => setWithDSA(e.target.checked)}
        />
        With Donor-Specific Antibodies (DSA) input
      </label>
      <br />
      {genesGrid.map((geneRow, i) => (
        <div className="grid" key={i}>
          {geneRow.map((gene) => (
            <div key={gene}>
              {gene === "DSA" ? (
                <DSAInput label={gene} disabled={!withDSA} />
              ) : (
                <GeneInput label={gene} />
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
