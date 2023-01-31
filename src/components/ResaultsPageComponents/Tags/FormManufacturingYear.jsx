import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './FilterTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";
import { IoIosClose } from "react-icons/io";
const FormManufacturingYear = ({ searchForm, _handleStartSearch }) => {
  return (
    <>
      {/* {searchForm.manufacturing_year && searchForm.manufacturing_year.length > 0
        ? searchForm.manufacturing_year.map((year, index) => (
            <li>
              {year}
              <span
                onClick={() => {
                  _handleStartSearch("manufacturing_year", year);
                }}
              >
                <IoIosClose />
              </span>
            </li>
          ))
        : ""} */}
        {searchForm.manufacturing_year &&
          searchForm.manufacturing_year.length > 0
            ? searchForm.manufacturing_year.map((year, index) => (
                  <Stack
                    style={{ padding: "5px 2px", display: "inline-flex" }}
                    direction="row"
                    spacing={1}
                  >
                    <Chip
                    deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                      className="filter_tag_style"
                      label={year}
                      variant="outlined"
                      onDelete={() => {
                      _handleStartSearch("manufacturing_year", year);
                      }}
                    />
                  </Stack>
              ))
            : ""}
    </>
  );
};

export default FormManufacturingYear;
