import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { notifySucess } from "../../helpers";
import CarsContainer from "./CarsContainer";
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
        if (!posts.items[0]?.status) {
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

  const handleReport = (ev, car) => {
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
      post_title: brandName ? `${brandName} - ${modelName}` : "",
      post_link: selectedCar.url,
      report_reason_id: selectedReasonId,
    };

    axios({
      method: "post",
      url: "https://admin.mshrai.com/api/report_reasons",
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((resp) => {
        notifySucess(resp.data.message);

        setshowReportModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredCar, setHoveredCar] = useState(null);
  const handleMouseOver = (car) => {
    if (hoveredCar !== null) {
      setIsHovering(false);
      setHoveredCar(null);
    } else {
      setIsHovering(true);
      setHoveredCar(car);
    }
  };

  const [show, setShow] = useState(false);
  return (
    <div className="row">
      {cars.length > 0 ? (
        <CarsContainer
          cars={cars}
          getBrandName={getBrandName}
          getModelName={getModelName}
          getCitylName={getCitylName}
          hoveredCar={hoveredCar}
          checkAddAvialble={checkAddAvialble}
          handleMouseOver={handleMouseOver}
          setShow={setShow}
          showReportModal={showReportModal}
          show={show}
          handleReport={handleReport}
          setshowReportModal={setshowReportModal}
          t={t}
          submitReportReason={submitReportReason}
          selectedCar={selectedCar}
        />
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
