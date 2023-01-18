import React, { useEffect, useState } from "react";

import { searchCars, reportReasons } from "../features/search/searchApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCars,
  setResultsNumebr,
  setSearchForm,
  setSearchFormToInital,
  setReportReasons,
} from "../features/search/searchSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { notifyError } from "../helpers";
import {
  handleResultsIfCondition,
  getBrandValueAswellUtility,
  handleStartSearchUtility,
} from "../utils";
import {
  Loader,
  Filters,
  SubscribeModal,
  LogoHeader,
  Alert,
  AllSearchTags,
  SortDropDown,
  SelectedSearchTags,
  Cars,
} from "../components";
export default function Resault(props) {
  useEffect(() => {
    document
      .querySelectorAll(".alert")
      .forEach((el) => (el.style.display = "none"));
    const params = new URLSearchParams(window.location.search);

    const brand_id = [];
    const brand_type_id = [];
    const source_id = [];
    const city_id = [];
    const kilometer = [];
    let model_year_start = "";
    let model_year_end = "";
    for (const [key, value] of params.entries()) {
      if (key.includes("brand_id")) {
        brand_id.push(Number(value));
      }
      if (key.includes("brand_type_id")) {
        brand_type_id.push(Number(value));
      }
      if (key.includes("source_id")) {
        source_id.push(Number(value));
      }
      if (key.includes("city_id")) {
        city_id.push(Number(value));
      }
      if (key.includes("model_year[0][max]")) {
        model_year_end = value;
      }
      if (key.includes("model_year[0][min]")) {
        model_year_start = value;
      }
      if (key.includes("kilometer")) {
        kilometer.push(Number(value));
      }
    }
    // let model_year = {
    //   model_year_start: model_year_start,
    //   model_year_end: model_year_end
    // }

    let query = {
      brand_id: brand_id,
      model_year: [{ min: model_year_start, max: model_year_end }],
    };

    if (brand_type_id.length > 0) {
      query["brand_type_id"] = brand_type_id;
    }
    if (source_id.length > 0) {
      query["source_id"] = source_id;
    }
    if (city_id.length > 0) {
      query["city_id"] = city_id;
    }
    let data = {
      query: query,
    };
    if (brand_id.length > 0) {
      setFilterSelected(true);
      dispatch(
        setSearchForm({
          ...searchForm,
          model_year_start: model_year_start,
          model_year_end: model_year_end,
          brand_id: brand_id,
          brand_type_id: brand_type_id,
          source_id: source_id,
          city_id: city_id,
          index: 0,
        })
      );
    }

    // searchResult(data).then((res) => {
    //   if (res.message === "Request failed with status code 422") {
    //     notifyError("يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالحًا");
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
    reportReasons()
      .then((res) => {
        dispatch(setReportReasons(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [state, setState] = useState({
    searchKeyWord: "",
    email: "",
    isOpen: false,
    cars: [],
  });
  const selectedLng = useSelector((state) => state.search.language);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [initialCars, setIinitialCars] = useState([]);
  const cars = useSelector((state) => state.search.cars);
  const searchForm = useSelector((state) => state.search.searchForm);
  const searchInputs = useSelector((state) => state.search.searchInputs);
  const resultsNumber = useSelector((state) => state.search.numFound);
  const query = useSelector((state) => state.search.query);
  const isEnglish = localStorage.getItem("lang") === "en";
  const allReportReasons = useSelector(
    (state) => state.search.allReportReasons
  );
  const [filterSelected, setFilterSelected] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      cars: cars,
    }));
  }, [cars]);

  const { t } = useTranslation();
  const limit = 8;

  const dispatch = useDispatch();

  const _handleStartSearch = handleStartSearchUtility(
    setNextPage,
    setFilterSelected,
    dispatch,
    setSearchFormToInital,
    setSearchForm,
    searchForm,
    state,
    setPage,
    notifyError,
    t,
    page
  );

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
    };
    handleResultsIfCondition(
      searchForm,
      query,
      searchCars,
      filterSelected,
      selectedLng,
      setIinitialCars,
      dispatch,
      setCars,
      setResultsNumebr,
      setLoading,
      nextPage
    );
  }, [dispatch, searchForm, page, selectedLng]);

  const toggleOpen = () => {
    setState((prevState) => ({
      ...prevState,
      isOpen: !state.isOpen,
    }));
    if (showWrapperDiv) {
      setShowWrapperDiv(false);
    } else {
      setShowWrapperDiv(true);
    }
  };

  const fillterBtnClickHandle = (e) => {
    setShowWrapperDiv(true);
    document.querySelector(".toggle-container").classList.add("move");
    e.stopPropagation();
  };
  const [showWrapperDiv, setShowWrapperDiv] = useState(false);
  const closeFilterMenuHandle = (e) => {
    const result = document
      .querySelector(".toggle-container")
      .getAttribute("class");
    if (result.includes("move")) {
      document.querySelector(".toggle-container").classList.remove("move");
      setShowWrapperDiv(false);
      e.stopPropagation();
    }
    if (state.isOpen) {
      setState((prevState) => ({
        ...prevState,
        isOpen: !state.isOpen,
      }));
      setShowWrapperDiv(false);
    }
  };
  const getBrandValueAswell = getBrandValueAswellUtility(
    searchInputs,
    isEnglish,
    searchForm,
    _handleStartSearch
  );

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

  let totalpages = Math.floor(resultsNumber / 25);
  const changePage = (e, value) => {
    // setPage(page+1)
    setPage(value);
  };
  // const [loading, setLoading] = useState(true)

  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
  return (
    <>
      <div
        style={{
          display: showWrapperDiv ? "block" : "none",
        }}
        className="gray-section-overlay"
        onClick={closeFilterMenuHandle}
      ></div>
      <LogoHeader background />
      {/* <header style={{ background: "#3e0292" }}> */}
      {/* <ScrollButton /> */}

      {/* <div className="container-fluid">
          <div className="row logo-row">
            <div className="col-6">
              <Link to="/">
                <img src="./images/logo.png" alt="logo" />
              </Link> */}
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
      {/* </div>
          </div>
        </div>
      </header> */}
      <section className="section-gray">
        <div className="container-fluid">
          <div
            id="scrollableDiv"
            className="scrolldivhieght"
            style={{
              height: "100vh",
              overflow: "auto",
              position: "relative",
            }}
          >
            {/* <h2 style={{textAlign:'center'}}><Trans i18nKey="description.testLaunch" /></h2> */}
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
                <Alert sucess> تم الإشتراك فى النشرة الإخبارية بنجاح.</Alert>
                <Alert>حدث خطأ ما تأكد من البيانات وأعد الإرسال.</Alert>
                <div className="subscribe">
                  <SubscribeModal />
                </div>
              </div>
            </div>
            <div className="row">
              <SelectedSearchTags
                modalOfbrandNotSelected={modalOfbrandNotSelected}
                searchForm={searchForm}
                _handleStartSearch={_handleStartSearch}
                searchInputs={searchInputs}
                getBrandValueAswell={getBrandValueAswell}
                isEnglish={isEnglish}
              />
            </div>
            <AllSearchTags
              searchInputs={searchInputs}
              searchForm={searchForm}
              _handleStartSearch={_handleStartSearch}
            />
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
                    {t("results.filterBtn")}
                  </button>
                  <SortDropDown
                    toggleOpen={toggleOpen}
                    t={t}
                    menuClass={menuClass}
                    _handleStartSearch={_handleStartSearch}
                  />
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
