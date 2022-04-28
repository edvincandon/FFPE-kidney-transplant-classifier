import React, { Children, CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { chunks, toPercentage } from '~/utils';

import { DSAInput } from './DSAInput';
import { GeneInput } from './GeneInput';
import { DEFAULT_GENE_STATE, GENES, GeneState } from './genes';
import { Heatmap } from './Heatmap';
import { scalerTransform } from './scaler';
import { ABMR_TEST, CONTROL_TEST, TCMR_TEST } from './test.data';

const buttonStyles: CSSProperties = {
  marginBottom: 5,
  display: "inline-block",
  padding: "7px 2px",
  fontSize: "0.6em",
};
export const Classifier: React.FC = () => {
  const genesGrid = useMemo(() => [...chunks(GENES.slice(), 6)], []);
  const [withDSA, setWithDSA] = useState<boolean>(true);
  const [inputs, setInputs] = useState<GeneState>(DEFAULT_GENE_STATE);
  const [loading, setLoading] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  const [data, setData] = useState<{ [key: string]: any } | undefined>();

  useEffect(
    () =>
      setValid(
        GENES.filter((gene) => withDSA || gene !== "DSA").reduce<boolean>(
          (valid, gene) =>
            valid &&
            inputs[gene] !== undefined &&
            Number.isFinite(parseFloat(inputs[gene]!)),
          true
        )
      ),
    [inputs, withDSA]
  );

  const predict = useCallback(async (inputs: GeneState, withDSA: boolean) => {
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));
      const { DSA, ...genes } = Object.fromEntries(
        Object.entries(inputs).map(([key, value]) => [key, parseFloat(value)])
      );
      const res = await fetch("/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genes, ...(withDSA ? { DSA } : {}) }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      await new Promise((res) => setTimeout(res, 500));
      setData({ ...data, timestamp: new Date().toUTCString() });
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }, []);

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
            Finally, click the <strong>PREDICT</strong> button run the
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
            href="http://92.222.23.215/RTMLPA/index.php?p=signin"
            role="button"
            className="secondary outline"
            target="_blank"
          >
            → RT-MLPA Analysis{" "}
            <img
              src="/static/images/logo-tool.png"
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
                TCMR Sample
              </button>
              <button
                className="outline secondary"
                style={buttonStyles}
                onClick={() => setInputs(ABMR_TEST)}
              >
                ABMR Sample
              </button>
              <button
                className="outline secondary"
                style={buttonStyles}
                onClick={() => setInputs(CONTROL_TEST)}
              >
                Control Sample
              </button>
              <button
                className="outline secondary"
                style={buttonStyles}
                onClick={() => setInputs(DEFAULT_GENE_STATE)}
              >
                Reset
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
        <footer style={{ marginTop: 25 }}>
          <button
            role="button"
            className="primary outline"
            aria-busy={loading}
            disabled={!valid}
            onClick={() => predict(inputs, withDSA)}
          >
            PREDICT
          </button>

          <div>
            <h5>Prediction results </h5>
            <kbd style={{ marginLeft: 10 }}>
              {data ? data.prediction : "no prediction"}{" "}
            </kbd>{" "}
            <span style={{ fontSize: "0.7em" }}>
              {data &&
                (() => {
                  const probability = data.probabilities[data.prediction];
                  return probability > 0.7 ? (
                    <mark
                      style={{
                        borderRadius: 4,
                        marginLeft: 5,
                        backgroundColor: "#388e3c",
                        color: "white",
                      }}
                    >
                      High confidence
                    </mark>
                  ) : probability < 0.45 ? (
                    <mark
                      style={{
                        borderRadius: 4,
                        marginLeft: 5,
                        backgroundColor: "#c62828",
                        color: "white",
                      }}
                    >
                      Low confidence
                    </mark>
                  ) : (
                    <mark
                      style={{
                        borderRadius: 4,
                        marginLeft: 5,
                        color: "white",
                      }}
                    >
                      Average confidence
                    </mark>
                  );
                })()}
            </span>
            <table role="grid" style={{ marginTop: 30 }}>
              <thead>
                <tr>
                  <th scope="col" style={{ opacity: 0.6, fontSize: "0.7em" }}>
                    Probabilities<sup>*</sup>
                  </th>
                  <th scope="col">ABMR </th>
                  <th scope="col">TCMR </th>
                  <th scope="col">Control </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <span style={{ fontSize: "0.6em" }}>
                      {data?.timestamp ?? "-"}
                    </span>
                  </th>
                  <td>
                    {data ? (
                      <MaybeWinner win={data?.prediction === "ABMR"}>
                        {toPercentage(data.probabilities["ABMR"])}
                      </MaybeWinner>
                    ) : (
                      "﹖"
                    )}
                  </td>
                  <td>
                    {data ? (
                      <MaybeWinner win={data?.prediction === "TCMR"}>
                        {toPercentage(data.probabilities["TCMR"])}
                      </MaybeWinner>
                    ) : (
                      "﹖"
                    )}
                  </td>
                  <td>
                    {data ? (
                      <MaybeWinner win={data?.prediction === "Control"}>
                        {toPercentage(data.probabilities["Control"])}
                      </MaybeWinner>
                    ) : (
                      "﹖"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="grid">
              <div style={{ opacity: 0.5 }}>
                <p style={{ fontSize: "0.5em" }}>
                  * The probabilities may be inconsistent with the classifier's
                  final prediction.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
};

const MaybeWinner: React.FC<{
  win: boolean;
  children?: React.ReactNode;
}> = ({ win, children }) => (
  <>{win ? <mark style={{ borderRadius: 4 }}>{children}</mark> : children}</>
);
