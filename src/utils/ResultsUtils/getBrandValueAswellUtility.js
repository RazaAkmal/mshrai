import { IoIosClose } from "react-icons/io";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";

export const getBrandValueAswellUtility =
  (searchInputs, isEnglish, searchForm, _handleStartSearch) =>
  (model, index) => {
    let filteredBrand = searchInputs.marksOptions.filter(
      (item) => item.value === model.brandId
    );
    const labelval =
    (isEnglish ? model.label_en : model.label) +
    " - " +
    (filteredBrand[0]
      ? isEnglish
        ? filteredBrand[0].label_en
        : filteredBrand[0].label
      : "");
    return (
      // <li key={"searchMarks" + index}>
      //   {isEnglish ? model.label_en : model.label}
      //   {filteredBrand[0]
      //     ? `- ${
      //         isEnglish ? filteredBrand[0].label_en : filteredBrand[0].label
      //       }`
      //     : ""}
      //   <span
      //     onClick={() => {
      //       let brandModel = [...searchForm.brand_type_id];
      //       if (brandModel.includes(model.value)) {
      //         brandModel.splice(brandModel.indexOf(model.value), 1);
      //       }
      //       _handleStartSearch("brand_type_id", brandModel);
      //     }}
      //   >
      //     <IoIosClose />
      //   </span>
      // </li>
      <Stack
      style={{ padding: "2px", display: "inline-flex" }}
      direction="row"
      spacing={1}
    >
      <Chip
      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
        className="filter_tag_style"
        label={labelval}
        onDelete={() => {
          let brandModel = [...searchForm.brand_type_id];
          if (brandModel.includes(model.value)) {
            brandModel.splice(brandModel.indexOf(model.value), 1);
          }
          _handleStartSearch("brand_type_id", brandModel);
        }}
      />
    </Stack>
    );
  };
