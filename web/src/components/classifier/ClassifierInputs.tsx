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
  "PRF1",
  "ADAMDEC1",
  "IFNG",
];

export const ClassifierInputs: React.FC = () => {
  const genesGrid = useMemo(() => [...chunks(GENES, 6)], []);
  const [withDSA, setWithDSA] = useState<boolean>(true);

  return (
    <>
      <article>
        <header>
          <h4>Running the classifier</h4>
          <p>
            Fill in the <strong>normalized</strong> gene expression values in
            the input fields below.{" "}
            <i>
              You can disable the DSA input field if you do not have this
              specific piece of data. The predictions may differ when toggling
              this option as we have trained two models : one with DSA data and
              one without.
            </i>{" "}
          </p>
          <p>
            Finally, click the <strong>CLASSIFY</strong> button run the
            classifier and wait for the prediction results.
          </p>
          <blockquote>
            To obtain normalized values from an <strong>.fsa file</strong>,{" "}
            please extract them using the RT-MLPA Analysis online application{" "}
            <i>
              Provided by <strong>INSERM U1245</strong> - Genomics and
              Biomarkers of Lymphoma and Solid Tumors
            </i>
          </blockquote>

          <a
            href=" http://92.222.23.215/RTMLPA/index.php?p=signin"
            role="button"
            className="secondary outline"
            target="_blank"
          >
            → RT-MLPA Analysis
          </a>
        </header>
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
        <footer>TRAIN</footer>
      </article>
    </>
  );
};
