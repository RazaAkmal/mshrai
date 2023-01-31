import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './FilterTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";
import { IoIosClose } from "react-icons/io";
const FormSourceTags = ({
  searchForm,
  searchInputs,
  _handleStartSearch,
  isEnglish,
}) => {
  return (
    <>
      {/* {searchForm.source_id && searchForm.source_id.length > 0
        ? searchInputs.sources.map((source, index) => {
            return searchForm.source_id.includes(source.value) ? (
              <li key={"searchcities" + index}>
                {source.label === "Snap"
                  ? "Social Media"
                  : isEnglish
                  ? source.label_en
                  : source.label}
                <span
                  onClick={() => {
                    let sources = [...searchForm.source_id];
                    if (sources.includes(source.value)) {
                      sources.splice(sources.indexOf(source.value), 1);
                    }
                    _handleStartSearch("source_id", sources);
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
            {searchForm.source_id && searchForm.source_id.length > 0
            ? searchInputs.sources.map((source, index) => {
                return searchForm.source_id.includes(source.value) ? (
                 
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={
                          source.label === "Snap"
                            ? "Social Media"
                            : isEnglish
                            ? source.label_en
                            : source.label
                        }
                        onDelete={() => {
                          let sources = [...searchForm.source_id];
                          if (sources.includes(source.value)) {
                            sources.splice(sources.indexOf(source.value), 1);
                          }
                          _handleStartSearch("source_id", sources);
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

export default FormSourceTags;
