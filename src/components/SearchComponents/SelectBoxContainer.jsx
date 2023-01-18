import React from "react";
import Select from "react-select";
import { colourStyles, errorStyle } from "../../constants";
const SelectBoxContainer = ({
  label,
  value,
  name,
  options,
  placeholder,
  defaultValue,
  validity,
  onChange,
  formatOptionLabel,
  myRef,
  components,
  classNamePrefix,
}) => {
  return (
    <>
      <div className="col-md-6 col-sm-6  mb-3 d-sm-block">
        <label className="text-end d-block">{label}</label>
        <Select
          defaultValue={defaultValue}
          value={value}
          isMulti
          name={name}
          options={options}
          className="basic-multi-select"
          placeholder={placeholder}
          styles={validity ? errorStyle : colourStyles}
          onChange={(value) => onChange(value)}
          formatOptionLabel={formatOptionLabel}
          ref={myRef}
          components={components}
          classNamePrefix={classNamePrefix}
        />
      </div>
    </>
  );
};

export default SelectBoxContainer;
