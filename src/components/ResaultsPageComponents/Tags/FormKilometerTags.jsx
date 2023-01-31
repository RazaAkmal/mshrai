import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './FilterTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";
import { IoIosClose } from "react-icons/io";
const FormKilometerTags = ({ searchForm, _handleStartSearch }) => {
  return (
    <>
      {/* {searchForm.kilometer && searchForm.kilometer.length > 0
        ? searchForm.kilometer.map((kilometer, index) => {
            return (
              <li style={{ direction: "ltr" }} key={"searchcities" + index}>
                {kilometer}
                <span
                  onClick={() => {
                    let kilometers = [...searchForm.kilometer];
                    kilometers.splice(kilometers.indexOf(kilometer), 1);
                    _handleStartSearch("kilometer", kilometers);
                  }}
                >
                  <IoIosClose />
                </span>
              </li>
            );
          })
        : ""} */}
            {searchForm.kilometer && searchForm.kilometer.length > 0
            ? searchForm.kilometer.map((kilometer, index) => {
                return (
                
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={kilometer}
                        onDelete={() => {
                          let kilometers = [...searchForm.kilometer];
                          kilometers.splice(kilometers.indexOf(kilometer), 1);
                          _handleStartSearch("kilometer", kilometers);
                        }}
                      />
                    </Stack>
             
                );
              })
            : ""}
    </>
  );
};

export default FormKilometerTags;
