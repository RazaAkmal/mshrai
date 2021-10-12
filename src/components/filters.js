import { Range } from "rc-slider";
import React, { Component } from 'react'
import $ from "jquery";

export default class Filters extends Component {

    handleToggleShow = (elm, item) => {
        if ($(elm).hasClass("show")) {
          $(elm).removeClass("show");
          $('a[href="' + elm + '"]').addClass("collapsed");
        } else {
          $(elm).addClass("show");
          $('a[href="' + elm + '"]').removeClass("collapsed");
        }
      };

render(){
    return (
      <form className="toggle-container" id="accordion1">
        <button
          className="icon_link close_btn"
          type="button"
          onClick={this.props.closeFilterMenuHandle}
        >
          <i className="fa fa-times"></i>
        </button>
  
        <div className="panel">
          <h4 className="panel-title">
            <a
              href="#toggle1"
              data-toggle="collapse"
              onClick={() => this.handleToggleShow("#toggle1", this)}
            >
              قوة المحرك [ سى سى ]
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse in show" id="toggle1">
            <div className="panel-content">
              <div className="form-group">
                <input id="ep1" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep1">
                  {" "}
                  أقل من 800{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep2" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep2">
                  {" "}
                  1000 : 1300{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep3" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep3">
                  {" "}
                  1400 : 1600{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep4" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep4">
                  {" "}
                  1600 : 2000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep5" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep5">
                  {" "}
                  2000 : 2500{" "}
                </label>
              </div>
  
              <div className="form-group">
                <input id="ep6" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep6">
                  {" "}
                  2500 : 3000{" "}
                </label>
              </div>
  
              <div className="form-group">
                <input id="ep7" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep7">
                  {" "}
                  أكثر من 3000{" "}
                </label>
              </div>
            </div>
            {/* <!--End Panel Content--> */}
          </div>
        </div>
        {/* <!--End Panel--> */}
        <div className="panel">
          <h4 className="panel-title">
            <a
              href="#toggle2"
              data-toggle="collapse"
              aria-expanded="true"
              className=""
              onClick={() => this.handleToggleShow("#toggle2", this)}
            >
              ناقل الحركة
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse in collapse show" id="toggle2">
            <div className="panel-content">
              <div className="form-group">
                <input id="mv1" type="checkbox" name="motion_vector" />
                <label className="d-block" for="mv1">
                  {" "}
                  يدوي{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="mv2" type="checkbox" name="motion_vector" />
                <label className="d-block" for="mv2">
                  {" "}
                  أتوماتيك{" "}
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
              href="#toggle3"
              data-toggle="collapse"
              onClick={() => this.handleToggleShow("#toggle3", this)}
            >
              عدد الكيلوهات المستعملة
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse in show" id="toggle3">
            <div className="panel-content">
              <div className="form-group">
                <input id="ep1" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep1">
                  {" "}
                  أقل من 10,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep2" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep2">
                  {" "}
                  11,000 : 50,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep3" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep3">
                  {" "}
                  51,000 : 75,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep4" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep4">
                  {" "}
                  76,000 : 100,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep5" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep5">
                  {" "}
                  100,000 : 150,000{" "}
                </label>
              </div>
  
              <div className="form-group">
                <input id="ep6" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep6">
                  {" "}
                  155,000 : 200,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="ep7" type="checkbox" name="engine_power" />
                <label className="d-block" for="ep7">
                  {" "}
                  أكثر من 200,000{" "}
                </label>
              </div>
            </div>
            {/* <!--End Panel Content--> */}
          </div>
        </div>
        {/* <!--End Panel--> */}
        <div className="panel">
          <h4 className="panel-title">
            <a
              href="#toggle4"
              data-toggle="collapse"
              className="collapsed"
              onClick={() => this.handleToggleShow("#toggle4", this)}
            >
              هيكل السيارة
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse" id="toggle4">
            <div className="panel-content">
              <div className="form-group">
                <input id="car_body1" type="checkbox" name="car_body" />
                <label className="d-block" for="car_body1">
                  <img src="../images/body_type/1.png" alt="" />
                  ليموزين
                </label>
              </div>
              <div className="form-group">
                <input id="car_body2" type="checkbox" name="car_body" />
                <label className="d-block" for="car_body2">
                  <img src="../images/body_type/2.png" alt="" />
                  دفع رباعى
                </label>
              </div>
              <div className="form-group">
                <input id="car_body3" type="checkbox" name="car_body" />
                <label className="d-block" for="car_body3">
                  <img src="../images/body_type/3.png" alt="" />
                  كومبى
                </label>
              </div>
              <div className="form-group">
                <input id="car_body4" type="checkbox" name="car_body" />
                <label className="d-block" for="car_body4">
                  <img src="../images/body_type/4.png" alt="" />
                  كابريو
                </label>
              </div>
              <div className="form-group">
                <input id="car_body5" type="checkbox" name="car_body" />
                <label className="d-block" for="car_body5">
                  <img src="../images/body_type/5.png" alt="" />
                  كلاينفاغن
                </label>
              </div>
              <div className="form-group">
                <input id="car_body6" type="checkbox" name="car_body" />
                <label className="d-block" for="car_body6">
                  <img src="../images/body_type/6.png" alt="" />
                  كومباكت
                </label>
              </div>
              <div className="form-group">
                <input id="car_body7" type="checkbox" name="car_body" />
                <label className="d-block" for="car_body7">
                  <img src="../images/body_type/7.png" alt="" />
                  فان
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
              href="#toggle5"
              data-toggle="collapse"
              className="collapsed"
              onClick={() => this.handleToggleShow("#toggle5", this)}
            >
              السعر [ ريال سعودى ]
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse" id="toggle5">
            <div className="panel-content">
              <div className="form-group">
                <input id="price1" type="checkbox" name="price" />
                <label className="d-block" for="price1">
                  {" "}
                  أقل من 70,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="price2" type="checkbox" name="price" />
                <label className="d-block" for="price2">
                  {" "}
                  70,000 - 120,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="price3" type="checkbox" name="price" />
                <label className="d-block" for="price3">
                  {" "}
                  120,000 - 170,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="price4" type="checkbox" name="price" />
                <label className="d-block" for="price4">
                  {" "}
                  170,000 - 200,000{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="price5" type="checkbox" name="price" />
                <label className="d-block" for="price5">
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
              onClick={() => this.handleToggleShow("#toggle6", this)}
            >
              المدينة
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse" id="toggle6">
            <div className="panel-content">
              <div className="form-group">
                <input id="city1" type="checkbox" name="city" />
                <label className="d-block" for="city1">
                  {" "}
                  مكة المكرمة{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="city2" type="checkbox" name="city" />
                <label className="d-block" for="city2">
                  {" "}
                  المدينة المنورة{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="city3" type="checkbox" name="city" />
                <label className="d-block" for="city3">
                  {" "}
                  الرياض{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="city4" type="checkbox" name="city" />
                <label className="d-block" for="city4">
                  {" "}
                  الدمام{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="city5" type="checkbox" name="city" />
                <label className="d-block" for="city5">
                  {" "}
                  الحائل{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="city6" type="checkbox" name="city" />
                <label className="d-block" for="city6">
                  {" "}
                  دبى{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="city7" type="checkbox" name="city" />
                <label className="d-block" for="city7">
                  {" "}
                  أبوظبى{" "}
                </label>
              </div>
  
              <div className="form-group">
                <input id="city7" type="checkbox" name="city" />
                <label className="d-block" for="city7">
                  {" "}
                  الشارقة{" "}
                </label>
              </div>
  
              <div className="form-group">
                <input id="city7" type="checkbox" name="city" />
                <label className="d-block" for="city7">
                  {" "}
                  العين{" "}
                </label>
              </div>
  
              <div className="form-group">
                <input id="city7" type="checkbox" name="city" />
                <label className="d-block" for="city7">
                  {" "}
                  الشارقة
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
              href="#toggle7"
              data-toggle="collapse"
              className="collapsed"
              onClick={() => this.handleToggleShow("#toggle7", this)}
            >
              المودل
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse" id="toggle7">
            <div className="panel-content">
              <div className="form-group">
                <input id="car_modal1" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal1">
                  {" "}
                  كورلا{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal2" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal2">
                  {" "}
                  جى تى{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal3" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal3">
                  {" "}
                  أريستو{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal4" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal4">
                  {" "}
                  أفالون{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal5" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal5">
                  {" "}
                  ألفارد{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal6" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal6">
                  {" "}
                  أليكس{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal7" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal7">
                  {" "}
                  إيجو{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal8" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal8">
                  {" "}
                  آي سى تى{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal9" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal9">
                  {" "}
                  باصو{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal10" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal10">
                  {" "}
                  بروجرس
                </label>
              </div>
              <div className="form-group">
                <input id="car_modal11" type="checkbox" name="car_modal" />
                <label className="d-block" for="car_modal11">
                  {" "}
                  كروان{" "}
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
              href="#toggle8"
              data-toggle="collapse"
              className="collapsed"
              onClick={() => this.handleToggleShow("#toggle8", this)}
            >
              الماركة
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse" id="toggle8">
            <div className="panel-content">
              <div className="form-group">
                <input id="car_brand1" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand1">
                  {" "}
                  تويوتا{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand2" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand2">
                  {" "}
                  فورد{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand3" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand3">
                  {" "}
                  شيفروليه{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand4" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand4">
                  {" "}
                  نيسان{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand5" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand5">
                  {" "}
                  هيونداى{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand6" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand6">
                  {" "}
                  جنسس{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand7" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand7">
                  {" "}
                  جى ام سى{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand8" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand8">
                  {" "}
                  مرسيدس{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand9" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand9">
                  {" "}
                  هوندا{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand10" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand10">
                  {" "}
                  كيا{" "}
                </label>
              </div>
              <div className="form-group">
                <input id="car_brand11" type="checkbox" name="car_brand" />
                <label className="d-block" for="car_brand11">
                  {" "}
                  بى ام دبليو{" "}
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
              href="#toggle9"
              data-toggle="collapse"
              className="collapsed"
              onClick={() => this.handleToggleShow("#toggle9", this)}
            >
              سنة الصنع
            </a>
          </h4>
          {/* <!--End panel-title--> */}
          <div className="panel-collapse collapse" id="toggle9">
            <div className="panel-content" style={{ height: "90px" }}>
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
      </form>
    );
}
}
