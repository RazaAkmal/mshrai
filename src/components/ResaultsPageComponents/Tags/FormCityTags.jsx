import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './FilterTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";
// import { IoIosClose } from "react-icons/io";
const FormCityTags = ({
  searchForm,
  searchInputs,
  _handleStartSearch,
  isEnglish,
}) => {
  return (
    <>
      {/* {searchForm.city_id && searchForm.city_id.length > 0
        ? searchInputs.cityOptions.map((city, index) => {
            return searchForm.city_id.includes(city.value) ? (
              <li key={"searchcities" + index}>
                {isEnglish ? city.label_en : city.label}
                <span
                  onClick={() => {
                    let cities = [...searchForm.city_id];
                    if (cities.includes(city.value)) {
                      cities.splice(cities.indexOf(city.value), 1);
                    }
                    _handleStartSearch("city_id", cities);
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
            {searchForm.city_id && searchForm.city_id.length > 0
            ? searchInputs.cityOptions.map((city, index) => {
                return searchForm.city_id.includes(city.value) ? (
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={isEnglish ? city.label_en : city.label}
                        onDelete={() => {
                          let cities = [...searchForm.city_id];
                          if (cities.includes(city.value)) {
                            cities.splice(cities.indexOf(city.value), 1);
                          }
                          _handleStartSearch("city_id", cities);
                        }}
                      />
                    </Stack>
                ) : ( false )
                }) : ""}
    </>
  );
};

export default FormCityTags;
