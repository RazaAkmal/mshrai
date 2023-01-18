export const handleStartSearchUtility =
  (
    setNextPage,
    setFilterSelected,
    dispatch,
    setSearchFormToInital,
    setSearchForm,
    searchForm,
    state,
    setPage,
    notifyError,
    t,
    page
  ) =>
  (type, value, value_obj) => {
    setNextPage(false);
    setFilterSelected(true);
    switch (type) {
      case "clearall":
        setFilterSelected(false);
        dispatch(setSearchFormToInital());
        break;
      case "keyword":
        dispatch(
          setSearchForm({
            ...searchForm,
            keyword: state.searchKeyWord,
            index: 0,
          })
        );
        break;
      case "price":
        setPage(1);
        dispatch(
          setSearchForm({
            ...searchForm,
            price: value,
            price_obj: value_obj,
            index: 0,
          })
        );
        break;
      case "brand_type_id":
        if (value.length > 3) {
          notifyError(t("results.filterLimitError"));
        } else {
          setPage(1);
          dispatch(
            setSearchForm({ ...searchForm, brand_type_id: value, index: 0 })
          );
        }
        break;
      case "brand_id":
        if (value.length > 3) {
          notifyError(t("results.filterLimitError"));
        } else {
          setPage(1);
          dispatch(setSearchForm({ ...searchForm, brand_id: value, index: 0 }));
        }
        break;
      case "source_id":
        dispatch(setSearchForm({ ...searchForm, source_id: value, index: 0 }));
        break;
      case "city_id":
        setPage(1);
        dispatch(setSearchForm({ ...searchForm, city_id: value, index: 0 }));
        break;
      case "manufacturing_year":
        let filteredYear = searchForm.manufacturing_year.filter(
          (element) => element !== value
        ); // [1,2,4,5,7]
        setPage(1);
        dispatch(
          setSearchForm({
            ...searchForm,
            manufacturing_year: filteredYear,
            index: 0,
          })
        );
        break;
      case "model_year":
        setPage(1);
        dispatch(
          setSearchForm({
            ...searchForm,
            model_year_start: value.model_year_start,
            model_year_end: value.model_year_end,
            manufacturing_year: [],
          })
        );
        break;
      case "shape_id":
        setPage(1);
        dispatch(setSearchForm({ ...searchForm, shape_id: value, index: 0 }));
        break;
      case "kilometer":
        setPage(1);
        dispatch(
          setSearchForm({
            ...searchForm,
            kilometer: value,
            kilometer_obj: value_obj,
            index: 0,
          })
        );
        break;
      case "sort":
        setPage(1);
        dispatch(setSearchForm({ ...searchForm, sort: value, index: 0 }));
        break;
      case "paginate":
        setNextPage(true);
        setPage(page + 1);
        dispatch(setSearchForm({ ...searchForm, index: value }));
        break;
      default:
        break;
    }
  };
