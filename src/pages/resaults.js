import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import $ from "jquery";
import Filters from "../components/filters";
import Cars from "../components/cars";
import Loader from "../components/loader";
import { fetchCars } from "../features/search/searchApi";
import { useDispatch, useSelector } from "react-redux";
import { setCars, setSearchForm } from "../features/search/searchSlice";
export default function Resault() {
  const [state, setState] = useState({
    searchKeyWord: " كيان موديل 2017 كومبى",
    email: "",
    isOpen: false,
    cars: [],
  });

  const cars = useSelector((state) => state.search.cars);
  const searchForm = useSelector((state) => state.search.searchForm);
  const dispatch = useDispatch();
  // const history = useHistory();
  // useEffect(() => {
  //   var savedSearch = localStorage.getItem('savedSearch') || null;
  //   console.log(savedSearch);
  //   if(savedSearch === null){
  //     history.push("/");
  //   }else{
  //     dispatch(setSearchForm(JSON.parse(savedSearch)));
  //   }
  // },[])

  const _handleStartSearch = (type, value) => {
    switch (type) {
      case "keyword":
        dispatch(
          setSearchForm({ ...searchForm, keyword: state.searchKeyWord })
        );
        break;
      case "price":
        dispatch(
          setSearchForm({ ...searchForm, price: value })
        );
        break;
      case "brand_type_id":
        dispatch(setSearchForm({ ...searchForm, brand_type_id: value }));
        break;
      case "brand_id":
        dispatch(setSearchForm({ ...searchForm, brand_id: value }));
        break;
      case "city_id":
        dispatch(setSearchForm({ ...searchForm, city_id: value }));
        break;
      case "model_year":
        dispatch(
          setSearchForm({
            ...searchForm,
            model_year_start: value.model_year_start,
            model_year_end: value.model_year_end,
          })
        );
        break;
      case "shape_id":
        dispatch(setSearchForm({ ...searchForm, shape_id: value }));
        break;
      case "kilometer":
        dispatch(setSearchForm({ ...searchForm, kilometer: value }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    var query = `model_year:[${searchForm.model_year_start} TO ${searchForm.model_year_end}]`;
    if (searchForm.keyword && searchForm.keyword !== "") {
      query += ` AND (brand:"${searchForm.keyword}" OR brand_type:"${searchForm.keyword}")`;
    }
    if (
      searchForm.brand_id &&
      searchForm.brand_id != null &&
      searchForm.brand_id.length > 0
    ) {
      query += ` AND brand_id:(`;
      searchForm.brand_id.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (
      searchForm.brand_type_id &&
      searchForm.brand_type_id != null &&
      searchForm.brand_type_id.length > 0
    ) {
      query += ` AND brand_type_id:(`;
      searchForm.brand_type_id.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (
      searchForm.shape_id &&
      searchForm.shape_id != null &&
      searchForm.shape_id.length > 0
    ) {
      query += ` AND shape_id:(`;
      searchForm.shape_id.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (
      searchForm.city_id &&
      searchForm.city_id != null &&
      searchForm.city_id.length > 0
    ) {
      query += ` AND city_id:(`;
      searchForm.city_id.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (searchForm.kilometer && searchForm.kilometer.length > 0) {
      query += ` AND kilometer:(`;
      searchForm.kilometer.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    if (searchForm.price && searchForm.price.length > 0) {
      query += ` AND price:(`;
      searchForm.price.forEach((id, index) => {
        query += index === 0 ? id : ` OR ${id}`;
      });
      query += ")";
    }
    console.log(query);
    fetchCars(query).then((res) => {
      $(".load_cont").fadeOut(function () {
        $(this).parent().fadeOut();
        $("body").css({ "overflow-y": "visible" });
      });
      if (res.response && res.response.docs) {
        console.log(res.response.docs);
        dispatch(setCars(res.response.docs));
      }
    });
  }, [dispatch, searchForm]);

  const toggleOpen = () => setState({ isOpen: !state.isOpen });

  const fillterBtnClickHandle = () => {
    $(".toggle-container").addClass("move");
  };
  const closeFilterMenuHandle = () => {
    $(".toggle-container").removeClass("move");
  };

  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
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
                  value={state.searchKeyWord}
                  onChange={(e) =>
                    setState({ ...state, searchKeyWord: e.target.value })
                  }
                />
                <button
                  className="link"
                  onClick={() =>
                    _handleStartSearch("keyword", state.searchKeyWord)
                  }
                >
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
                  يوجد <span>{cars.length}</span> نتيجة بحث عن سيارة معروضة
                  للبيع
                </p>
                <ul className="search_tags">
                  {
                    <li>
                      نيسان
                      <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </li>
                  }
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
                  value={state.email}
                  onChange={(e) =>setState({...state, email: e.target.value})}
                />
                <button className="fa fa-search"></button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <Filters
                closeFilterMenuHandle={closeFilterMenuHandle}
                handleStartSearch={(type, value) =>
                  _handleStartSearch(type, value)
                }
                searchState={searchForm}
              />
            </div>
            <div className="col-lg-9">
              <div className="search_hint">
                <button
                  className="filter_btn link"
                  onClick={fillterBtnClickHandle}
                >
                  <i className="fas fa-sliders-h"></i>
                  فلتر البحث
                </button>
                <div className="dropdown" onClick={toggleOpen}>
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
                    {/* <div className="dropdown-item">
                        {" "}
                        قوة المحرك [ الأقل ]{" "}
                      </div>
                      <div className="dropdown-item">
                        {" "}
                        قوة المحرك [ الأعلى ]{" "}
                      </div> */}
                  </div>
                </div>
              </div>
              <Cars cars={cars} />
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
