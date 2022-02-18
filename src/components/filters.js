import { Range } from "rc-slider";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchInputs } from "../features/search/searchApi";
import { getSearchInputs } from "../features/search/searchSlice";

export default function Filters(props) {
  const searchInputs = useSelector((state) => state.search.searchInputs);
  const [modelOptions, setModelOptions] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    const models = []
    if (props.searchState.brand_id.length) {
      props.searchState.brand_id.map((id) => {
        return searchInputs.modelOptions.map((model) => {
          if (model.brandId === id) {
            models.push(model)
          }
        })
      })
    } else {
      searchInputs.modelOptions.map((model) => models.push(model))
    }
    setModelOptions(models)
  }, [props.searchState.brand_id, searchInputs.modelOptions])

  const addValue = (type, value) => {
    switch (type) {
      case "price":
        let prices = [...props.searchState.price];
        if (prices.includes(value)) {
          prices.splice(prices.indexOf(value), 1);
        } else {
          prices.push(value);
        }
        props.handleStartSearch("price", prices);
        break;
      case "kilometer":
        let kiloes = [...props.searchState.kilometer];
        if (kiloes.includes(value)) {
          kiloes.splice(kiloes.indexOf(value), 1);
        } else {
          kiloes.push(value);
        }
        props.handleStartSearch("kilometer", kiloes);
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
      $(".load_cont").fadeOut(function () {
        $(this).parent().fadeOut();
        $("body").css({ "overflow-y": "visible" });
      });
      if (result) {
        dispatch(getSearchInputs(result));
      }
    });
  }, [dispatch]);

  const handleToggleShow = (elm, item) => {
    if ($(elm).hasClass("show")) {
      $(elm).removeClass("show");
      $('a[href="' + elm + '"]').addClass("collapsed");
    } else {
      $(elm).addClass("show");
      $('a[href="' + elm + '"]').removeClass("collapsed");
    }
  };

  return (
    <form className="toggle-container" id="accordion1">
      <button
        className="icon_link close_btn"
        type="button"
        onClick={props.closeFilterMenuHandle}
      >
        <i className="fa fa-times"></i>
      </button>

      {/* <div className="panel">
          <h4 className="panel-title">
            <a
              href="#toggle1"
              data-toggle="collapse"
              onClick={() => handleToggleShow("#toggle1", this)}
            >
              قوة المحرك [ سى سى ]
            </a>
          </h4>
          <div className="panel-collapse collapse in show" id="toggle1">
            <div className="panel-content">
              <div className="form-group">
                <input id="ep1" type="checkbox" name="engine_power" />
                <label className="d-block" htmlFor="ep1">
                  {" "}
                  أقل من 800{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep2" type="checkbox" name="engine_power" />
                <label className="d-block" htmlFor="ep2">
                  {" "}
                  1000 : 1300{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep3" type="checkbox" name="engine_power" />
                <label className="d-block" htmlFor="ep3">
                  {" "}
                  1400 : 1600{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep4" type="checkbox" name="engine_power" />
                <label className="d-block" htmlFor="ep4">
                  {" "}
                  1600 : 2000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep5" type="checkbox" name="engine_power" />
                <label className="d-block" htmlFor="ep5">
                  {" "}
                  2000 : 2500{" "}
                </label>
              </div>
  
              <div className="form-group">
                <input id="ep6" type="checkbox" name="engine_power" />
                <label className="d-block" htmlFor="ep6">
                  {" "}
                  2500 : 3000{" "}
                </label>
              </div>
  
              <div className="form-group">
                <input id="ep7" type="checkbox" name="engine_power" />
                <label className="d-block" htmlFor="ep7">
                  {" "}
                  أكثر من 3000{" "}
                </label>
              </div>
            </div>
          </div>
        </div> */}
      {/* <!--End Panel--> */}
      {/* <div className="panel">
          <h4 className="panel-title">
            <a
              href="#toggle2"
              data-toggle="collapse"
              aria-expanded="true"
              className=""
              onClick={() => handleToggleShow("#toggle2", this)}
            >
              ناقل الحركة
            </a>
          </h4>
          <div className="panel-collapse in collapse show" id="toggle2">
            <div className="panel-content">
              <div className="form-group">
                <input id="mv1" type="checkbox" name="motion_vector" />
                <label className="d-block" htmlFor="mv1">
                  {" "}
                  يدوي{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="mv2" type="checkbox" name="motion_vector" />
                <label className="d-block" htmlFor="mv2">
                  {" "}
                  أتوماتيك{" "}
                </label>
              </div>
            </div>
          </div>
        </div> */}
      {/* <!--End Panel--> */}
      <div className="panel">
        <h4 className="panel-title">
          <a
            href="#toggle8"
            data-toggle="collapse"
            className="collapsed"
            onClick={() => handleToggleShow("#toggle8", this)}
          >
            الماركة
          </a>
        </h4>
        {/* <!--End panel-title--> */}
        <div className="panel-collapse collapse" id="toggle8">
          <div className="panel-content">
            {searchInputs.marksOptions.map((brand, index) => {
              return (
                <div className="form-group" key={"brand" + index}>
                  <input
                    id={"brand" + index}
                    type="checkbox"
                    name="car_brand2"
                    checked={props.searchState.brand_id.includes(brand.value)}
                    onChange={(v) => addValue("brand_id", brand.value)}
                  />
                  <label className="d-block" htmlFor={"brand" + index}>
                    {" "}
                    {brand.label}{" "}
                  </label>
                </div>
              );
            })}
          </div>
          {/* <!--End Panel Content--> */}
        </div>
        {/* <!--End Panel Collapse--> */}
      </div>
      {/* <!--End Panel--> */}
        <div className="panel">
          <h4 className="panel-title">
            <a
              href="#toggle7"
              data-toggle="collapse"
              className="collapsed"
              onClick={() => handleToggleShow("#toggle7", this)}
            >
              المودل
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse" id="toggle7">
            <div className="panel-content">
              {modelOptions.map((brand_type, index) => {
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
                    <label className="d-block" htmlFor={"brand_type" + index}>
                      {" "}
                      {brand_type.label}{" "}
                    </label>
                  </div>
                );
              })}
            </div>
            {/* <!--End Panel Content--> */}
          </div>
          {/* <!--End Panel Collapse--> */}
        </div>
      {/* <!--End Panel--> */}

      <div className="panel">
        <h4 className="panel-title">
          <a
            href="#toggle9"
            data-toggle="collapse"
            className="collapsed"
            onClick={() => handleToggleShow("#toggle9", this)}
          >
            سنة الصنع
          </a>
        </h4>
        {/* <!--End panel-title--> */}
        <div className="panel-collapse collapse" id="toggle9">
          <div className="panel-content" style={{ height: "90px" }}>
            <Range
              onAfterChange={(value) => addValue("years", value)}
              marks={{
                1990: `1990`,
                2021: `2021`,
              }}
              min={1990}
              max={new Date().getFullYear()}
              defaultValue={[
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
                  background: "red",
                  color: "#555555",
                  width: "9px",
                  borderRadius: "3px",
                  border: 0,
                  cursor: "pointer",
                  height: "20px",
                  bottom: "-7px",
                },
                {
                  background: "red",
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
            {/* <div className="year_slider" name="slider"></div> */}
          </div>
          {/* <!--End Panel Content--> */}
        </div>
        {/* <!--End Panel Collapse--> */}
      </div>
      {/* <!--End Panel--> */}

      <div className="panel">
        <h4 className="panel-title">
          <a
            href="#toggle5"
            data-toggle="collapse"
            className="collapsed"
            onClick={() => handleToggleShow("#toggle5", this)}
          >
            السعر [ ريال سعودى ]
          </a>
        </h4>
        {/* <!--End panel-title--> */}
        <div className="panel-collapse collapse" id="toggle5">
          <div className="panel-content">
            <div className="form-group">
              <input
                id="price1"
                type="checkbox"
                name="price"
                checked={props.searchState.price.includes("[0 TO 70000]")}
                onChange={() => addValue("price", "[0 TO 70000]")}
              />
              <label className="d-block" htmlFor="price1">
                {" "}
                أقل من 70,000{" "}
              </label>
            </div>
            <div className="form-group">
              <input
                id="price2"
                type="checkbox"
                name="price"
                checked={props.searchState.price.includes("[70000 TO 120000]")}
                onChange={() => addValue("price", "[70000 TO 120000]")}
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
                checked={props.searchState.price.includes("[120000 TO 170000]")}
                onChange={() => addValue("price", "[120000 TO 170000]")}
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
                checked={props.searchState.price.includes("[170000 TO 200000]")}
                onChange={() => addValue("price", "[170000 TO 200000]")}
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
                onChange={() => addValue("price", "[200000 TO 999999999]")}
              />
              <label className="d-block" htmlFor="price5">
                {" "}
                أكثر من 200,000{" "}
              </label>
            </div>
          </div>
          {/* <!--End Panel Content--> */}
        </div>
        {/* <!--End Panel Collapse--> */}
      </div>
      {/* <!--End Panel--> */}
      <div className="panel">
        <h4 className="panel-title">
          <a
            href="#toggle6"
            data-toggle="collapse"
            className="collapsed"
            onClick={() => handleToggleShow("#toggle6", this)}
          >
            المدينة
          </a>
        </h4>
        {/* <!--End panel-title--> */}
        <div className="panel-collapse collapse" id="toggle6">
          <div className="panel-content">
            {searchInputs.cityOptions.map((city, index) => {
              return (
                <div className="form-group" key={"city" + index}>
                  <input
                    id={"city" + index}
                    type="checkbox"
                    name="city"
                    checked={props.searchState.city_id.includes(city.value)}
                    onChange={(v) => addValue("city_id", city.value)}
                  />
                  <label className="d-block" htmlFor={"city" + index}>
                    {" "}
                    {city.label}{" "}
                  </label>
                </div>
              );
            })}
          </div>
          {/* <!--End Panel Content--> */}
        </div>
        {/* <!--End Panel Collapse--> */}
      </div>
      {/* <!--End Panel--> */}
      <div className="panel">
        <h4 className="panel-title">
          <a
            href="#toggle3"
            data-toggle="collapse"
            onClick={() => handleToggleShow("#toggle3", this)}
          >
            عدد الكيلوهات المستعملة
          </a>
        </h4>
        {/* <!--End panel-title--> */}
        <div className="panel-collapse collapse in show" id="toggle3">
          <div className="panel-content">
            <div className="form-group">
              <input
                id="ep1"
                type="checkbox"
                name="engine_power"
                checked={props.searchState.kilometer.includes("[0 TO 9999]")}
                onChange={() => addValue("kilometer", "[0 TO 9999]")}
              />
              <label className="d-block" htmlFor="ep1">
                {" "}
                أقل من 10,000{" "}
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
                onChange={() => addValue("kilometer", "[10000 TO 50000]")}
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
                onChange={() => addValue("kilometer", "[50000 TO 75000]")}
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
                onChange={() => addValue("kilometer", "[75000 TO 100000]")}
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
                onChange={() => addValue("kilometer", "[100000 TO 150000]")}
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
                onChange={() => addValue("kilometer", "[150000 TO 200000]")}
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
                onChange={() => addValue("kilometer", "[200001 TO 999999999]")}
              />
              <label className="d-block" htmlFor="ep7">
                {" "}
                أكثر من 200,000{" "}
              </label>
            </div>
          </div>
          {/* <!--End Panel Content--> */}
        </div>
      </div>
      {/* <!--End Panel--> */}
      {/* <div className="panel">
        <h4 className="panel-title">
          <a
            href="#toggle4"
            data-toggle="collapse"
            className="collapsed"
            onClick={() => handleToggleShow("#toggle4", this)}
          >
            هيكل السيارة
          </a>
        </h4>
         <!--End panel-title--> 
        <div className="panel-collapse collapse" id="toggle4">
          <div className="panel-content">
            {searchInputs.shapes.map((shape, i) => {
              return (
                <div className="form-group" key={shape.id}>
                  <input
                    id={shape.id}
                    type="checkbox"
                    name="car_body"
                    checked={props.searchState.shape_id.includes(shape.id)}
                    onChange={(v) => addValue("shape_id", shape.id)}
                  />
                  <label className="d-block" htmlFor={shape.id}>
                    <img src={shape.image} alt={shape.title} />
                    {shape.title}
                  </label>
                </div>
              );
            })}
          </div>
           <!--End Panel Content--> 
        </div>
         <!--End Panel Collapse--> 
      </div>
       <!--End Panel-->  */}
    
    </form>
  );
}
