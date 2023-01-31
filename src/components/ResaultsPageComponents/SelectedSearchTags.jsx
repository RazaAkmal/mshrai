import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './Tags/FilterTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";
import { IoIosClose } from "react-icons/io";

const SelectedSearchTags = ({
  modalOfbrandNotSelected,
  searchForm,
  _handleStartSearch,
  searchInputs,
  getBrandValueAswell,
  isEnglish,
}) => {
  return (
    <>
      {/* <ul className="search_tags">
        {searchForm.brand_id && searchForm.brand_id.length > 0
          ? searchInputs.marksOptions.map((mark, index) => {
              return searchForm.brand_id.includes(mark.value) &&
                modalOfbrandNotSelected(mark.value, index) ? (
                <>
                  <li key={"searchMarks" + index}>
                    {isEnglish ? mark.label_en : mark.label}
                    <span
                      onClick={() => {
                        let marks = [...searchForm.brand_id];
                        if (marks.includes(mark.value)) {
                          marks.splice(marks.indexOf(mark.value), 1);
                        }
                        _handleStartSearch("brand_id", marks);
                      }}
                    >
                      <IoIosClose />
                    </span>
                  </li>
                </>
              ) : (
                false
              );
            })
          : ""}
        {searchForm.brand_type_id && searchForm.brand_type_id.length > 0
          ? searchInputs.modelOptions.map((model, index) => {
              return searchForm.brand_type_id.includes(model.value)
                ? getBrandValueAswell(model, index)
                : false;
            })
          : ""}
      </ul> */}
      {searchForm.brand_id && searchForm.brand_id.length > 0
            ? searchInputs.marksOptions.map((mark, index) => {
                return searchForm.brand_id.includes(mark.value) &&
                  modalOfbrandNotSelected(mark.value, index) ? (
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={isEnglish ? mark.label_en : mark.label}
                        onDelete={() => {
                          let marks = [...searchForm.brand_id];
                          if (marks.includes(mark.value)) {
                            marks.splice(marks.indexOf(mark.value), 1);
                          }
                          _handleStartSearch("brand_id", marks);
                        }}
                      />
                    </Stack>
                
                ) : (
                  false
                );
              })
            : ""}
          {searchForm.brand_type_id && searchForm.brand_type_id.length > 0
            ? searchInputs.modelOptions.map((model, index) => {
                return searchForm.brand_type_id.includes(model.value)
                  ? getBrandValueAswell(model, index)
                  : false;
              })
            : ""}
    </>
  );
};

export default SelectedSearchTags;
