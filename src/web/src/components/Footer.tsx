import React from 'react';

export const Footer: React.FC = () => (
  <footer>
    <p>
      <h4>Authorship</h4>
      <p>
        Tristan de Nattes<sup>1,2,3</sup>, Jack Beadle<sup>3</sup>, Frederic
        Toulza<sup>3</sup>, Edvin Candon<sup>1</sup>, Philippe Ruminy
        <sup>4</sup>, Arnaud François<sup>4</sup>, Dominique Bertrand
        <sup>1</sup>, Dominique Guerrot<sup>1</sup>, Fanny Drieux<sup>4,5</sup>,
        Candice Roufosse<sup>3</sup>, Sophie Candon<sup>2</sup>
      </p>
      <ol style={{ fontSize: "0.8em" }}>
        <li>
          Nephrology – Kidney Transplant Unit, Rouen University Hospital - Rouen
          🇫🇷
        </li>
        <li>
          Normandy University, INSERM U1234, Rouen University Hospital,
          Department of Immunology, and biotherapies - Rouen 🇫🇷
        </li>
        <li>
          Department of Immunology and Inflammation, Centre for Inflammatory
          Diseases, Imperial College - London 🇬🇧
        </li>
        <li>
          Normandy University, UNIROUEN, INSERM U1245, Centre Henri Becquerel -
          Rouen 🇫🇷
        </li>
        <li>Pathology Department, Rouen University Hospital - Rouen 🇫🇷</li>
      </ol>
    </p>
    <p>
      <strong>For research purposes only</strong>
    </p>
    <p style={{ fontSize: "0.8em" }}>
      Developed by{" "}
      <a href="https://lostsolution.io" target="_blank">
        Edvin CANDON
      </a>{" "}
      © 2022
    </p>
  </footer>
);
