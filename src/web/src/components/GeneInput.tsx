import React from 'react';

export const GeneInput: React.FC<{
  label: string;
}> = ({ label }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        type="number"
        id={label}
        name={label}
        min="0"
        step="0.01"
        defaultValue={0}
        required
      />
    </>
  );
};
