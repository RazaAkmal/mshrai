import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchInputs: {
    marksOptions: [],
    modelOptions: [],
    cityOptions: [],
    shapes: [],
  },
  cars: [],
  searchForm: {
    price: [],
    model_year_start: 1990,
    model_year_end: Number(new Date().getFullYear()),
    kilometer:[],
    brand_id: [],
    brand_type_id: [],
    shape_id: [],
    city_id: [],
    keyword: "",
    sort_by:"",
    sort_order:""
  }
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
    }
  },
});

export const { getSearchInputs, setCars , setSearchForm } = searchSlice.actions;

export default searchSlice.reducer;
