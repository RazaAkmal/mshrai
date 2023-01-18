export const handleResultsIfCondition = (
  searchForm,
  query,
  searchCars,
  filterSelected,
  selectedLng,
  setIinitialCars,
  dispatch,
  setCars,
  setResultsNumebr,
  setLoading,
  nextPage
) => {
  if (
    searchForm.manufacturing_year &&
    searchForm.manufacturing_year != null &&
    searchForm.manufacturing_year.length > 0
  ) {
    let yearSelected = [];
    searchForm.manufacturing_year.forEach((id, index) => {
      yearSelected.push({
        min: id,
        max: id,
      });
    });
    query["model_year"] = yearSelected;
  } else {
    let modelYear = [
      {
        min: searchForm.model_year_start,
        max: searchForm.model_year_end,
      },
    ];
    query["model_year"] = modelYear;
  }

  if (
    searchForm.brand_id &&
    searchForm.brand_id != null &&
    searchForm.brand_id.length > 0
  ) {
    let brandId = [];
    searchForm.brand_id.forEach((id, index) => {
      brandId.push(id);
    });
    query["brand_id"] = brandId;
  }
  if (
    searchForm.brand_type_id &&
    searchForm.brand_type_id != null &&
    searchForm.brand_type_id.length > 0
  ) {
    let brandType = [];
    searchForm.brand_type_id.forEach((id, index) => {
      brandType.push(id);
    });
    query["brand_type_id"] = brandType;
  }
  // if (
  //   searchForm.shape_id &&
  //   searchForm.shape_id != null &&
  //   searchForm.shape_id.length > 0
  // ) {
  //   query += ` AND shape_id:(`;
  //   searchForm.shape_id.forEach((id, index) => {
  //     query += index === 0 ? id : ` OR ${id}`;
  //   });
  //   query += ")";
  // }
  if (
    searchForm.city_id &&
    searchForm.city_id != null &&
    searchForm.city_id.length > 0
  ) {
    let city = [];
    searchForm.city_id.forEach((id, index) => {
      city.push(id);
    });
    query["city_id"] = city;
  }
  if (
    searchForm.source_id &&
    searchForm.source_id != null &&
    searchForm.source_id.length > 0
  ) {
    let source = [];
    searchForm.source_id.forEach((id, index) => {
      source.push(id);
    });
    query["source_id"] = source;
  }
  if (searchForm.kilometer && searchForm.kilometer.length > 0) {
    query["kilometer"] = searchForm.kilometer_obj;
  }
  if (searchForm.price && searchForm.price.length > 0) {
    query["price"] = searchForm.price_obj;
  }
  if (searchForm.sort && searchForm.sort !== "") {
    let type = searchForm.sort.includes("price") ? "price" : "date";
    let order = searchForm.sort.includes("asc") ? "asc" : "desc";
    query["sort"] = {
      order: order,
      column: type,
    };
  }
  // if (carsContain("Syarah") || carsContain("haraj")) {
  //   query += "&sort=query($haraj_sort, 0) asc, query($sayarah_sort, 0) asc";
  //   query += "&haraj_sort={!field f=source v=haraj}";
  //   query += "&sayarah_sort={!field f=source v=Syarah}";
  // }

  searchCars(query, filterSelected, selectedLng).then((res) => {
    let el = document.querySelector(".load_cont");
    el.addEventListener("animationend", function () {
      el.parentElement.classList.add("fadeout");
      document.body.style.overflowY = "visible";
    });
    el.classList.add("fadeout");
    setTimeout(() => {
      el.style.display = "none";
      el.parentElement.style.display = "none";
    }, 400);
    if (res && res.response && res.response.docs) {
      setIinitialCars(res.response.docs);
      let carsArray = nextPage ? [...res.response.docs] : res.response.docs;
      dispatch(setCars(carsArray));
      dispatch(setResultsNumebr(res.response.numFound));
      setLoading(false);
    }
  });
};
