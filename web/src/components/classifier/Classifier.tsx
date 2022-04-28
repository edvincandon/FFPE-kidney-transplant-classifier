import React, { CSSProperties, useMemo, useState } from 'react';
import { chunks } from '~/utils';

import { DSAInput } from './DSAInput';
import { GeneInput } from './GeneInput';
import { GENES, GeneState } from './genes';
import { Heatmap } from './Heatmap';
import { scalerTransform } from './scaler';
import { ABMR_TEST, CONTROL_TEST, TCMR_TEST } from './test.data';

const buttonStyles: CSSProperties = {
  marginBottom: 5,
  display: "inline-block",
  padding: "7px 2px",
  fontSize: "0.8em",
};
export const Classifier: React.FC = () => {
  const genesGrid = useMemo(() => [...chunks(GENES.slice(), 3)], []);
  const [withDSA, setWithDSA] = useState<boolean>(true);
  const [inputs, setInputs] = useState<GeneState>({});

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
            → RT-MLPA Analysis{" "}
            <img
              src="http://92.222.23.215/RTMLPA/site_media/logoA.png"
              style={{ height: 16, marginLeft: 5 }}
            />
          </a>
        </header>
        <div className={"grid"} style={{ alignItems: "center" }}>
          <div>
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
          </div>
          <div>
            <div className="grid">
              <button
                className="outline secondary"
                style={buttonStyles}
                onClick={() => setInputs(TCMR_TEST)}
              >
                TCMR test
              </button>
              <button
                className="outline secondary"
                style={buttonStyles}
                onClick={() => setInputs(ABMR_TEST)}
              >
                ABMR test
              </button>
              <button
                className="outline secondary"
                style={buttonStyles}
                onClick={() => setInputs(CONTROL_TEST)}
              >
                Control test
              </button>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <br />
        {genesGrid.map((geneRow, i) => (
          <div className="grid" key={i}>
            {geneRow.map((gene) => (
              <div key={gene}>
                {gene === "DSA" ? (
                  <DSAInput
                    label={gene}
                    disabled={!withDSA}
                    value={inputs[gene] ?? "1"}
                    onChange={(value) =>
                      setInputs((x) => ({ ...x, [gene]: value }))
                    }
                  />
                ) : (
                  <GeneInput
                    label={gene}
                    value={inputs[gene] ?? "0"}
                    onChange={(value) =>
                      setInputs((x) => ({ ...x, [gene]: value }))
                    }
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <Heatmap inputs={scalerTransform(inputs)} />
        <footer>
          {" "}
          <button
            role="button"
            className="primary"
            onClick={() => console.log(inputs)}
          >
            → PREDICT
          </button>
        </footer>
      </article>
    </>
  );
};
