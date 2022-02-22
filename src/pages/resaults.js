import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import $ from "jquery";
import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../components/filters";
import Cars from "../components/cars";
import Loader from "../components/loader";
import { fetchCars, saveResults } from "../features/search/searchApi";
import { useDispatch, useSelector } from "react-redux";
import { setCars, setQuery, setResultsNumebr, setSearchForm } from "../features/search/searchSlice";
import SaveResults from "../components/saveResultModal";
import { Link } from "react-router-dom";

export default function Resault(props) {
  useEffect(() => {
    $(".alert").hide();
    const params = new URLSearchParams(window.location.search)
    if(params.has('k')){
      let query = params.get('k');
      let newSearchForm = JSON.parse(query);
      console.log(JSON.parse(newSearchForm));
      dispatch(setSearchForm(JSON.parse(newSearchForm)));
    }

  }, [])
  const [state, setState] = useState({
    searchKeyWord: "",
    email: "",
    isOpen: false,
    cars: [],
  });

  const cars = useSelector((state) => state.search.cars);
  const searchForm = useSelector((state) => state.search.searchForm);
  const searchInputs = useSelector((state) => state.search.searchInputs);
  const resultsNumber = useSelector((state) => state.search.numFound);

  const dispatch = useDispatch();

  const _handleSubscripeToNewsletter = () => {
    if(state.email === "") return;
    let data = {email: state.email, type: "newsletter"}

    saveResults(data).then(res => {
      if(res && res.code == 0){
        $(".alert-success").show();
        setState({...state, email:""});
      }else{
        $(".alert-danger").show();
      }
      setTimeout(() => {
        $(".alert").hide();
      }, 3000);
    })
}

  const _handleStartSearch = (type, value) => {
    switch (type) {
      case "keyword":
        dispatch(
          setSearchForm({
            ...searchForm,
            keyword: state.searchKeyWord,
            index: 0,
          })
        );
        break;
      case "price":
        dispatch(setSearchForm({ ...searchForm, price: value, index: 0 }));
        break;
      case "brand_type_id":
        dispatch(
          setSearchForm({ ...searchForm, brand_type_id: value, index: 0 })
        );
        break;
      case "brand_id":
        dispatch(setSearchForm({ ...searchForm, brand_id: value, index: 0 }));
        break;
      case "city_id":
        dispatch(setSearchForm({ ...searchForm, city_id: value, index: 0 }));
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
        dispatch(setSearchForm({ ...searchForm, shape_id: value, index: 0 }));
        break;
      case "kilometer":
        dispatch(setSearchForm({ ...searchForm, kilometer: value, index: 0 }));
        break;
      case "sort":
        dispatch(setSearchForm({ ...searchForm, sort: value, index: 0 }));
        break;
      case "paginate":
        dispatch(setSearchForm({ ...searchForm, index: value }));
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
    if (searchForm.sort && searchForm.sort !== "") {
      query += `&${searchForm.sort}`;
    }
    query += `&rows=12&start=${searchForm.index}`;
    dispatch(setQuery(query));
    console.log(query);
    fetchCars(query).then((res) => {
      $(".load_cont").fadeOut(function () {
        $(this).parent().fadeOut();
        $("body").css({ "overflow-y": "visible" });
      });
      if (res && res.response && res.response.docs) {
        console.log(res.response.docs);
        let carsArray =
          searchForm.index > 0
            ? [...cars, ...res.response.docs]
            : res.response.docs;
        dispatch(setCars(carsArray));
        dispatch(setResultsNumebr(res.response.numFound));
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
    <SaveResults />
      <header>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to="/">
                <img src="./images/logo.png" alt="logo" />
              </Link>
              {/* <form>
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
                  onClick={(e) => {
                    e.preventDefault();
                    _handleStartSearch("keyword", state.searchKeyWord);
                  }}
                  type="button"
                >
                  <i className="fa fa-search"></i> بحث
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-8">
              <div className="search_hint">
                <p>
                  يوجد <span>{resultsNumber}</span> نتيجة بحث عن سيارة معروضة
                  للبيع
                </p>
                <ul className="search_tags">
                  {searchForm.brand_id && searchForm.brand_id.length > 0
                    ? searchInputs.marksOptions.map((mark, index) => {
                        return searchForm.brand_id.includes(mark.value) ? (
                          <li key={"searchMarks" + index}>
                            {mark.label}
                            {/* <button type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                          </button> */}
                          </li>
                        ) : (
                          false
                        );
                      })
                    : ""}
                  {searchForm.brand_type_id &&
                  searchForm.brand_type_id.length > 0
                    ? searchInputs.modelOptions.map((model, index) => {
                        return searchForm.brand_type_id.includes(
                          model.value
                        ) ? (
                          <li key={"searchMarks" + index}>
                            {model.label}
                            {/* <button type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                          </button> */}
                          </li>
                        ) : (
                          false
                        );
                      })
                    : ""}
                  {searchForm.shape_id && searchForm.shape_id.length > 0
                    ? searchInputs.shapes.map((shape, index) => {
                        return searchForm.shape_id.includes(shape.id) ? (
                          <li key={"searchShapes" + index}>
                            {shape.title}
                            {/* <button type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                          </button> */}
                          </li>
                        ) : (
                          false
                        );
                      })
                    : ""}
                    {searchForm.city_id && searchForm.city_id.length > 0
                    ? searchInputs.cityOptions.map((city, index) => {
                        return searchForm.city_id.includes(city.value) ? (
                          <li key={"searchcities" + index}>
                            {city.label}
                          </li>
                        ) : (
                          false
                        );
                      })
                    : ""}
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-4 text-left">
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              تم الإشتراك فى النشرة الإخبارية بنجاح.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              حدث خطأ ما تأكد من البيانات وأعد الإرسال.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
              <form 
                className="subscribe"
              >
                <label> إشترك معنا فى النشرة الأخبارية</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder=" البريد الألكترونى "
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
                <button className="fa fa-search" type="button" onClick={(e) => {e.preventDefault(); _handleSubscripeToNewsletter();}}></button>
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
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        _handleStartSearch("sort", "sort=price+asc")
                      }
                    >
                      {" "}
                      السعر [ الأقل ]{" "}
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        _handleStartSearch("sort", "sort=price+desc")
                      }
                    >
                      {" "}
                      السعر [ الأكثر ]{" "}
                    </div>
                    {/* <div
                      className="dropdown-item"
                      onClick={() =>
                        _handleStartSearch("sort", "sort=gear+desc")
                      }
                    >
                      {" "}
                      قوة المحرك [ الأقل ]{" "}
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        _handleStartSearch("sort", "sort=gear+asc")
                      }
                    >
                      {" "}
                      قوة المحرك [ الأعلى ]{" "}
                    </div> */}
                  </div>
                </div>
              </div>
              <div
                id="scrollableDiv"
                style={{
                  height: 600,
                  overflow: 'auto',
                }}
              >
                <InfiniteScroll
                  dataLength={searchForm.index + 12} //This is important field to render the next data
                  next={() => _handleStartSearch("paginate", searchForm.index + 12)}
                  hasMore={searchForm.index + 12 < resultsNumber}
                  loader={          <img src="./images/loading.gif" alt="loading" />
                }
                  scrollWindow={false}
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <h2>ياي! لقد رأيت كل شيء</h2>
                    </p>
                  }>
                  <Cars cars={cars} />
                </InfiniteScroll>
              </div>
              <div className="w-100 text-left">
                <button className="link green_bc" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">حفظ نتائج البحث</button>
                {/* {resultsNumber > cars.length &&<button
                  className="link"
                  onClick={() =>
                    _handleStartSearch("paginate", searchForm.index + 12)
                  }
                >
                  تحميل المزيد
                </button>} */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="copyrights">جميع الحقوق محفوظة | موقع سيارتى {new Date().getFullYear()}</div>
      <Loader />
    </>
  );
}
