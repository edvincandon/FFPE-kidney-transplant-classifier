import React from 'react';

export const DSAInput: React.FC<{
  label: string;
  disabled: boolean;
  value?: string;
  onChange: (value: string) => void;
}> = ({ label, disabled, value, onChange }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select
        id={label}
        required={!disabled}
        disabled={disabled}
        value={value}
        onChange={(e) =>
          e.target.value.trim() !== "" && onChange(e.target.value)
        }
      >
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </>
  );
};
