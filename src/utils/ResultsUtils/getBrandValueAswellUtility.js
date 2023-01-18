import { IoIosClose } from "react-icons/io";

export const getBrandValueAswellUtility =
  (searchInputs, isEnglish, searchForm, _handleStartSearch) =>
  (model, index) => {
    let filteredBrand = searchInputs.marksOptions.filter(
      (item) => item.value === model.brandId
    );
    return (
      <li key={"searchMarks" + index}>
        {isEnglish ? model.label_en : model.label}
        {filteredBrand[0]
          ? `- ${
              isEnglish ? filteredBrand[0].label_en : filteredBrand[0].label
            }`
          : ""}
        <span
          onClick={() => {
            let brandModel = [...searchForm.brand_type_id];
            if (brandModel.includes(model.value)) {
              brandModel.splice(brandModel.indexOf(model.value), 1);
            }
            _handleStartSearch("brand_type_id", brandModel);
          }}
        >
          <IoIosClose />
        </span>
      </li>
    );
  };
