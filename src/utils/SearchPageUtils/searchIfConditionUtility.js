export const searchIfConditionUtility = (
  state,
  t,
  notifyError,
  searchCars,
  filterSelected,
  dispatch,
  setResultsNumebr
) => {
  let callApi = false;
  if (state.brand_id.length) {
    if (state.brand_type_id.length > 3) {
      state.model_brand_id = state.model_brand_id.slice(0, 3);
      state.brand_type_id = state.brand_type_id.slice(0, 3);
      notifyError(t("search.filterLimitError"));
      return;
    }
    if (
      state.brand_id.length > 3 &&
      state.model_brand_id &&
      state.model_brand_id.length >= 3 &&
      state.brand_type_id &&
      state.brand_type_id.length >= 3
    ) {
      state.brand_id = state.brand_id.slice(0, 3);
      notifyError(t("search.filterLimitError"));
      return;
    }
  }
  const query = {};
  query["page"] = 1;
  if (
    state.manufacturing_year &&
    state.manufacturing_year != null &&
    state.manufacturing_year.length > 0
  ) {
    let yearSelected = [];
    state.manufacturing_year.forEach((id, index) => {
      yearSelected.push({
        min: id,
        max: id,
      });
    });
    query["model_year"] = yearSelected;
  }
  if (state.brand_id && state.brand_id != null && state.brand_id.length > 0) {
    callApi = true;
    let brandId = [];
    state.brand_id.forEach((id, index) => {
      brandId.push(id);
    });
    query["brand_id"] = brandId;
  }
  if (
    state.brand_type_id &&
    state.brand_type_id != null &&
    state.brand_type_id.length > 0
  ) {
    callApi = true;
    let brandType = [];
    state.brand_type_id.forEach((id, index) => {
      brandType.push(id);
    });
    query["brand_type_id"] = brandType;
  }

  if (state.city_id && state.city_id != null && state.city_id.length > 0) {
    let city = [];
    state.city_id.forEach((id, index) => {
      city.push(id);
    });
    query["city_id"] = city;
  }
  if (callApi) {
    searchCars(query, filterSelected).then((res) => {
      if (res && res.response) {
        dispatch(setResultsNumebr(res.response.numFound));
      }
    });
  }
};
