import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchInputs } from "../features/search/searchApi";
import { getSearchInputs } from "../features/search/searchSlice";
import { Accordion } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import CityListPopper from "./CityListPopper";
import Divider from '@mui/material/Divider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MobileCityDrawer from './MobileCityDrawer'
import FilterTags from "./ResaultsPageComponents/Tags/FilterTags";
import './ResaultsPageComponents/Tags/FilterTag.css';
import { SearchTagsRemove } from "./ResaultsPageComponents/Tags";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function Filters(props) {
  const searchInputs = useSelector((state) => state.search.searchInputs);
  const [modelOptions, setModelOptions] = useState([]);
  const [filterbrand, setFilterbrand] = useState("");
  const [filterModal, setFilterModal] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const isEnglish = localStorage.getItem("lang") === "en";


  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [selectedProvience, setSelectedProvience] = useState('')
  const [showWrapperDiv, setShowWrapperDiv] = useState(false)

  const handleClick = (newPlacement, provience) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    setSelectedProvience(provience)
    setShowWrapperDiv(true)
    document.body.style.overflow = 'hidden';
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const sortedSearchSources = searchInputs.sources
    .reduce((acc, element) => {
      if (
        element.label_en !== "Snapchat" &&
        element.label_en !== "Instagram" &&
        element.label_en !== "Twitter"
      ) {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [])
    .filter(
      (element) =>
        element.label_en !== "Snapchat" &&
        element.label_en !== "Instagram" &&
        element.label_en !== "Twitter"
    );

  useEffect(() => {
    const models = [];
    if (props.searchState.brand_id.length) {
      props.searchState.brand_id.map((id) => {
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
  }, [props.searchState.brand_id, searchInputs.modelOptions]);

  const addValue = (type, value, min, max) => {
    switch (type) {
      case "price":
        let prices = [...props.searchState.price];
        let prices_obj = [...props.searchState.price_obj];
        if (prices.includes(value)) {
          prices.splice(prices.indexOf(value), 1);
          prices_obj.splice(prices_obj.indexOf(value), 1);
        } else {
          let priceData = {
            min,
            max,
          };
          prices_obj.push(priceData);
          prices.push(value);
        }
        props.handleStartSearch("price", prices, prices_obj);
        break;
      case "kilometer":
        let kiloes = [...props.searchState.kilometer];
        let kiloes_obj = [...props.searchState.kilometer_obj];
        if (kiloes.includes(value)) {
          kiloes.splice(kiloes.indexOf(value), 1);
          kiloes_obj.splice(kiloes_obj.indexOf(value), 1);
        } else {
          let killometerData = {
            min,
            max,
          };
          kiloes_obj.push(killometerData);
          kiloes.push(value);
        }
        props.handleStartSearch("kilometer", kiloes, kiloes_obj);
        break;
      case "shape_id":
        let shapes = [...props.searchState.shape_id];
        if (shapes.includes(value)) {
          shapes.splice(shapes.indexOf(value), 1);
        } else {
          shapes.push(value);
        }
        props.handleStartSearch("shape_id", shapes);
        break;
      case "source_id":
        let sources = [...props.searchState.source_id];
        if (sources.includes(value)) {
          sources.splice(sources.indexOf(value), 1);
        } else {
          sources.push(value);
        }
        props.handleStartSearch("source_id", sources);
        break;
      case "city_id":
        let cities = [...props.searchState.city_id];
        if (cities.includes(value)) {
          cities.splice(cities.indexOf(value), 1);
        } else {
          cities.push(value);
        }
        props.handleStartSearch("city_id", cities);
        break;
      case "brand_type_id":
        let brands = [...props.searchState.brand_type_id];
        if (brands.includes(value)) {
          brands.splice(brands.indexOf(value), 1);
        } else {
          brands.push(value);
        }
        props.handleStartSearch("brand_type_id", brands);
        break;
      case "brand_id":
        let marks = [...props.searchState.brand_id];
        if (marks.includes(value)) {
          marks.splice(marks.indexOf(value), 1);
        } else {
          marks.push(value);
        }
        props.handleStartSearch("brand_id", marks);
        break;
      case "years":
        props.handleStartSearch("model_year", {
          model_year_start: value[0],
          model_year_end: value[1],
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchSearchInputs().then((result) => {
      if (result) {
        dispatch(getSearchInputs(result));
      }

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
    });
  }, [dispatch]);

  const handleToggleShow = (elm, item) => {
    let elment = document.querySelector(elm);
    if (elment.classList.contains("show")) {
      elment.classList.remove("show");
      document
        .querySelector('a[href="' + elm + '"]')
        .classList.add("collapsed");
    } else {
      elment.classList.add("show");
      document
        .querySelector('a[href="' + elm + '"]')
        .classList.remove("collapsed");
    }
  };

  const filterValue = (val, filter) => {
    if (isEnglish) {
      return (
        val.label_en &&
        val.label_en.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return (
        val.label && val.label.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };
  const provinceFilterValue = (val, filter) => {
    if (isEnglish) {
      return val.province && val.province.toLowerCase().includes(filter.toLowerCase()); 
    } else {
      return val.province && val.province.toLowerCase().includes(filter.toLowerCase());
    }
  };
  const famousCity = searchInputs.cityOptions.slice(0,4)

  return (
    <div>
      <div className="filter-title">
        <Trans i18nKey="description.Filter" />
        <SearchTagsRemove isEnglish={isEnglish} searchForm={props.searchState} _handleStartSearch={props.handleStartSearch} />
      </div>
      <div className="filter_tags">
      <FilterTags searchInputs={searchInputs} searchForm={props.searchState} _handleStartSearch={props.handleStartSearch}/>
      </div>
      <form
        className="toggle-container"
        onClick={(event) => event.stopPropagation()}
        id="accordion1"
      >
        <button
          className="icon_link close_btn"
          type="button"
          onClick={props.closeFilterMenuHandle}
        >
          <i className="fa fa-times"></i>
        </button>
        <Accordion>
          <div className="filter-accordion" style={{direction: isEnglish ? 'ltr' : 'rtl'}}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{t("search.brand")}</Accordion.Header>
              <Accordion.Body>
                <div className="panel-content">
                  <input
                    type="text"
                    placeholder={t("search.searchBrand")}
                    style={{ marginTop: "0", textAlign:'-webkit-match-parent' }}
                    className="form-control"
                    onChange={(e) => setFilterbrand(e.target.value)}
                  />
                  {searchInputs.marksOptions
                    .filter((v) => filterValue(v, filterbrand))
                    .map((brand, index) => {
                      return (
                        <div className="form-group" key={"brand" + index}>
                          <input
                            style={{ direction: "ltr" }}
                            id={"brand" + index}
                            type="checkbox"
                            name="car_brand2"
                            checked={props.searchState.brand_id.includes(
                              brand.value
                            )}
                            onChange={(v) => addValue("brand_id", brand.value)}
                          />
                          <label className="d-block" htmlFor={"brand" + index}>
                            <span>
                              <img src={brand.image} alt="" />
                            </span>{" "}
                            {localStorage.getItem("lang") === "en"
                              ? brand.label_en
                              : brand.label}{" "}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>{t("search.anyType")}</Accordion.Header>
              <Accordion.Body>
                <div className="panel-content">
                  <input
                    type="text"
                    placeholder={t("search.searchModal")}
                    style={{ marginTop: "0", textAlign:'-webkit-match-parent' }}
                    className="form-control"
                    onChange={(e) => setFilterModal(e.target.value)}
                  />
                  {modelOptions
                    .filter((v) => filterValue(v, filterModal))
                    .map((brand_type, index) => {
                      return (
                        <div className="form-group" key={"brand_type" + index}>
                          <input
                            id={"brand_type" + index}
                            type="checkbox"
                            name="car_modal"
                            checked={props.searchState.brand_type_id.includes(
                              brand_type.value
                            )}
                            onChange={(v) =>
                              addValue("brand_type_id", brand_type.value)
                            }
                          />
                          <label
                            className="d-block"
                            htmlFor={"brand_type" + index}
                          >
                            {localStorage.getItem("lang") === "en"
                              ? brand_type.label_en
                              : brand_type.label}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                {t("search.manufacturingYear")}
              </Accordion.Header>
              <Accordion.Body>
                <div className="panel-content" style={{ height: "90px" }}>
                  <div style={{ marginTop: "20px", padding: "5px" }}>
                    <Range
                      onChange={(value) => addValue("years", value)}
                      // marks={{
                      //   1990: `1990`,
                      //   2022: `2022`,
                      // }}
                      min={1990}
                      max={2023}
                      value={[
                        props.searchState.model_year_start,
                        props.searchState.model_year_end,
                      ]}
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>{t("search.price")}</Accordion.Header>
              <Accordion.Body>
                <div className="panel-content">
                  <div className="form-group">
                    <input
                      id="price1"
                      type="checkbox"
                      name="price"
                      checked={props.searchState.price.includes("[0 TO 70000]")}
                      onChange={() =>
                        addValue("price", "[0 TO 70000]", 0, 70000)
                      }
                    />
                    <label className="d-block" htmlFor="price1">
                      {" "}
                      70,000 {t("search.lessThan")}{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="price2"
                      type="checkbox"
                      name="price"
                      checked={props.searchState.price.includes(
                        "[70000 TO 120000]"
                      )}
                      onChange={() =>
                        addValue("price", "[70000 TO 120000]", 70000, 120000)
                      }
                    />
                    <label className="d-block" htmlFor="price2">
                      {" "}
                      70,000 - 120,000{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="price3"
                      type="checkbox"
                      name="price"
                      checked={props.searchState.price.includes(
                        "[120000 TO 170000]"
                      )}
                      onChange={() =>
                        addValue("price", "[120000 TO 170000]", 120000, 170000)
                      }
                    />
                    <label className="d-block" htmlFor="price3">
                      {" "}
                      120,000 - 170,000{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="price4"
                      type="checkbox"
                      name="price"
                      checked={props.searchState.price.includes(
                        "[170000 TO 200000]"
                      )}
                      onChange={() =>
                        addValue("price", "[170000 TO 200000]", 170000, 200000)
                      }
                    />
                    <label className="d-block" htmlFor="price4">
                      {" "}
                      170,000 - 200,000{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="price5"
                      type="checkbox"
                      name="price"
                      checked={props.searchState.price.includes(
                        "[200000 TO 999999999]"
                      )}
                      onChange={() =>
                        addValue(
                          "price",
                          "[200000 TO 999999999]",
                          200000,
                          999999999
                        )
                      }
                    />
                    <label className="d-block" htmlFor="price5">
                      {" "}
                      200,000 {t("search.moreThan")}{" "}
                    </label>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>{t("search.city")}</Accordion.Header>
              <Accordion.Body>
                <div className="panel-content-province">
                  <input
                    placeholder={t("search.searchForCity")}
                    type="text"
                    style={{  }}
                    className="form-control"
                    onChange={(e) => setFilterCity(e.target.value)}
                  />
                  <Divider style={{ paddingBottom: "10px" }}>
                    {t("search.popularCities")}
                  </Divider>
                  {famousCity
                    .filter((v) => filterValue(v, filterCity))
                    .map((city, index) => {
                      return (
                        <div className="form-group" key={"city" + index} style={{paddingLeft: '10px'}}>
                          <input
                            id={"city" + index}
                            type="checkbox"
                            name="city"
                            checked={props.searchState.city_id.includes(
                              city.value
                            )}
                            onChange={(v) => addValue("city_id", city.value)}
                          />
                            <label
                              className="d-block"
                              style={{ fontSize: "1rem" }}
                              htmlFor={"city" + index}
                            >
                              {localStorage.getItem("lang") === "en"
                                ? city.label_en
                                : city.label}{" "}
                            </label>
                        </div>
                      );
                    })}
                  <Divider style={{ marginBottom: "15px" }} />
                  <div
                      onClick={handleClick(
                        "right-start", 
                        searchInputs.countriesOption
                      )}
                        className={
                          isEnglish
                            ? "form-group-province-en"
                            : "form-group-province-ar"
                        }
                      >
                      <label className="label-province ">
                      {t("search.gulfCountries")}
                      </label>
                        {isEnglish ? (
                          <FontAwesomeIcon icon={faChevronRight} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronLeft} />
                        )}
                      </div>
                  {searchInputs.provincesOption
                  .filter((v) => provinceFilterValue(v, filterCity))
                  .map((province, index) => {
                    if(province.cities.length > 1){
                      return  <div
                      onClick={handleClick(
                                "right-start", 
                                province.cities
                              )}
                        className={
                          isEnglish
                            ? "form-group-province-en"
                            : "form-group-province-ar"
                        }
                        key={"city" + index}
                      >
                      <label className="label-province ">
                        {localStorage.getItem("lang") === "en"
                        ? province.province_en
                        : province.province}{" "}
                      </label>
                        {isEnglish ? (
                          <FontAwesomeIcon icon={faChevronRight} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronLeft} />
                        )}
                      </div>
                  }})}
                  {searchInputs.provincesOption
                  .filter((v) => provinceFilterValue(v, filterCity))
                  .map( (province, index) => {
                      if(province.cities.length === 1 ){
                        return (
                          <div className="form-group" key={"city" + index} style={{paddingLeft: '10px'}}>
                            <input
                              id={"city" + index}
                              type="checkbox"
                              name="city"
                              checked={props.searchState.city_id.includes(
                                province.cities[0].id
                              )}
                              onChange={(v) => addValue("city_id", province.cities[0].id)}
                            />
                              <label
                                className="d-block"
                                style={{ fontSize: "1rem" }}
                                htmlFor={"city" + index}
                              >
                                {localStorage.getItem("lang") === "en"
                                ? province.province_en
                                : province.province}{" "}
                              </label>
                          </div>
                        )}
                    })} 
                  {props.windowwidth > 990 ? (
                    <CityListPopper
                      showWrapperDiv={showWrapperDiv}
                      setShowWrapperDiv={setShowWrapperDiv}
                      open={open}
                      setOpen={setOpen}
                      anchorEl={anchorEl}
                      addValue={addValue}
                      searchState={props.searchState}
                      searchInputs={searchInputs}
                      placement={placement}
                      selectedProvience={selectedProvience}
                      filterValue={filterValue}
                    />
                  ) : (
                    <MobileCityDrawer
                      showWrapperDiv={showWrapperDiv}
                      setShowWrapperDiv={setShowWrapperDiv}
                      open={open}
                      setOpen={setOpen}
                      anchorEl={anchorEl}
                      addValue={addValue}
                      searchState={props.searchState}
                      searchInputs={searchInputs}
                      placement={placement}
                      selectedProvience={selectedProvience}
                      filterValue={filterValue}
                    />
                  )}
                  {/* {searchInputs.cityOptions
                    .filter((v) => filterValue(v, filterCity))
                    .map((city, index) => {
                      return (
                        <div className="form-group" key={"city" + index}>
                          {index === 4 ? <hr /> : ""}
                          <input
                            id={"city" + index}
                            type="checkbox"
                            name="city"
                            checked={props.searchState.city_id.includes(
                              city.value
                            )}
                            onChange={(v) => addValue("city_id", city.value)}
                          />
                          <label className="d-block" htmlFor={"city" + index}>
                            {localStorage.getItem("lang") === "en"
                              ? city.label_en
                              : city.label}{" "}
                          </label>
                        </div>
                      );
                    })} */}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>{t("search.kilosUsed")}</Accordion.Header>
              <Accordion.Body>
                <div className="panel-content">
                  <div className="form-group">
                    <input
                      id="ep1"
                      type="checkbox"
                      name="engine_power"
                      checked={props.searchState.kilometer.includes(
                        "[0 TO 9999]"
                      )}
                      onChange={() =>
                        addValue("kilometer", "[0 TO 9999]", 0, 9999)
                      }
                    />
                    <label className="d-block" htmlFor="ep1">
                      {" "}
                      10,000 {t("search.lessThan")}{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="ep2"
                      type="checkbox"
                      name="engine_power"
                      checked={props.searchState.kilometer.includes(
                        "[10000 TO 50000]"
                      )}
                      onChange={() =>
                        addValue("kilometer", "[10000 TO 50000]", 10000, 50000)
                      }
                    />
                    <label className="d-block" htmlFor="ep2">
                      {" "}
                      10,000 : 50,000{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="ep3"
                      type="checkbox"
                      name="engine_power"
                      checked={props.searchState.kilometer.includes(
                        "[50000 TO 75000]"
                      )}
                      onChange={() =>
                        addValue("kilometer", "[50000 TO 75000]", 50000, 75000)
                      }
                    />
                    <label className="d-block" htmlFor="ep3">
                      {" "}
                      50,000 : 75,000{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="ep4"
                      type="checkbox"
                      name="engine_power"
                      checked={props.searchState.kilometer.includes(
                        "[75000 TO 100000]"
                      )}
                      onChange={() =>
                        addValue(
                          "kilometer",
                          "[75000 TO 100000]",
                          75000,
                          100000
                        )
                      }
                    />
                    <label className="d-block" htmlFor="ep4">
                      {" "}
                      75,000 : 100,000{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="ep5"
                      type="checkbox"
                      name="engine_power"
                      checked={props.searchState.kilometer.includes(
                        "[100000 TO 150000]"
                      )}
                      onChange={() =>
                        addValue(
                          "kilometer",
                          "[100000 TO 150000]",
                          100000,
                          150000
                        )
                      }
                    />
                    <label className="d-block" htmlFor="ep5">
                      {" "}
                      100,000 : 150,000{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="ep6"
                      type="checkbox"
                      name="engine_power"
                      checked={props.searchState.kilometer.includes(
                        "[150000 TO 200000]"
                      )}
                      onChange={() =>
                        addValue(
                          "kilometer",
                          "[150000 TO 200000]",
                          150000,
                          200000
                        )
                      }
                    />
                    <label className="d-block" htmlFor="ep6">
                      {" "}
                      150,000 : 200,000{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      id="ep7"
                      type="checkbox"
                      name="engine_power"
                      checked={props.searchState.kilometer.includes(
                        "[200001 TO 999999999]"
                      )}
                      onChange={() =>
                        addValue(
                          "kilometer",
                          "[200001 TO 999999999]",
                          200001,
                          999999999
                        )
                      }
                    />
                    <label className="d-block" htmlFor="ep7">
                      {" "}
                      200,000 {t("search.moreThan")}{" "}
                    </label>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>{t("search.source")}</Accordion.Header>
              <Accordion.Body>
                <div className="panel-content">
                  <input
                    type="text"
                    placeholder={t("search.searchSource")}
                    style={{ marginTop: "0", textAlign:'-webkit-match-parent' }}
                    className="form-control"
                    onChange={(e) => setFilterSource(e.target.value)}
                  />
                  {sortedSearchSources
                    .filter((v) =>
                      filterValue(v !== "Snap" ? v : "other", filterSource)
                    )
                    .map((source, index) => {
                      return (
                        <div className="form-group" key={"source" + index}>
                          <input
                            id={"source" + index}
                            type="checkbox"
                            name="source"
                            checked={props.searchState.source_id.includes(
                              source.value
                            )}
                            onChange={(v) =>
                              addValue("source_id", source.value)
                            }
                          />
                          <label className="d-block" htmlFor={"source" + index}>
                            <span>
                              <img src={`${source.image}`} alt="" />
                            </span>{" "}
                            {localStorage.getItem("lang") === "en"
                              ? source.label_en
                              : source.label}{" "}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </div>
        </Accordion>
      </form>
    </div>
  );
}
