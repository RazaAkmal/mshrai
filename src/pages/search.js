import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Tabs, Tab } from "react-bootstrap";
import { fetchSearchInputs, searchCars } from "../features/search/searchApi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  Menu,
  OptionCity,
  LoadingComponent,
  LogoHeader,
  SourcesImagesMain,
  SelectBoxContainer,
} from "../components";

import {
  getSearchInputs,
  setSearchForm,
  setResultsNumebr,
} from "../features/search/searchSlice";
import { useTranslation, Trans } from "react-i18next";
import { notifyError } from "../helpers";
import {
  formatOptionLabelUtility,
  searchIfConditionUtility,
  handleAnyYearChangeUtility,
  handleSelectedBrandsUtils,
} from "../utils";
// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range);

export default function Search() {
  const isEnglish = localStorage.getItem("lang") === "en";

  const navigate = useNavigate();
  const searchInputs = useSelector((state) => state.search.searchInputs);

  const searchForm = useSelector((state) => state.search.searchForm);
  const resultsNumber = useSelector((state) => state.search.numFound);
  const [modelOptions, setModelOptions] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [validationError, setValidationError] = useState(false);

  const selectedLng = useSelector((state) => state.search.language);

  const dispatch = useDispatch();
  const [state, setState] = useState({ ...searchForm });

  useEffect(() => {
    fetchSearchInputs(selectedLng).then((result) => {
      let el = document.querySelector(".load_cont");
      el.addEventListener("animationend", function () {
        el.parentElement.classList.add("fadeout");
        document.body.style.overflowY = "visible";
      });
      el.classList.add("fadeout");
      setTimeout(() => {
        el.style.display = "none";
        el.parentElement.style.display = "none";
      }, 100);
      dispatch(getSearchInputs(result));
    });
  }, [dispatch, selectedLng]);

  const [filterSelected, setFilterSelected] = useState(false);

  useEffect(() => {
    const brandOptionsStored = searchInputs.marksOptions.map((i) =>
      state.brand_id.indexOf(i.value) !== -1 ? i : false
    );
    setBrandOptions(brandOptionsStored);
  }, [searchInputs]);

  useEffect(() => {
    const yearOptionSelected = searchInputs.yearOptions.map((i) =>
      state.manufacturing_year.indexOf(i.value) !== -1 ? i : false
    );
    setSelectedYears(yearOptionSelected);
  }, [searchInputs]);

  useEffect(() => {
    const modelOptionsStored = searchInputs.modelOptions.map((i) =>
      state.brand_type_id.indexOf(i.value) !== -1 ? i : false
    );
    setSelectedModels(modelOptionsStored);
  }, [searchInputs]);

  useEffect(() => {
    searchIfConditionUtility(
      state,
      t,
      notifyError,
      searchCars,
      filterSelected,
      dispatch,
      setResultsNumebr
    );
  }, [state]);

  // const addShape = (i) => {
  //   let shapes = [...state.shape_id];
  //   console.log(shapes);
  //   if (shapes.includes(i)) {
  //     shapes.splice(shapes.indexOf(i), 1);
  //   } else {
  //     shapes.push(i);
  //   }
  //   setState({
  //     ...state,
  //     shape_id: [...shapes],
  //   });
  // };
  const addCity = (values) => {
    setFilterSelected(true);
    let cities = values.map((value) => value.value);
    setState({
      ...state,
      city_id: [...cities],
    });
  };

  const setBrand = (values) => {
    setFilterSelected(true);
    let brands = values.map((value) => value.value);
    setState({
      ...state,
      brand_id: [...brands],
    });
    setBrandOptions(values);
    setSelectedBrand(values);
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
    handleSelectedBrandsUtils(state, searchInputs, setBrandOptions);
  }, [state.model_brand_id]);

  const setBrandType = (values) => {
    let brands_types = values.map((value) => value.value);
    let brands_type_id = values.map((value) => value.brandId);

    setState({
      ...state,
      brand_type_id: [...brands_types],
      model_brand_id: [...brands_type_id],
    });
    setSelectedModels(values);
    setFilterSelected(true);
  };

  const setYearRange = (values) => {
    let year_range_values = values.map((value) => value.label);
    setState({
      ...state,
      manufacturing_year: [...year_range_values],
    });
    setSelectedYears(values);
    setFilterSelected(true);
  };

  // const setYearRange = (values) => {
  //   setState({
  //     ...state,
  //     model_year_start: values[0],
  //     model_year_end: values[1],
  //   });
  //   setFilterSelected(true)
  // };

  function navigateToResult() {
    if (state.brand_id.length > 0 || state.brand_type_id.length > 0) {
      dispatch(setSearchForm(state));
      localStorage.setItem("savedSearch", JSON.stringify(state));
      // console.log(state);
      navigate("/results");
    } else {
      setValidationError(true);
      // notifyError(t("search.searchConditionError"))
    }
  }
  const [key, setKey] = useState("findCar");

  const { t } = useTranslation();
  const textareaRef = useRef();
  // const cursorPosition = 0;

  const formatOptionLabel = formatOptionLabelUtility(isEnglish);
  const handleBrandChange = (value) => {
    if (value.length <= 3) {
      setValidationError(false);
      setBrand(value);
    } else {
      notifyError(t("search.brandLimitError"));
    }
  };
  const handleAnyTypeChange = (value) => {
    if (value.length <= 3) {
      setBrandType(value);
    } else {
      notifyError(t("search.modelLimitError"));
    }
  };
  const handleAnyYearChange = (value) =>
    handleAnyYearChangeUtility(value, selectedYears, setYearRange);
  return (
    <>
      {/* <div className="firstpage_logo">
        <img className="firstpage_logo_img" src="./images/logo.png" alt="logo" />
      </div> */}
      <LogoHeader background />

      <div className="main_screen img_bc">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-5">
              <div className="cont">
                {/* <img src="../images/logo_color.png" alt="" className="logo" /> */}
                {/* <h2 className="pb-4"><Trans i18nKey="description.testLaunch" /></h2> */}
                <h1>
                  <Trans i18nKey="description.Footer" />
                </h1>
                {/* SourcesImagesMain  */}
                <SourcesImagesMain searchInputs={searchInputs} />
                <form className="search_form">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="findCar" label="">
                      {/* <Tab eventKey="findCar" style={{backgroundColor:'white'}} title={t("search.findMyCar")}> */}
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

                        {/* FOR BRANDS ////////////////////////////////////////////////////////////////*/}
                        <SelectBoxContainer
                          label={t("search.brand")}
                          value={brandOptions}
                          defaultValue={""}
                          name="brand"
                          options={searchInputs.marksOptions}
                          placeholder={t("search.selectMore")}
                          onChange={(value) => handleBrandChange(value)}
                          formatOptionLabel={formatOptionLabel}
                          validity={validationError}
                        />

                        {/* FOR MODELS /////////////////////////////////////////////////////////////*/}
                        <SelectBoxContainer
                          label={t("search.type")}
                          value={selectedModels}
                          defaultValue={searchInputs.modelOptions.map((i) =>
                            state.brand_type_id.indexOf(i.value) !== -1
                              ? i
                              : false
                          )}
                          name="modal"
                          options={modelOptions.map((i) => ({
                            ...i,
                            label: isEnglish ? i.label_en : i.label,
                          }))}
                          placeholder={t("search.anyType")}
                          onChange={(value) => handleAnyTypeChange(value)}
                          myRef={textareaRef}
                        />
                        {/* For Years /////////////////////////////////// */}
                        <SelectBoxContainer
                          label={t("search.model")}
                          value={selectedYears}
                          components={{ Menu }}
                          defaultValue={""}
                          name="modal_year"
                          options={searchInputs.yearOptions}
                          placeholder={t("search.anyYear")}
                          onChange={(value) => handleAnyYearChange(value)}
                          classNamePrefix="select"
                        />

                        {/* <div className="col-md-6 col-sm-6  mb-3">
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
                        </div> */}
                        {/* FOR CITIES /////////////////////////////////////////////////////////////*/}
                        <SelectBoxContainer
                          label={t("search.city")}
                          components={{ Option: OptionCity }}
                          defaultValue={searchInputs.cityOptions.map((i) =>
                            state.city_id.indexOf(i.value) !== -1 ? i : false
                          )}
                          name="city"
                          options={searchInputs.cityOptions.map((i) => ({
                            ...i,
                            label: isEnglish ? i.label_en : i.label,
                          }))}
                          placeholder={t("search.anyCity")}
                          onChange={(value) => addCity(value)}
                        />
                        {/* <div className="col-md-6 col-sm-6  mb-3"></div> */}
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
                    className="search-button btn-primary"
                    onClick={navigateToResult}
                  >
                    {t("search.see")}{" "}
                    {state.brand_id.length > 0 || state.brand_type_id.length > 0
                      ? resultsNumber
                      : ""}{" "}
                    {t("search.car")}
                  </button>
                </form>
                {/* <p>{t("description.Footer")}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingComponent />
      <ToastContainer />
    </>
  );
}
