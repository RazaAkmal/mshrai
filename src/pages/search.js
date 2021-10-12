import React, { Component } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import Select from "react-select";
import { colourStyles } from "../constants";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default class Search extends Component {
  componentDidMount() {
    $(".load_cont").fadeOut(function () {
      $(this).parent().fadeOut();
      $("body").css({ "overflow-y": "visible" });
    });
  }

  state = {
    brandOptions: [
      { value: "تويوتا", label: "تويوتا" },
      { value: "فورد", label: "فورد" },
      { value: "شيفروليه", label: "شيفروليه" },
    ],
    modelOptions: [
      { value: "كورلا", label: "كورلا" },
      { value: "جى تى", label: "جى تى" },
      { value: "أريستو", label: "أريستو" },
    ],
    cityOptions: [
      { value: "جدة", label: "جدة" },
      { value: "مكة المكرمة", label: "مكة المكرمة" },
      { value: "الدمام", label: "الدمام" },
    ],
  };

  render() {
    return (
      <>
        <div className="main_screen img_bc">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="cont">
                  <img src="../images/logo.png" alt="" className="logo" />
                  <h1>أفضل منصة لتحصل على أفضل السيارات المستعملة</h1>
                  <form className="search_form">
                    <div className="row">
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=" ماذاالذى  تبحث عنه ..."
                        />
                      </div>
                      <div className="col-md-6  mb-3">
                        <label className="text-end d-block"> الماركة </label>
                        <Select
                          defaultValue={[]}
                          isMulti
                          name="brand"
                          options={this.state.brandOptions}
                          className="basic-multi-select"
                          placeholder=""
                          styles={colourStyles}
                          // classNamePrefix="select"
                        />
                      </div>
                      <div className="col-md-6  mb-3">
                        <label className="text-end d-block"> المودل </label>
                        <Select
                          defaultValue={[]}
                          isMulti
                          name="brand"
                          options={this.state.modelOptions}
                          className="basic-multi-select"
                          placeholder=""
                          styles={colourStyles}
                          // classNamePrefix="select"
                        />
                      </div>

                      <div className="col-md-6  mb-3">
                        <label className="text-end d-block"> المدينة </label>
                        <Select
                          defaultValue={[]}
                          isMulti
                          name="brand"
                          options={this.state.cityOptions}
                          className="basic-multi-select"
                          placeholder=""
                          styles={colourStyles}
                          // classNamePrefix="select"
                        />
                      </div>
                      <div className="col-md-6  mb-3">
                        <label className="text-end d-block">سنة الصنع</label>
                        <div className="mt-3">
                        <Range
                          marks={{
                            1990: `1990`,
                            2021: `2021`,
                          }}
                          min={1990}
                          max={2021}
                          defaultValue={[1995, 2010]}
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
                          dotStyle={{display: "none"}}
                          activeDotStyle={{}}
                          trackStyle={[{
                            height: "100%",
                            background: "#dfdfdf",
                            borderRadius: 0,
                          }]}
                          handleStyle={[{
                            background: "red",
                            color: "#555555",
                            width: "9px",
                            borderRadius: "3px",
                            border: 0,
                            cursor: "pointer",
                            height: "20px",
                            bottom: "-7px",
                          },{
                            background: "red",
                            color: "#555555",
                            width: "9px",
                            borderRadius: "3px",
                            border: 0,
                            cursor: "pointer",
                            height: "20px",
                            bottom: "-7px",
                          }]}
                        />
                        </div>
                        {/* <div className="year_slider" name="slider"></div> */}
                      </div>

                      <div className="col-12 flex_col  mb-3">
                        <div className="checkbox">
                          <input type="checkbox" name="car_body" id="t1" />
                          <label htmlFor="t1">
                            <span>
                              <img src="../images/body_type/1.png" alt="" />
                              ليموزين
                            </span>
                          </label>
                        </div>
                        {/* <!--End Checkbox--> */}

                        <div className="checkbox">
                          <input type="checkbox" name="car_body" id="t2" />
                          <label htmlFor="t2">
                            <span>
                              <img src="../images/body_type/2.png" alt="" />
                              دفع رباعى
                            </span>
                          </label>
                        </div>
                        {/* <!--End Checkbox--> */}

                        <div className="checkbox">
                          <input type="checkbox" name="car_body" id="t3" />
                          <label htmlFor="t3">
                            <span>
                              <img src="../images/body_type/3.png" alt="" />
                              كومبى
                            </span>
                          </label>
                        </div>
                        {/* <!--End Checkbox--> */}

                        <div className="checkbox">
                          <input type="checkbox" name="car_body" id="t4" />
                          <label htmlFor="t4">
                            <span>
                              <img src="../images/body_type/4.png" alt="" />
                              كابريو
                            </span>
                          </label>
                        </div>
                        {/* <!--End Checkbox--> */}

                        <div className="checkbox">
                          <input type="checkbox" name="car_body" id="t5" />
                          <label htmlFor="t5">
                            <span>
                              <img src="../images/body_type/5.png" alt="" />
                              كلاينفاغن
                            </span>
                          </label>
                        </div>
                        {/* <!--End Checkbox--> */}

                        <div className="checkbox">
                          <input type="checkbox" name="car_body" id="t6" />
                          <label htmlFor="t6">
                            <span>
                              <img src="../images/body_type/6.png" alt="" />
                              كومباكت
                            </span>
                          </label>
                        </div>
                        {/* <!--End Checkbox--> */}

                        <div className="checkbox">
                          <input type="checkbox" name="car_body" id="t7" />
                          <label htmlFor="t7">
                            <span>
                              <img src="../images/body_type/7.png" alt="" />
                              فان
                            </span>
                          </label>
                        </div>
                        {/* <!--End Checkbox--> */}
                      </div>
                      {/* <!--End Col-12--> */}
                    </div>
                    {/* <!--End Row--> */}

                    <button type="button" className="search-button">
                      <Link to="/resaults">
                        <i className="fa fa-search"></i> عرض النتائج
                      </Link>
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
            <img src="../images/loading.gif" alt="loading" />
          </div>
        </div>
      </>
    );
  }
}
