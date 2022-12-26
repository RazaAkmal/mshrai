export const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    padding: "8px",
    textAlign: "start",
    boxShadow: "0 0 0 1px #ddd",
    ":hover": { borderColor: "#ddd" },
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: "1000",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? "#ddd"
        : undefined,
      color: "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? "#ddd" : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#aaf3ff",
      color: "#000",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "browen",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "black",
  }),
};

export const errorStyle = {
  control: (styles , state) => ({

    ...styles,
    backgroundColor: "white",
    borderColor:'red',
    padding: "8px",
    textAlign: "start",
    boxShadow: "0 0 0 1px #ddd",
    ":hover": { borderColor: "red" },
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: "1000",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? "#ddd"
        : undefined,
      color: "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? "#ddd" : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#aaf3ff",
      color: "#000",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "browen",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "black",
  }),
};
