import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './FilterTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";
import { IoIosClose } from "react-icons/io";
const FormShapeTags = ({
  searchForm,
  searchInputs,
  _handleStartSearch,
  isEnglish,
}) => {
  return (
    <>
      {/* {searchForm.shape_id && searchForm.shape_id.length > 0
        ? searchInputs.shapes.map((shape, index) => {
            return searchForm.shape_id.includes(shape.id) ? (
              <li key={"searchShapes" + index}>
                {isEnglish ? shape.title_en : shape.title}
                <span
                  onClick={() => {
                    let shapes = [...searchForm.shape_id];
                    if (shapes.includes(shape.value)) {
                      shapes.splice(shapes.indexOf(shape.value), 1);
                    }
                    _handleStartSearch("shape_id", shapes);
                  }}
                >
                  <IoIosClose />
                </span>
              </li>
            ) : (
              false
            );
          })
        : ""} */}
            {searchForm.shape_id && searchForm.shape_id.length > 0
            ? searchInputs.shapes.map((shape, index) => {
                return searchForm.shape_id.includes(shape.id) ? (
                  <Stack
                    style={{ padding: "5px 2px", display: "inline-flex" }}
                    direction="row"
                    spacing={1}
                  >
                    <Chip
                    deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                      className="filter_tag_style"
                      label={isEnglish ? shape.title_en : shape.title}
                      onDelete={() => {
                        let shapes = [...searchForm.shape_id];
                        if (shapes.includes(shape.value)) {
                          shapes.splice(shapes.indexOf(shape.value), 1);
                        }
                        _handleStartSearch("shape_id", shapes);
                      }}
                    />
                  </Stack>
                ) : (
                  false
                );
              })
            : ""}
    </>
  );
};

export default FormShapeTags;
