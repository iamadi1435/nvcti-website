import React from 'react'

const FormInput = ({ handleChange, placeholder, ...otherProps }) => {
  return (
    <div className="group mb-2">
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
