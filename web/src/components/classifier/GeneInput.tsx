import React from 'react';

export const GeneInput: React.FC<{
  label: string;
  value?: string;
  onChange: (value: string) => any;
}> = ({ label, value, onChange }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        type="number"
        id={label}
        name={label}
        min="0"
        step="0.01"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};
