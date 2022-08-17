import React from "react";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group-1">
      <input className="form-input-1" onChange={handleChange} {...otherProps} />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-1-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
