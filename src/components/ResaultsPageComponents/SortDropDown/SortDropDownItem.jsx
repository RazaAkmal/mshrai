import React from "react";

const SortDropDownItem = ({ _handleStartSearch, text, sortType }) => {
  return (
    <>
      <div
        className="dropdown-item"
        onClick={() => _handleStartSearch("sort", sortType)}
      >
        {" "}
        {text}{" "}
      </div>
    </>
  );
};

export default SortDropDownItem;
