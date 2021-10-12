import React, { Component } from "react";
import $ from "jquery";
import { getCars } from "../actions/carsActions";
import Filters from "../components/filters";
import Cars from "../components/cars";
import Loader from "../components/loader";
export default class Resault extends Component {
  componentDidMount() {
    $(".load_cont").fadeOut(function () {
      $(this).parent().fadeOut();
      $("body").css({ "overflow-y": "visible" });
    });

    this.setState({
      ...this.state,
      cars: getCars(),
    });
  }

  state = {
    searchKeyWord: " كيان موديل 2017 كومبى",
    email: "",
    isOpen: false,
    cars: [],
  };
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  fillterBtnClickHandle = () => {
    $(".toggle-container").addClass("move");
  };
  closeFilterMenuHandle = () => {
    $(".toggle-container").removeClass("move");
  };



  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <>
        <header>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img src="./images/logo.png" alt="logo" />
                <form>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="إبحث من هنا "
                    value={this.state.searchKeyWord}
                  />
                  <button className="link">
                    {/* <FontAwesomeIcon icon={search} /> */}
                    <i className="fa fa-search"></i> بحث
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="search_hint">
                  <p>
                    يوجد <span>14 </span> نتيجة بحث عن سيارة معروضة للبيع
                  </p>
                  <ul className="search_tags">
                    <li>
                      نيسان
                      <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </li>
                    <li>
                      تويتا
                      <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </li>
                    <li>
                      كومبى
                      <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-5 text-left">
                <form className="subscribe">
                  <label> إشترك معنا فى النشرة الأخبارية</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder=" البريد الألكترونى "
                    value={this.state.email}
                  />
                  <button className="fa fa-search"></button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <Filters closeFilterMenuHandle={this.closeFilterMenuHandle} />
              </div>
              <div className="col-lg-9">
                <div className="search_hint">
                  <button
                    className="filter_btn link"
                    onClick={this.fillterBtnClickHandle}
                  >
                    <i className="fas fa-sliders-h"></i>
                    فلتر البحث
                  </button>
                  <div className="dropdown" onClick={this.toggleOpen}>
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-sort-amount-desc"></i>
                      <span> ترتيب حسب </span>
                    </button>
                    <div
                      className={menuClass}
                      aria-labelledby="dropdownMenuButton"
                      x-placement="bottom-start"
                      style={{
                        position: "absolute",
                        transform: "translate3d(0px, 33px, 0px)",
                        top: "0px",
                        left: "0px",
                        willChange: "transform",
                      }}
                    >
                      <div className="dropdown-item"> السعر [ الأقل ] </div>
                      <div className="dropdown-item"> السعر [ الأكثر ] </div>
                      <div className="dropdown-item">
                        {" "}
                        قوة المحرك [ الأقل ]{" "}
                      </div>
                      <div className="dropdown-item">
                        {" "}
                        قوة المحرك [ الأعلى ]{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <Cars cars={this.state.cars} />
                <div className="w-100 text-left">
                  <button className="link green_bc">حفظ نتائج البحث</button>
                  <button className="link">تحميل المزيد</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="copyrights">جميع الحقوق محفوظة | موقع سيارتى 2021</div>
        <Loader />
      </>
    );
  }
}
