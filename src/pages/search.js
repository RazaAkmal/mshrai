import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { colourStyles } from "../constants";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { fetchSearchInputs } from "../features/search/searchApi";
import { useDispatch, useSelector } from "react-redux";
import { getSearchInputs, setSearchForm } from "../features/search/searchSlice";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function Search() {
  let history = useHistory();
  const searchInputs = useSelector((state) => state.search.searchInputs);
  const searchForm = useSelector((state) => state.search.searchForm);

  const dispatch = useDispatch();
  const [state, setState] = useState({...searchForm});
  useEffect(() => {
    fetchSearchInputs().then((result) => {
      $(".load_cont").fadeOut(function () {
        $(this).parent().fadeOut();
        $("body").css({ "overflow-y": "visible" });
      });
      dispatch(getSearchInputs(result));
    });
  }, [dispatch]);

  const addShape = (i) => {
    let shapes = [...state.shape_id];
    console.log(shapes);
    if(shapes.includes(i)){
      shapes.splice(shapes.indexOf(i),1);
    }else{
      shapes.push(i);
    }
    setState({
      ...state,
      shape_id: [...shapes]
    })
  }
  const addCity = (values) => {
    let cities = values.map(value => value.value);
    setState({
      ...state,
      city_id: [...cities]
    })
  }

  const setBrand = (values) => {
    let brands = values.map(value => value.value);
    setState({
      ...state,
      brand_id: [...brands]
    })
  }

  const setBrandType = (values) => {
    let brands_types = values.map(value => value.value);
    setState({
      ...state,
      brand_type_id: [...brands_types]
    })
  }

  const setYearRange = (values) => {
    setState({
      ...state,
      model_year_start: values[0],
      model_year_end: values[1]
    })
  }

  function navigateToResult(){
    dispatch(setSearchForm(state));
    localStorage.setItem( 'savedSearch', JSON.stringify(state) );
    console.log(state);
    history.push("/results");
  }
  return (
    <>
      <div className="main_screen img_bc">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cont">
                <img src="../images/logo_color.png" alt="" className="logo" />
                <h1>أفضل منصة لتحصل على أفضل السيارات المستعملة</h1>
                <form className="search_form">
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=" ماذاالذى  تبحث عنه ..."
                        value={state.keyword}
                        onChange={(e)=> setState({...state, keyword:e.target.value})}
                      />
                    </div>
                    <div className="col-md-6  mb-3">
                      <label className="text-end d-block"> الماركة </label>
                      <Select
                        defaultValue={searchInputs.marksOptions.map(i => state.brand_id.indexOf(i.value) != -1 ? i : false)}
                        isMulti
                        name="brand"
                        options={searchInputs.marksOptions}
                        className="basic-multi-select"
                        placeholder=""
                        styles={colourStyles}
                        onChange={(value)=> setBrand(value)}
                        // classNamePrefix="select"
                      />
                    </div>
                    <div className="col-md-6  mb-3">
                      <label className="text-end d-block"> المودل </label>
                      <Select
                        defaultValue={searchInputs.modelOptions.map(i => state.brand_type_id.indexOf(i.value) != -1 ? i : false)}
                        isMulti
                        name="brand"
                        options={searchInputs.modelOptions}
                        className="basic-multi-select"
                        placeholder=""
                        styles={colourStyles}
                        onChange={(value)=> setBrandType(value)}
                        // classNamePrefix="select"
                      />
                    </div>

                    <div className="col-md-6  mb-3">
                      <label className="text-end d-block"> المدينة </label>
                      <Select
                        defaultValue={searchInputs.cityOptions.map(i => state.city_id.indexOf(i.value) != -1 ? i : false)}
                        isMulti
                        name="brand"
                        options={searchInputs.cityOptions}
                        className="basic-multi-select"
                        placeholder=""
                        styles={colourStyles}
                        onChange={(value)=> addCity(value)}
                        // classNamePrefix="select"
                      />
                    </div>
                    <div className="col-md-6  mb-3">
                      <label className="text-end d-block">سنة الصنع</label>
                      <div className="mt-3">
                        <Range
                          onAfterChange={(value)=> setYearRange(value)}
                          marks={{
                            1990: `1990`,
                            2021: `2021`,
                          }}
                          min={1990}
                          max={new Date().getFullYear()}
                          defaultValue={[state.model_year_start, state.model_year_end]}
                          tipFormatter={(value) => `${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true,
                          }}
                          railStyle={{
                            background: "#fff",
                            height: "12px",
                            borderRadius: "3px",
                            border: "1px solid #e0e0e0",
                          }}
                          dotStyle={{ display: "none" }}
                          activeDotStyle={{}}
                          trackStyle={[
                            {
                              height: "100%",
                              background: "#dfdfdf",
                              borderRadius: 0,
                            },
                          ]}
                          handleStyle={[
                            {
                              background: "#3e0292",
                              color: "#555555",
                              width: "9px",
                              borderRadius: "3px",
                              border: 0,
                              cursor: "pointer",
                              height: "20px",
                              bottom: "-7px",
                            },
                            {
                              background: "#3e0292",
                              color: "#555555",
                              width: "9px",
                              borderRadius: "3px",
                              border: 0,
                              cursor: "pointer",
                              height: "20px",
                              bottom: "-7px",
                            },
                          ]}
                        />
                      </div>
                      {/* <div className="year_slider" name="slider"></div> */}
                    </div>

                    <div className="col-12 flex_col  mb-3">
                      {searchInputs.shapes.map((shape, i) => {
                        return (
                          <div className="checkbox" key={shape.id}>
                            <input type="checkbox" name="car_body" id={shape.id} value={shape.id}
                              checked={state.shape_id.includes(shape.id)}
                              onChange={(v) => addShape(shape.id)}/>
                            <label htmlFor={shape.id}>
                              <span>
                                <img src={shape.image} alt={shape.title} />
                                {shape.title}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    {/* <!--End Col-12--> */}
                  </div>
                  {/* <!--End Row--> */}

                  <button type="button" className="search-button" onClick={navigateToResult}>
                      <i className="fa fa-search"></i> عرض النتائج
                  </button>
                </form>
                <p>
                  إبحث فى أكتر من 5 الالاف موقع مهتم ببيع السيارات المستعملة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="loading">
        <div className="load_cont">
          <img src="./images/loading.gif" alt="loading" />
        </div>
      </div>
    </>
  );
}
