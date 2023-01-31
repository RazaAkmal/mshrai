import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './FilterTag.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";
import { IoIosClose } from "react-icons/io";
const FormPriceTags = ({ searchForm, _handleStartSearch }) => {
  return (
    <>
      {/* {searchForm.price && searchForm.price.length > 0
        ? searchForm.price.map((price, index) => {
            return (
              <li style={{ direction: "ltr" }} key={"searchcities" + index}>
                {price}
                <span
                  onClick={() => {
                    let prices = [...searchForm.price];
                    prices.splice(prices.indexOf(price), 1);
                    _handleStartSearch("price", prices);
                  }}
                >
                  <IoIosClose />
                </span>
              </li>
            );
          })
        : ""} */}
            {searchForm.price && searchForm.price.length > 0
            ? searchForm.price.map((price, index) => {
                return (
             
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={price}
                        onDelete={() => {
                          let prices = [...searchForm.price];
                          prices.splice(prices.indexOf(price), 1);
                          _handleStartSearch("price", prices);
                        }}
                      />
                    </Stack>
                  
                );
              })
            : ""}
    </>
  );
};

export default FormPriceTags;
