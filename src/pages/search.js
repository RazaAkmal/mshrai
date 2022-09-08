import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { colourStyles } from "../constants";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Tabs, Tab } from "react-bootstrap";
import { fetchSearchInputs, fetchCars } from "../features/search/searchApi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import {
  getSearchInputs,
  setSearchForm,
  setResultsNumebr,
} from "../features/search/searchSlice";
import { useTranslation, Trans } from "react-i18next";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


export default function Search() {
  const isEnglish = localStorage.getItem("lang") === "en";
  const showError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  let history = useHistory();
  const searchInputs = useSelector((state) => state.search.searchInputs);

  const searchForm = useSelector((state) => state.search.searchForm);
  const resultsNumber = useSelector((state) => state.search.numFound);

  const [modelOptions, setModelOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  const dispatch = useDispatch();
  const [state, setState] = useState({ ...searchForm });

  useEffect(() => {
    fetchSearchInputs().then((result) => {
      $(".load_cont").fadeOut(function () {
        $(this).parent().fadeOut();
        $("body").css({ "overflow-y": "visible" });
      });
      dispatch(getSearchInputs(result));
    });
  }, [dispatch]);

  const [yearList, setYearList] = useState([]);

  useEffect(() => {
    const yearOption = [];
    for (let index = 1990; index < new Date().getFullYear(); index++) {
      yearOption.push({ id: index, label: index });
    }
    setYearList(yearOption);
  }, []);

  useEffect(() => {
    const brandOptionsStored = searchInputs.marksOptions.map((i) =>
      state.brand_id.indexOf(i.value) !== -1 ? i : false
    );
    setBrandOptions(brandOptionsStored);
  }, [searchInputs]);

  useEffect(() => {
    if (state.brand_id.length && state.brand_type_id.length > 3) {
        state.model_brand_id.pop();
        state.brand_type_id.pop();
        showError(t("search.filterLimitError"));
        return;
    }

    var query = `model_year:[${state.model_year_start} TO ${state.model_year_end}]`;
    if (state.keyword && state.keyword !== "") {
      query += ` AND (brand:"${state.keyword}" OR brand_type:"${state.keyword}")`;
    }
    if (state.brand_id && state.brand_id != null && state.brand_id.length > 0) {
      query += ` AND brand_id:(`;
      state.brand_id.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (
      state.brand_type_id &&
      state.brand_type_id != null &&
      state.brand_type_id.length > 0
    ) {
      query += ` AND brand_type_id:(`;
      state.brand_type_id.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (state.shape_id && state.shape_id != null && state.shape_id.length > 0) {
      query += ` AND shape_id:(`;
      state.shape_id.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (state.city_id && state.city_id != null && state.city_id.length > 0) {
      query += ` AND city_id:(`;
      state.city_id.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (state.kilometer && state.kilometer.length > 0) {
      query += ` AND kilometer:(`;
      state.kilometer.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (state.price && state.price.length > 0) {
      query += ` AND price:(`;
      state.price.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (state.sort && state.sort !== "") {
      query += `&${state.sort}`;
    }

    query += `&rows=12&start=${searchForm.index}&fl=date,city,source,gear_id,gear,_version_,sid,city_id,id,source_id,brand,brand_type,brand_type_id,shape,model_year,published,image2,url,brand_id,source_image,shape_id`;
    fetchCars(query).then((res) => {
      if (res && res.response && res.response.docs) {
        dispatch(setResultsNumebr(res.response.numFound));
      }
    });
  }, [state]);

  const addShape = (i) => {
    let shapes = [...state.shape_id];
    console.log(shapes);
    if (shapes.includes(i)) {
      shapes.splice(shapes.indexOf(i), 1);
    } else {
      shapes.push(i);
    }
    setState({
      ...state,
      shape_id: [...shapes],
    });
  };
  const addCity = (values) => {
    let cities = values.map((value) => value.value);
    setState({
      ...state,
      city_id: [...cities],
    });
  };

  const setBrand = (values) => {
    let brands = values.map((value) => value.value);
    setState({
      ...state,
      brand_id: [...brands],
    });
    setBrandOptions(values);
  };

  useEffect(() => {
    const models = [];
    if (state.brand_id.length) {
      state.brand_id.map((id) => {
        return searchInputs.modelOptions.map((model) => {
          if (model.brandId === id) {
            models.push(model);
          }
        });
      });
    } else {
      searchInputs.modelOptions.map((model) => models.push(model));
    }
    setModelOptions(models);
  }, [state.brand_id, searchInputs.modelOptions]);

  useEffect(() => {
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
      setBrandOptions(selectedBrands);
    }
  }, [state.model_brand_id]);

  const setBrandType = (values) => {
    let brands_types = values.map((value) => value.value);
    let brands_type_id = values.map((value) => value.brandId);

    setState({
      ...state,
      brand_type_id: [...brands_types],
      model_brand_id: [...brands_type_id],
    });
  };

  const setYearRange = (values) => {
    setState({
      ...state,
      model_year_start: values[0],
      model_year_end: values[1],
    });
  };

  function navigateToResult() {
    console.log()
    dispatch(setSearchForm(state));
    localStorage.setItem("savedSearch", JSON.stringify(state));
    console.log(state);
    history.push("/results");
  }
  const [key, setKey] = useState("findCar");

  const { t } = useTranslation();
  const textareaRef = useRef();
  const cursorPosition = 0;

  const formatOptionLabel = ({ label, label_en, image }) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{isEnglish ? label_en : label}</div>
        <div>
          <img alt="car-logo" height={50} width={50} src={image} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="main_screen img_bc">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-5 pt-5">
              <div className="cont">
                <img src="../images/logo_color.png" alt="" className="logo" />
                <h1>
                  <Trans i18nKey="description.Header" />
                </h1>
                <form className="search_form">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="findCar" title={t("search.findMyCar")}>
                      <div className="row px-2">
                        {/* Commenting this Code is its not required yet
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=" ماذاالذى  تبحث عنه ..."
                        value={state.keyword}
                        onChange={(e)=> setState({...state, keyword:e.target.value})}
                      />
                    </div> */}
                        <div className="col-md-12 mb-3 d-block d-sm-none">
                          <label className="text-end d-block">
                            {t("search.brand")}
                          </label>
                          <Select
                            // defaultValue={searchInputs.marksOptions.map(i => state.brand_id.indexOf(i.value) !== -1 ? i : false)}
                            value={brandOptions}
                            isMulti
                            name="brand"
                            options={searchInputs.marksOptions}
                            className="basic-multi-select"
                            placeholder={t("search.anyBrand")}
                            styles={colourStyles}
                            onChange={(value) => setBrand(value)}
                            formatOptionLabel={formatOptionLabel}
                          />
                        </div>
                        <div className="col-md-6 col-6  mb-3 d-none d-sm-block">
                          <label className="text-end d-block">
                            {t("search.brand")}
                          </label>
                          <Select
                            // defaultValue={searchInputs.marksOptions.map(i => state.brand_id.indexOf(i.value) !== -1 ? i : false)}
                            value={brandOptions}
                            isMulti
                            name="brand"
                            options={searchInputs.marksOptions}
                            className="basic-multi-select"
                            placeholder=""
                            styles={colourStyles}
                            onChange={(value) => setBrand(value)}
                            formatOptionLabel={formatOptionLabel}

                            // classNamePrefix="select"
                          />
                        </div>
                        <div className="col-md-6 col-6  mb-3">
                          <label className="text-end d-block">
                            {t("search.model")}
                          </label>
                          <Select
                            defaultValue={searchInputs.modelOptions.map((i) =>
                              state.brand_type_id.indexOf(i.value) !== -1
                                ? i
                                : false
                            )}
                            isMulti
                            ref={textareaRef}
                            // onBlur={() =>
                            //   textareaRef.current.setSelectionRange(
                            //     cursorPosition,
                            //     cursorPosition
                            //   )
                            // }
                            name="brand"
                            options={modelOptions.map((i) => ({
                              ...i,
                              label: isEnglish ? i.label_en : i.label,
                            }))}
                            className="basic-multi-select"
                            placeholder=""
                            styles={colourStyles}
                            onChange={(value) => setBrandType(value)}
                            // classNamePrefix="select"
                          />
                        </div>
                        <div className="col-md-6 col-6 mb-3">
                          <label className="text-end d-block">
                            {t("search.specificYearOfManufacture")}
                          </label>
                          <Select
                            value={
                              state.model_year_end ===
                                state.model_year_start && [
                                { label: state.model_year_end },
                              ]
                            }
                            name="brand"
                            options={yearList}
                            className="basic-multi-select"
                            placeholder=""
                            styles={colourStyles}
                            onChange={(value) =>
                              setYearRange([value.label, value.label])
                            }
                            // classNamePrefix="select"
                          />
                        </div>
                        <div className="col-md-6 col-6  mb-3">
                          <label className="text-end d-block">
                            {t("search.manufacturingYear")}
                          </label>
                          <div className="mt-3">
                            <Range
                              onChange={(value) => setYearRange(value)}
                              // marks={{
                              //   1990: `1990`,
                              //   2022: `2022`,
                              // }}
                              min={1990}
                              max={new Date().getFullYear()}
                              value={[
                                state.model_year_start,
                                state.model_year_end,
                              ]}
                              tipFormatter={(value) => `${value}`}
                              tipProps={{
                                placement: "bottom",
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
                        <div className="col-md-6 col-6  mb-3">
                          <label className="text-end d-block">
                            {t("search.city")}
                          </label>
                          <Select
                            defaultValue={searchInputs.cityOptions.map((i) =>
                              state.city_id.indexOf(i.value) != -1 ? i : false
                            )}
                            isMulti
                            name="brand"
                            options={searchInputs.cityOptions}
                            className="basic-multi-select"
                            placeholder={t("search.anyCity")}
                            styles={colourStyles}
                            onChange={(value) => addCity(value)}
                            // classNamePrefix="select"
                          />
                        </div>

                        {/* <div className="col-md-6 col-6  mb-3"></div> */}
                        {/* Commenting this Code is its not required yet
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
                    </div> */}
                        {/* <!--End Col-12--> */}
                      </div>
                    </Tab>
                  </Tabs>

                  {/* <!--End Row--> */}

                  {/* <button type="button" disabled={!resultsNumber > 0}  className={resultsNumber > 0 ? "search-button" : "disable-button" } onClick={navigateToResult}>
                    شاهد {resultsNumber} سيارة
                  </button> */}
                  <button
                    type="button"
                    className="search-button"
                    onClick={navigateToResult}
                  >
                    {t("search.see")} {resultsNumber} {t("search.car")}
                  </button>
                </form>
                <p>{t("description.Footer")}</p>
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
      <ToastContainer />
    </>
  );
}
