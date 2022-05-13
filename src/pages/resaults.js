import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import $ from "jquery";
import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../components/filters";
import Cars from "../components/cars";
import Loader from "../components/loader";
import { fetchCars, saveResults } from "../features/search/searchApi";
import { useDispatch, useSelector } from "react-redux";
import { setCars, setQuery, setResultsNumebr, setSearchForm, setSearchFormToInital } from "../features/search/searchSlice";
import SaveResults from "../components/saveResultModal";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
  const [loading, setLoading] = useState(false)
  const cars = useSelector((state) => state.search.cars);
  const searchForm = useSelector((state) => state.search.searchForm);
  const searchInputs = useSelector((state) => state.search.searchInputs);
  const resultsNumber = useSelector((state) => state.search.numFound);
  const query = useSelector((state) => state.search.query);

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
      case "clearall":
        dispatch(setSearchFormToInital())
        break;
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
      case "source_id":
        dispatch(setSearchForm({ ...searchForm, source_id: value, index: 0 }));
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

  const _handleSaveResults = () => {
    if (state.email === "") return;
    let key = JSON.stringify(searchForm);
    let q = JSON.stringify(query);
    let data = {
      email: state.email,
      keys: key,
      search: q,
      type: "saveResults",
      response: resultsNumber,
    };

    saveResults(data).then((res) => {
      toast.success(res.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    });
  };

  useEffect(() => {
    setLoading(true)
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
    if (
      searchForm.source_id &&
      searchForm.source_id != null &&
      searchForm.source_id.length > 0
    ) {
      query += ` AND source_id:(`;
      searchForm.source_id.forEach((id, index) => {
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
    query += `&rows=12&start=${searchForm.index}&fl=date,city,source,gear_id,gear,_version_,sid,city_id,id,source_id,brand,brand_type,brand_type_id,shape,model_year,published,image2,url,brand_id,source_image,shape_id`;
    dispatch(setQuery(query));
    console.log(query);
    fetchCars(query).then((res) => {
      $(".load_cont").fadeOut(function () {
        $(this).parent().fadeOut();
        $("body").css({ "overflow-y": "visible" });
      });
      if (res && res.response && res.response.docs) {
        setLoading(false)
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
  const getBrandValueAswell = (model, index) => {
    let filteredBrand = searchInputs.marksOptions.filter((item) => item.value === model.brandId)
    return (<li key={"searchMarks" + index}>
    {model.label} {filteredBrand[0] ? " - " + filteredBrand[0].label: ''}
    <span onClick={() => {
      let brandModel = [...searchForm.brand_type_id];
      if (brandModel.includes(model.value)) {
        brandModel.splice(brandModel.indexOf(model.value), 1);
      }
      _handleStartSearch("brand_type_id", brandModel);
    }}>
      <IoIosClose />
    </span>
  </li>)
  };
  const modalOfbrandNotSelected = (brand, index) => {
    let returnVal = true
    searchInputs.modelOptions.map((model) => {
       if(searchForm.brand_type_id.includes(model.value) && model.brandId === brand) {
        returnVal = false
       }
    })
    return returnVal
  };

  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
  return (
    <>
    <SaveResults />
      <header>
        <div className="container">
          <div className="row">
            <div className="col-6">
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
      <section className="section-gray">
        <div className="container-fluid">
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
                        return (searchForm.brand_id.includes(mark.value) && modalOfbrandNotSelected(mark.value, index)) ? (
                          <li
                            key={"searchMarks" + index}>
                            {mark.label}
                            <span onClick={() => {
                              let marks = [...searchForm.brand_id];
                              if (marks.includes(mark.value)) {
                                marks.splice(marks.indexOf(mark.value), 1);
                              }
                              _handleStartSearch("brand_id", marks);
                            }}>
                              <IoIosClose />
                            </span>
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
                          getBrandValueAswell(model, index)
                        ) : (
                          false
                        );
                      })
                    : ""}
                    </ul>
                    <ul className="search_tags">
                  {searchForm.shape_id && searchForm.shape_id.length > 0
                    ? searchInputs.shapes.map((shape, index) => {
                        return searchForm.shape_id.includes(shape.id) ? (
                          <li key={"searchShapes" + index}>
                            {shape.title}
                            <span onClick={() => {
                              let shapes = [...searchForm.shape_id];
                              if (shapes.includes(shape.value)) {
                                shapes.splice(shapes.indexOf(shape.value), 1);
                              }
                              _handleStartSearch("shape_id", shapes);
                            }}>
                              <IoIosClose />
                            </span>
                          </li>
                        ) : (
                          false
                        );
                      })
                    : ""}
                    {searchForm.source_id && searchForm.source_id.length > 0
                    ? searchInputs.sources.map((source, index) => {
                        return searchForm.source_id.includes(source.value) ? (
                          <li key={"searchcities" + index}>
                            {source.label}
                            <span onClick={() => {
                              let sources = [...searchForm.source_id];
                              if (sources.includes(source.value)) {
                                sources.splice(sources.indexOf(source.value), 1);
                              }
                              _handleStartSearch("source_id", sources);
                            }}>
                              <IoIosClose />
                            </span>
                          </li>
                        ) : (
                          false
                        );
                      })
                    : ""}
                    {searchForm.price && searchForm.price.length > 0
                    ? searchForm.price.map((price, index) => {
                        return (
                          <li style={{direction: "ltr"}} key={"searchcities" + index}>
                          {price}
                          <span onClick={() => {
                            let prices = [...searchForm.price];
                            prices.splice(prices.indexOf(price), 1);
                            _handleStartSearch("price", prices);
                          }}>
                            <IoIosClose />
                          </span>
                        </li>
                        )
                      })
                    : ""}
                    {searchForm.kilometer && searchForm.kilometer.length > 0
                    ? searchForm.kilometer.map((kilometer, index) => {
                        return (
                          <li style={{direction: "ltr"}} key={"searchcities" + index}>
                          {kilometer}
                          <span onClick={() => {
                            let kilometers = [...searchForm.kilometer];
                            kilometers.splice(kilometers.indexOf(kilometer), 1);
                            _handleStartSearch("kilometer", kilometers);
                          }}>
                            <IoIosClose />
                          </span>
                        </li>
                        )
                      })
                    : ""}
                    {searchForm.city_id && searchForm.city_id.length > 0
                    ? searchInputs.cityOptions.map((city, index) => {
                        return searchForm.city_id.includes(city.value) ? (
                          <li key={"searchcities" + index}>
                            {city.label}
                            <span onClick={() => {
                              let cities = [...searchForm.city_id];
                              if (cities.includes(city.value)) {
                                cities.splice(cities.indexOf(city.value), 1);
                              }
                              _handleStartSearch("city_id", cities);
                            }}>
                              <IoIosClose />
                            </span>
                          </li>
                        ) : (
                          false
                        );
                      })
                    : ""}
                    {searchForm.model_year_end && (searchForm.model_year_end < new Date().getFullYear() || searchForm.model_year_start > 1990)
                    ? <li>
                    {searchForm.model_year_start + "-" + searchForm.model_year_end}
                    <span onClick={() => {
                      _handleStartSearch("model_year", {
                        model_year_start: 1990,
                        model_year_end: new Date().getFullYear(),
                      });
                    }}>
                      <IoIosClose />
                    </span>
                  </li>
                    : ""}
                  {(searchForm.city_id.length > 0 ||
                    searchForm.shape_id.length > 0 ||
                    searchForm.brand_type_id.length > 0 ||
                    searchForm.model_year_end < new Date().getFullYear() || 
                    searchForm.model_year_start > 1990 ||
                    searchForm.brand_id.length > 0) &&
                    <li className="search_tags-remove" key={"searchcitiesclear"} onClick={() => _handleStartSearch('clearall')} >
                      امسح الكل
                    </li>
                  }
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
              <div 
                className="subscribe"
              >
                <label> أدخل بريدك الألكترونى وسيتم إبلاغك عند توافر نتائج جديدة</label>
                <input
                  type="email"
                  placeholder=" البريد الألكترونى "
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    _handleSaveResults();
                  }}
                >
              حفظ نتائج البحث
            </button>
                {/* <button className="fa fa-search" type="button" onClick={(e) => {e.preventDefault(); _handleSubscripeToNewsletter();}}></button> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <Filters
                closeFilterMenuHandle={closeFilterMenuHandle}
                handleStartSearch={(type, value) =>
                  _handleStartSearch(type, value)
                }
                searchState={searchForm}
              />
            </div>
            <div className="col-lg-10">
              <div className="search_hint">
                <button
                  className="filter_btn link"
                  onClick={fillterBtnClickHandle}
                >
                  <i className="fas fa-sliders-h"></i>
                  فلتر البحث
                </button>
                <div className="dropdown bg-white border rounded" onClick={toggleOpen}>
                  <button
                    className="btn btn-secondary dropdown-toggle bg-white"
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
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        _handleStartSearch("sort", "sort=date+desc")
                      }
                    >
                      {" "}
                      التاريخ [ أحدث ]{" "}
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        _handleStartSearch("sort", "sort=date+asc")
                      }
                    >
                      {" "}
                      التاريخ [ الأقدم ]{" "}
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
                  height: '100vh',
                  overflow: 'auto',
                  position: 'relative',
                }}
              >
                {/* {loading ? <div style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  backgroundColor: "#e9e9e9"
                }}><img src="./images/loading.gif" alt="loading" /></div> : */}
                  <InfiniteScroll
                    dataLength={searchForm.index + 12} //This is important field to render the next data
                    next={() => _handleStartSearch("paginate", searchForm.index + 12)}
                    hasMore={searchForm.index + 12 < resultsNumber}
                    loader={<img src="./images/loading.gif" alt="loading" />
                    }
                    scrollWindow={false}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <h2>لاتوجد نتائج اضافية</h2>
                      </p>
                    }>
                    <Cars cars={cars} />
                  </InfiniteScroll>
                {/* } */}
              </div>
              <div className="w-100 text-left">
                {/* <button className="link green_bc" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">حفظ نتائج البحث</button> */}
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
      <div className="copyrights">جميع الحقوق محفوظة | مشراي {new Date().getFullYear()}</div>
      <Loader />
      <ToastContainer />
    </>
  );
}
