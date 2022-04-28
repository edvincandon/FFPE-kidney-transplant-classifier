import React from 'react';

export const DSAInput: React.FC<{
  label: string;
  disabled: boolean;
}> = ({ label, disabled }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select id={label} required={!disabled} disabled={disabled}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </>
  );
};
