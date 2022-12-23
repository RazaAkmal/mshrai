import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import $ from "jquery";
import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../components/filters";
import Cars from "../components/cars";
import Loader from "../components/loader";
import ScrollButton from "../components/ScrollTop";
import {
  searchResult,
  searchCars,
  reportReasons,
} from "../features/search/searchApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCars,
  setQuery,
  setResultsNumebr,
  setSearchForm,
  setSearchFormToInital,
  setReportReasons
} from "../features/search/searchSlice";
import SubscribeModal from "../components/subscribeModal";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { parseParams } from "../helpers/helpers";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Resault(props) {
  useEffect(() => {
    $(".alert").hide();
    const params = new URLSearchParams(window.location.search);

    const brand_id = []
    const brand_type_id = []
    const source_id = []
    const city_id = []
    const kilometer = []
    let model_year_start = ''
    let model_year_end = ''
    for (const [key, value] of params.entries()) {
      if(key.includes('brand_id')) {
        brand_id.push(Number(value))
      }
      if(key.includes('brand_type_id')) {
        brand_type_id.push(Number(value))
      }
      if(key.includes('source_id')) {
        source_id.push(Number(value))
      }
      if(key.includes('city_id')) {
        city_id.push(Number(value))
      }
      if(key.includes('model_year[0][max]')) {
        model_year_end = value
      }
      if(key.includes('model_year[0][min]')) {
        model_year_start = value
      }
      if(key.includes('kilometer')) {
        kilometer.push(Number(value))
      }
    }
    // let model_year = {
    //   model_year_start: model_year_start,
    //   model_year_end: model_year_end
    // }

    let query = {
      brand_id: brand_id,
      model_year: [{ min: model_year_start, max: model_year_end}],
  }


    if (brand_type_id.length > 0) {
      query["brand_type_id"] = brand_type_id
    }
    if (source_id.length > 0) {
      query["source_id"] = source_id
    }
    if (city_id.length > 0) {
      query["city_id"] = city_id
    }
    let data = {
      query: query
    }
    if (brand_id.length > 0) {
      setFilterSelected(true)
      dispatch(setSearchForm({
        ...searchForm,
        model_year_start: model_year_start,
        model_year_end: model_year_end,
        brand_id: brand_id,
        brand_type_id: brand_type_id,
        source_id: source_id,
        city_id: city_id,
        index: 0
      }));
    }


    // searchResult(data).then((res) => {
    //   if (res.message === "Request failed with status code 422") {
    //     showError("يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالحًا");
    //   }
    //   else {
    //       setLoading(false);
    //       setIinitialCars(res.data.response.docs);
    //       let carsArray =
    //         searchForm.index > 0
    //           ? [...cars, ...res.data.response.docs]
    //           : res.data.response.docs;
    //       dispatch(setCars(carsArray));
    //       dispatch(setResultsNumebr(res.data.response.numFound));
    //   }
    // });
    reportReasons().then((res) => {
      dispatch(setReportReasons(res.data));
    }).catch((err) => {
        console.log(err);
    });
  }, []);

  const [state, setState] = useState({
    searchKeyWord: "",
    email: "",
    isOpen: false,
    cars: [],
  });
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [initialCars, setIinitialCars] = useState([]);
  const cars = useSelector((state) => state.search.cars);
  const searchForm = useSelector((state) => state.search.searchForm);
  const searchInputs = useSelector((state) => state.search.searchInputs);
  const resultsNumber = useSelector((state) => state.search.numFound);
  const query = useSelector((state) => state.search.query);
  const isEnglish = localStorage.getItem("lang") === "en";
  const allReportReasons = useSelector((state) => state.search.allReportReasons);
  const [filterSelected, setFilterSelected] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      cars: cars
    }));
  }, [cars])


  const { t } = useTranslation();
  const limit = 8;

  const dispatch = useDispatch();


  const _handleStartSearch = (type, value, value_obj) => {
    setNextPage(false)
    setFilterSelected(true)
    switch (type) {
      case "clearall":
        setFilterSelected(false)
        dispatch(setSearchFormToInital());
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
        setPage(1)
        dispatch(setSearchForm({ ...searchForm, price: value, price_obj: value_obj, index: 0 }));
        break;
      case "brand_type_id":
        if (value.length > 3) {
          showError(t("results.filterLimitError"))
        } else {
          setPage(1)
          dispatch(
            setSearchForm({ ...searchForm, brand_type_id: value, index: 0 })
          );
        }
        break;
      case "brand_id":
        if (value.length > 3) {
          showError(t("results.filterLimitError"))
        } else {
          setPage(1)
          dispatch(setSearchForm({ ...searchForm, brand_id: value, index: 0 }));
        }
        break;
      case "source_id":
        dispatch(setSearchForm({ ...searchForm, source_id: value, index: 0 }));
        break;
      case "city_id":
        setPage(1)
        dispatch(setSearchForm({ ...searchForm, city_id: value, index: 0 }));
        break;
      case "model_year":
        setPage(1)
        dispatch(
          setSearchForm({
            ...searchForm,
            model_year_start: value.model_year_start,
            model_year_end: value.model_year_end,
          })
        );
        break;
      case "shape_id":
        setPage(1)
        dispatch(setSearchForm({ ...searchForm, shape_id: value, index: 0 }));
        break;
      case "kilometer":
        setPage(1)
        dispatch(setSearchForm({ ...searchForm, kilometer: value, kilometer_obj: value_obj, index: 0 }));
        break;
      case "sort":
        setPage(1)
        dispatch(setSearchForm({ ...searchForm, sort: value, index: 0 }));
        break;
      case "paginate":
        setNextPage(true)
        setPage(page + 1)
        dispatch(setSearchForm({ ...searchForm, index: value }));
        break;
      default:
        break;
    }
  };

  const showError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // const _handleSaveResults = () => {
  //   if (state.email === "") {
  //     showError(t("results.pleaseEnterEmail"));
  //     return;
  //   } else if (searchForm.brand_id.length === 0) {
  //     showError("الرجاء تحديد علامة تجارية واحدة على الأقل");
  //     return;
  //   }
  //   seIisBusy(true);

  //   const queryParams = parseParams(query);

  //   const data = {
  //     email: state.email,
  //     brand_id: searchForm.brand_id,
  //     keys: queryParams,
  //   };

  //   saveResults(data).then((res) => {
  //     seIisBusy(false);

  //     toast.success(res.message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   });
  // };

  const carsContain = (source) => {
    if (initialCars.length > 0) {
      const filtered = initialCars.filter((i) => i.source === source);
      return filtered.length === initialCars.length;
    } else return true;
  };

  useEffect(() => {
    setLoading(true);
    const query = {
      page: page,
    }
    let modelYear=[{
      min: searchForm.model_year_start,
      max: searchForm.model_year_end
    }]
    query['model_year']= modelYear
    if (
      searchForm.brand_id &&
      searchForm.brand_id != null &&
      searchForm.brand_id.length > 0
    ) {
      let brandId = []
      searchForm.brand_id.forEach((id, index) => {
        brandId.push(id)
      });
      query['brand_id'] = brandId
    }
    if (
      searchForm.brand_type_id &&
      searchForm.brand_type_id != null &&
      searchForm.brand_type_id.length > 0
    ) {
      let brandType=[]
      searchForm.brand_type_id.forEach((id, index) => {
        brandType.push(id)
      });
      query['brand_type_id']=brandType
    }
    // if (
    //   searchForm.shape_id &&
    //   searchForm.shape_id != null &&
    //   searchForm.shape_id.length > 0
    // ) {
    //   query += ` AND shape_id:(`;
    //   searchForm.shape_id.forEach((id, index) => {
    //     query += index === 0 ? id : ` OR ${id}`;
    //   });
    //   query += ")";
    // }
    if (
      searchForm.city_id &&
      searchForm.city_id != null &&
      searchForm.city_id.length > 0
    ) {
      let city=[]
      searchForm.city_id.forEach((id, index) => {
          city.push(id)
      });
      query['city_id']=city
    }
    if (
      searchForm.source_id &&
      searchForm.source_id != null &&
      searchForm.source_id.length > 0
    ) {
      let source=[]
      searchForm.source_id.forEach((id, index) => {
          source.push(id)
      });
      query['source_id']=source
    }
    if (searchForm.kilometer && searchForm.kilometer.length > 0) {
      query['kilometer'] = searchForm.kilometer_obj
    }
    if (searchForm.price && searchForm.price.length > 0) {
      query['price']=searchForm.price_obj
    }
    if (searchForm.sort && searchForm.sort !== "") {
      let type = searchForm.sort.includes('price') ? 'price' : 'date'
      let order = searchForm.sort.includes('asc') ? 'asc' : 'desc'
      query['sort']= {
        order: order,
        column: type
      }
    }
    // if (carsContain("Syarah") || carsContain("haraj")) {
    //   query += "&sort=query($haraj_sort, 0) asc, query($sayarah_sort, 0) asc";
    //   query += "&haraj_sort={!field f=source v=haraj}";
    //   query += "&sayarah_sort={!field f=source v=Syarah}";
    // }

    searchCars(query, filterSelected).then((res) => {
      $(".load_cont").fadeOut(function () {
        $(this).parent().fadeOut();
        $("body").css({ "overflow-y": "visible" });
      });
      if (res && res.response && res.response.docs) {
        
        setIinitialCars(res.response.docs);
        let carsArray =
          nextPage
            ? [...res.response.docs]
            : res.response.docs;
        dispatch(setCars(carsArray));
        dispatch(setResultsNumebr(res.response.numFound));
        setLoading(false);
      }
    });

  }, [dispatch, searchForm, page]);

  const toggleOpen = () =>{
    setState((prevState) => ({
      ...prevState,
      isOpen: !state.isOpen
    }));
    setShowWrapperDiv(true)
  } 

  const fillterBtnClickHandle = (e) => {
    setShowWrapperDiv(true)
    $(".toggle-container").addClass("move");
    e.stopPropagation();
  };
  const [showWrapperDiv, setShowWrapperDiv] = useState(false)
  const closeFilterMenuHandle = (e) => {
    const result = $('.toggle-container').attr('class');
    if (result.includes('move')) {
      $(".toggle-container").removeClass("move");
      setShowWrapperDiv(false)
      e.stopPropagation();
    }
    if(state.isOpen) {
      setState((prevState) => ({
        ...prevState,
        isOpen: !state.isOpen
      }))
      setShowWrapperDiv(false)
    }
  };
  const getBrandValueAswell = (model, index) => {
    let filteredBrand = searchInputs.marksOptions.filter(
      (item) => item.value === model.brandId
    );
    return (
      <li key={"searchMarks" + index}>
        {isEnglish ? model.label_en : model.label} {filteredBrand[0] ? `- ${isEnglish ? filteredBrand[0].label_en : filteredBrand[0].label}` : ""}
        <span
          onClick={() => {
            let brandModel = [...searchForm.brand_type_id];
            if (brandModel.includes(model.value)) {
              brandModel.splice(brandModel.indexOf(model.value), 1);
            }
            _handleStartSearch("brand_type_id", brandModel);
          }}
        >
          <IoIosClose />
        </span>
      </li>
    );
  };
  const modalOfbrandNotSelected = (brand, index) => {
    let returnVal = true;
    searchInputs.modelOptions.map((model) => {
      if (
        searchForm.brand_type_id.includes(model.value) &&
        model.brandId === brand
      ) {
        returnVal = false;
      }
    });
    return returnVal;
  };

  let totalpages = Math.floor(resultsNumber/25);
  const changePage  = (e, value) => {
    // setPage(page+1)
    setPage(value);
  };
  // const [loading, setLoading] = useState(true)

  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
  return (
    <>
      <div style={{
        display: showWrapperDiv ? "block" : "none"}} 
        className="gray-section-overlay" onClick={closeFilterMenuHandle}>
      </div>
      <header>
      {/* <ScrollButton /> */}

        <div className="container-flued">
          <div className="row logo-row">
          <span className="launch-text"><Trans i18nKey="description.testLaunch" /></span>
            <div className="col-md-12" style={{position:'absolute',top:'-11px'}}>
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
      <section className="section-gray" >
        <div className="container-fluid">
          <div
            id="scrollableDiv"
            style={{
              height: "100vh",
              overflow: "auto",
              position: "relative",
            }}
          >    
            <div className="row">
              <div className="col">
                <div className="search_hint">
                  <p>
                    <span>{resultsNumber}</span>{" "}
                    {t("results.searchResultForCar")}
                  </p>
                </div>
              </div>
              <div className="col text-left">
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  تم الإشتراك فى النشرة الإخبارية بنجاح.
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  حدث خطأ ما تأكد من البيانات وأعد الإرسال.
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="subscribe">
                  <SubscribeModal />
                </div>
              </div>
            </div>
            <div className="row">
              <ul className="search_tags">
                {searchForm.brand_id && searchForm.brand_id.length > 0
                  ? searchInputs.marksOptions.map((mark, index) => {
                      return searchForm.brand_id.includes(mark.value) &&
                        modalOfbrandNotSelected(mark.value, index) ? (
                        <>
                          <li key={"searchMarks" + index}>
                            {isEnglish ? mark.label_en : mark.label}
                            <span
                              onClick={() => {
                                let marks = [...searchForm.brand_id];
                                if (marks.includes(mark.value)) {
                                  marks.splice(marks.indexOf(mark.value), 1);
                                }
                                _handleStartSearch("brand_id", marks);
                              }}
                            >
                              <IoIosClose />
                            </span>
                          </li>
                        </>
                      ) : (
                        false
                      );
                    })
                  : ""}
                {searchForm.brand_type_id && 
                searchForm.brand_type_id.length > 0
                  ? searchInputs.modelOptions.map((model, index) => {
                      return searchForm.brand_type_id.includes(model.value)
                        ? getBrandValueAswell(model, index)
                        : false;
                    })
                  : ""}
              </ul>
            </div>
            <div className="row">
              <ul className="search_tags">
                {searchForm.shape_id && searchForm.shape_id.length > 0
                  ? searchInputs.shapes.map((shape, index) => {
                      return searchForm.shape_id.includes(shape.id) ? (
                        <li key={"searchShapes" + index}>
                          {isEnglish ? shape.title_en : shape.title}
                          <span
                            onClick={() => {
                              let shapes = [...searchForm.shape_id];
                              if (shapes.includes(shape.value)) {
                                shapes.splice(shapes.indexOf(shape.value), 1);
                              }
                              _handleStartSearch("shape_id", shapes);
                            }}
                          >
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
                          {source.label === "Snap"
                            ? "Social Media"
                            : isEnglish
                            ? source.label_en
                            : source.label}
                          <span
                            onClick={() => {
                              let sources = [...searchForm.source_id];
                              if (sources.includes(source.value)) {
                                sources.splice(
                                  sources.indexOf(source.value),
                                  1
                                );
                              }
                              _handleStartSearch("source_id", sources);
                            }}
                          >
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
                        <li
                          style={{ direction: "ltr" }}
                          key={"searchcities" + index}
                        >
                          {price}
                          <span
                            onClick={() => {
                              let prices = [...searchForm.price];
                              prices.splice(prices.indexOf(price), 1);
                              _handleStartSearch("price", prices);
                            }}
                          >
                            <IoIosClose />
                          </span>
                        </li>
                      );
                    })
                  : ""}
                {searchForm.kilometer && searchForm.kilometer.length > 0
                  ? searchForm.kilometer.map((kilometer, index) => {
                      return (
                        <li
                          style={{ direction: "ltr" }}
                          key={"searchcities" + index}
                        >
                          {kilometer}
                          <span
                            onClick={() => {
                              let kilometers = [...searchForm.kilometer];
                              kilometers.splice(
                                kilometers.indexOf(kilometer),
                                1
                              );
                              _handleStartSearch("kilometer", kilometers);
                            }}
                          >
                            <IoIosClose />
                          </span>
                        </li>
                      );
                    })
                  : ""}
                {searchForm.city_id && searchForm.city_id.length > 0
                  ? searchInputs.cityOptions.map((city, index) => {
                      return searchForm.city_id.includes(city.value) ? (
                        <li key={"searchcities" + index}>
                          {isEnglish ? city.label_en : city.label}
                          <span
                            onClick={() => {
                              let cities = [...searchForm.city_id];
                              if (cities.includes(city.value)) {
                                cities.splice(cities.indexOf(city.value), 1);
                              }
                              _handleStartSearch("city_id", cities);
                            }}
                          >
                            <IoIosClose />
                          </span>
                        </li>
                      ) : (
                        false
                      );
                    })
                  : ""}
                {searchForm.model_year_end &&
                (searchForm.model_year_end < new Date().getFullYear() ||
                  searchForm.model_year_start > 1990) ? (
                  <li>
                    {searchForm.model_year_start +
                      "-" +
                      searchForm.model_year_end}
                    <span
                      onClick={() => {
                        _handleStartSearch("model_year", {
                          model_year_start: 1990,
                          model_year_end: new Date().getFullYear(),
                        });
                      }}
                    >
                      <IoIosClose />
                    </span>
                  </li>
                ) : (
                  ""
                )}

                {/*  this will require when we remove reange manufacturing_year filter  
                    {searchForm.manufacturing_year && searchForm.manufacturing_year.length > 0
                      ? searchForm.manufacturing_year.map((year, index) => {
                        return (
                          <li
                            style={{ direction: "ltr" }}
                            key={"searchcities" + index}
                          >
                            {year}
                            <span
                              onClick={() => {
                                _handleStartSearch("model_year", {
                                  model_year_start: 1990,
                                  model_year_end: new Date().getFullYear(),
                                });
                              }}
                            >
                              <IoIosClose />
                            </span>
                          </li>
                        );
                      })
                      : ""} */}

                {(searchForm.city_id.length > 0 ||
                  searchForm.source_id.length > 0 ||
                  searchForm.brand_type_id.length > 0 ||
                  searchForm.model_year_end < new Date().getFullYear() ||
                  searchForm.model_year_start > 1990 ||
                  searchForm.brand_id.length > 0) && (
                  <li
                    className="search_tags-remove"
                    key={"searchcitiesclear"}
                    onClick={() => _handleStartSearch("clearall")}
                  >
                    {isEnglish ? "Clear All" : "امسح الكل"}
                  </li>
                )}
              </ul>
            </div>
            <div className="row">
              <div className="col-lg-2">
                <Filters
                  closeFilterMenuHandle={closeFilterMenuHandle}
                  handleStartSearch={(type, value, value_obj) =>
                    _handleStartSearch(type, value, value_obj)
                  }
                  searchState={searchForm}
                />
              </div>
              <div className="col-lg-10">
                <div className="search_hint search_hint_mobile">
                  <button
                    className="filter_btn link"
                    onClick={fillterBtnClickHandle}
                  >
                    <i className="fas fa-sliders-h"></i>
                    {t('results.filterBtn')}
                  </button>
                  <div
                    className="dropdown bg-white border rounded"
                    onClick={toggleOpen}
                  >
                    <button
                      className="btn btn-secondary dropdown-toggle bg-white"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-sort-amount-desc"></i>{" "}
                      <span>{t("results.sortBy")}</span>
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
                        {t("search.price")} [ {t("results.sort.least")} ]{" "}
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() =>
                          _handleStartSearch("sort", "sort=price+desc")
                        }
                      >
                        {" "}
                        {t("search.price")} [ {t("results.sort.most")} ]{" "}
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() =>
                          _handleStartSearch("sort", "sort=date+desc")
                        }
                      >
                        {" "}
                        {t("results.date")} [ {t("results.sort.latest")} ]{" "}
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() =>
                          _handleStartSearch("sort", "sort=date+asc")
                        }
                      >
                        {" "}
                        {t("results.date")} [ {t("results.sort.oldest")} ]{" "}
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
                {/* <InfiniteScroll
                  dataLength={state.cars.length} //This is important field to render the next data
                  next={() =>
                    _handleStartSearch("paginate", searchForm.index + 12)
                  }
                  hasMore={state.cars.length < resultsNumber}
                  loader={<img src="./images/loading.gif" alt="loading" />}
                  scrollWindow={false}
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <h2>{t("results.noAdditionalResults")}</h2>
                    </p>
                  }
                >
                  <Cars cars={state.cars} />
                </InfiniteScroll> */}
                {loading ? (
                  <img
                    src="./images/loading.gif"
                    alt="loading"
                    className="loader"
                  />
                ) : (
                  <Cars cars={state.cars} />
                )}
              </div>
            </div>
          </div>
        </div>
        <Stack spacing={4} className="loader_stack">
          <Pagination
            count={totalpages}
            page={page}
            onChange={changePage}
            className="page_num"
          />
        </Stack>
      </section>
      <div className="copyrights">
        {t("description.copyright")} | {t("appName")} {new Date().getFullYear()}
      </div>
      <Loader />
      <ToastContainer />
    </>
  );
}
