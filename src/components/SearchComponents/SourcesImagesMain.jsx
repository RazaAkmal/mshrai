import React from "react";
import { sortedSearchSourcesUtility } from "../../utils";

const SourcesImagesMain = ({ searchInputs }) => {
  const sortedSearchSources = sortedSearchSourcesUtility(searchInputs);
  return (
    <>
      <div className="sources_img_main">
        {sortedSearchSources.map(({ image }, index) => {
          return (
            <img key={index} src={image} alt="img" className="source_img"></img>
          );
        })}
      </div>
    </>
  );
};

export default SourcesImagesMain;
