import { Link } from "react-router-dom";
import { apiUrl } from "../features/constants";
import { MdOutlineLocationOn } from "react-icons/md";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ReportModal } from "./reportModal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// moment.updateLocale('en', {
//   relativeTime : {
//       future: "in %s",
//       past:   "%s+",
//       s  : 'a few seconds',
//       ss : '%d seconds',
//       m:  "a minute",
//       mm: "%d minutes",
//       h:  "an hour",
//       hh: "%dh",
//       d:  "a day",
//       dd: "%d days",
//       M:  "a month",
//       MM: "%d months",
//       y:  "a year",
//       yy: "%d years"
//   }
// });

export default function Cars({ cars }) {
  const searchInputs = useSelector((state) => state.search.searchInputs);

  const { t } = useTranslation();
  const [showReportModal, setshowReportModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState();

  const addUserActivity = (car) => {
    let userId = Cookies.get("id");
    let bodyFormData = new FormData();
    bodyFormData.append("user_id", userId);
    bodyFormData.append("ad_id", car.id);
    bodyFormData.append("username", "guest");
    axios({
      method: "post",
      url: "https://admin.mshrai.com/api/user_activity",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const checkAddAvialble = async (car) => {
    addUserActivity(car);
    let splitedUrl = car.url.split("/");
    let id = splitedUrl[splitedUrl.length - 1].slice(2);
    let url =
      "https://graphql.haraj.com.sa/?queryName=postLikeInfo,postContact&token=&clientId=12c874b0-2150-45a4-8ba2-84c73d129111&version=8.2.1%20,%206%209%20-%209%20-%2021/";
    let post_data = {
      query:
        "query($ids:[Int]) { posts( id:$ids) {\n\t\titems {\n\t\t\tid status authorUsername title city postDate updateDate hasImage thumbURL authorId bodyTEXT city tags imagesList commentStatus commentCount upRank downRank geoHash\n\t\t}\n\t\tpageInfo {\n\t\t\thasNextPage\n\t\t}\n\t\t} }",
      variables: { ids: [Number(id)] },
    };

    await axios({
      url: url,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(post_data),
    })
      .then(async (data) => {
        const { posts } = data.data.data;
        if (!posts.items[0].status) {
          let bodyFormData = new FormData();
          bodyFormData.append("status", posts.items[0].status);
          bodyFormData.append("id", car.id);
          axios({
            method: "post",
            url: "https://admin.mshrai.com/api/product_status",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (response) {
              console.log(response);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleReport = (ev,car) => {
    ev.stopPropagation();
    ev.preventDefault();
    setshowReportModal(true);
    setSelectedCar(car);
  };

  const isEnglish = localStorage.getItem("lang") === "en";

  const getBrandName = (car) => {
    const brandDetails = searchInputs.marksOptions.find(
      (i) => i.value === Number(car.brand_id)
    );
    return isEnglish ? brandDetails?.label_en : brandDetails?.label;
  };
  const getModelName = (car) => {
    const brandDetails = searchInputs.modelOptions.find(
      (i) => i.value === Number(car.brand_type_id)
    );
    return isEnglish ? brandDetails?.label_en : brandDetails?.label;
  };
  const getCitylName = (car) => {
    const cityDetails = searchInputs.cityOptions.find(
      (i) => i.value === Number(car.city_id)
    );
    return isEnglish ? cityDetails?.label_en : cityDetails?.label;
  };

  const submitReportReason = (selectedCar, selectedReasonId) => {
    const brandName = getBrandName(selectedCar);
    const modelName = getModelName(selectedCar);

    const payload = {
        'post_title': brandName ? `${brandName} - ${modelName}` : "",
        'post_link': selectedCar.url,
        'report_reason_id': selectedReasonId
    }

    axios({
        method: "post",
        url: "https://admin.mshrai.com/api/report_reasons",
        data: payload,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((resp) => {
        toast.success(resp.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setshowReportModal(false);
    }).catch((error) => {
        console.log(error)
    });
  };

  return (
    <div className="row">
      {cars.length > 0 ? (
        cars.map((car) => {
          const brandName = getBrandName(car);
          const modelName = getModelName(car);
          const cityName = getCitylName(car);
          return (
            <div className="col-lg-3 col-md-6 col-sm-6 card_space" key={car.id}>
                <Link
                  onClick={() => checkAddAvialble(car)}
                  to={{ pathname: car.url }}
                  className="car_item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="car_img">
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${apiUrl}/img/default.jpg`;
                      }}
                      src={
                        car.image2 ? car.image2 : `${apiUrl}/img/default.jpg`
                      }
                      alt=""
                      id={car.id}
                    />
                    <div className="source_logo_mobile">
                    <img src={apiUrl + "/upload/" + car.source_image} alt="" />
                    </div>
                  </div>
                  <div className="car_cont">
                    <div className="car_details">
                      {brandName ? <h3>{brandName + " - " + modelName}</h3> : ""}
                      <p>
                        <i className="far fa-clock"></i>
                        {moment(car.date).fromNow(false)}
                      </p>
                      <div
                        onClick={(e)=>handleReport(e, car)}
                        className="report_btn"
                      >
                        <p
                          style={{
                            color: "grey",
                          }}
                        >
                          {t("car.report")}
                        </p>
                        <i
                          className="fa fa-flag"
                          style={{
                            color: "red",
                          }}
                        ></i>
                      </div>

                      <ReportModal
                        show={showReportModal}
                        handleClose={() => setshowReportModal(false)}
                        handleSubmit={(selectedReasonId) => {submitReportReason(selectedCar, selectedReasonId)}}
                      />

                      <ul className="tags">
                        <li>{car.model_year}</li>
                        {car.kilometer ? (
                          <li>
                            {car.kilometer} {t("car.km")}
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                      <div className="price_mobile">
                        {/* <span> {t("search.price")} </span>{" "} */}
                        {!car.price
                          ? car.price2
                            ? numberWithCommas(car.price2)
                            : t("results.noPrice")
                          : car.price === -1
                          ? t("car.onHaggle")
                          : numberWithCommas(car.price) +
                            ` ${t("results.riyal")}`}
                      </div>
                      <p>
                        <MdOutlineLocationOn /> {cityName}
                      </p>
                    </div>
                    <div className="bottom">
                      <div className="price">
                        {/* <span> {t("search.price")} </span>{" "} */}
                        {!car.price
                          ? car.price2
                            ? numberWithCommas(car.price2)
                            : t("results.noPrice")
                          : car.price === -1
                          ? t("car.onHaggle")
                          : numberWithCommas(car.price) +
                            ` ${t("results.riyal")}`}
                      </div>
                      <img src={apiUrl + "/upload/" + car.source_image} alt="" />
                    </div>
                  </div>
                </Link>
                {/* <!--End Car ITem--> */}
              </div>
            );
          })
        ) : (
          <div
            className="col-12 text-center d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
          >
            {t("results.noResults")}
          </div>
        )}
    </div>
  );
} 