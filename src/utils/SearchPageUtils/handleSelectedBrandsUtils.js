export const handleSelectedBrandsUtils = (
  state,
  searchInputs,
  setBrandOptions
) => {
  const selectedBrands = [];
  let prevId;
  let newId = "";
  if (state.model_brand_id && state.model_brand_id.length) {
    state.model_brand_id.map((id) => {
      prevId = id;
      return searchInputs.marksOptions.map((brand) => {
        //this condition check the same brand should not print again, and also check and print brand of selected model
        if (brand.value === id && prevId !== newId) {
          newId = id;
          selectedBrands.push(brand);
        }
      });
    });
    console.log("selected brands", selectedBrands);
    setBrandOptions(selectedBrands);
  }
  // let selectedModel = [];
};
