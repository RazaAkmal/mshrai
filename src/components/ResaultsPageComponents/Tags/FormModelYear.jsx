import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './FilterTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";
import { IoIosClose } from "react-icons/io";
const FormModelYear = ({ searchForm, _handleStartSearch }) => {
  return (
    <>
      {/* {searchForm.model_year_end &&
      (searchForm.model_year_end < new Date().getFullYear() ||
        searchForm.model_year_start > 1990) ? (
        <li>
          {searchForm.model_year_start + "-" + searchForm.model_year_end}
          <span
            onClick={() => {
              _handleStartSearch("model_year", {
                model_year_start: 1990,
                model_year_end: new Date().getFullYear(),
              });
            }}
          >
            <IoIosClose />
          </span>
        </li>
      ) : (
        ""
      )} */}
        {searchForm.model_year_end &&
          (searchForm.model_year_end < new Date().getFullYear() ||
            searchForm.model_year_start > 1990) ? (
              <Stack
                style={{ padding: "5px 2px", display: "inline-flex" }}
                direction="row"
                spacing={1}
              >
                <Chip
                deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                  className="filter_tag_style"
                  label={searchForm.model_year_start + "-" + searchForm.model_year_end}
                  onDelete={() => {
                    _handleStartSearch("model_year", {
                      model_year_start: 1990,
                      model_year_end: new Date().getFullYear(),
                    });
                  }}
                />
              </Stack>
          ) : (
            ""
          )}
    </>
  );
};

export default FormModelYear;
