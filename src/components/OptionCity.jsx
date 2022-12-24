import React from "react";
import { components } from "react-select";

const OptionCity = (props) => {
  return (
    <>
      <components.Option {...props}>
        {props.children}
        {props.data.value === 11 && <hr />}
        </components.Option>
      
    </>
  );
};

export default OptionCity;