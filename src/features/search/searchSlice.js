import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchInputs: {
    marksOptions: [],
    modelOptions: [],
    cityOptions: [],
    shapes: [],
    sources: [],
    kilometer:[],
    price: [],

  },
  cars: [],
  numFound: 0,
  query: "",
  searchForm: {
    numFound: 0,
    price: [],
    price_obj: [],
    model_year_start: 1990,
    model_year_end: Number(new Date().getFullYear()),
    kilometer:[],
    kilometer_obj:[],
    brand_id: [],
    brand_type_id: [],
    source_id: [],
    shape_id: [],
    city_id: [],
    keyword: "",
    sort:"sort=date+desc",
    index: 0,
  },
  allReportReasons: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchInputs: (state, action) => {
      state.searchInputs = action.payload;
    },
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setSearchForm: (state, action) => {
      state.searchForm = action.payload
    },
    setSearchFormToInital: (state, action) => {
      state.searchForm = initialState.searchForm
    },
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setResultsNumebr: (state, action) => {
      state.numFound = action.payload
    },
    setReportReasons: (state, action) => {
      state.allReportReasons = action.payload;
    },
  },
});

export const { getSearchInputs, setCars , setSearchForm,setSearchFormToInital, setQuery, setResultsNumebr, setReportReasons } = searchSlice.actions;

export default searchSlice.reducer;
