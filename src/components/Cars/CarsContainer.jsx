import { apiUrl } from "../../features/constants";
import { numberWithCommas } from "../../helpers";
import CarDetails from "./CarDetails";
import CarImage from "./CarImage";

const CarsContainer = ({
  cars,
  getBrandName,
  getModelName,
  getCitylName,
  hoveredCar,
  checkAddAvialble,
  handleMouseOver,
  setShow,
  showReportModal,
  show,
  handleReport,
  setshowReportModal,
  t,
  submitReportReason,
  selectedCar,
}) => {
  const isEnglish = localStorage.getItem("lang") === "en";
  return (
    <>
      {cars.map((car) => {
        const brandName = getBrandName(car);
        const modelName = getModelName(car);
        const cityName = getCitylName(car);
        return (
          <div
            className="col-lg-3 col-md-6 col-sm-6 card_space"
            style={car.id === hoveredCar?.id ? { zIndex: 1 } : {}}
            key={car.id}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                checkAddAvialble(car);
                window.open(car?.url, "_blank");
              }}
              href={car?.url}
              // to={{ pathname: `${car.url}` }}
              className="car_item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CarImage
                image={car?.image2}
                id={car?.id}
                srcImage={car?.source_image}
              />

              <div className="car_cont ">
                <CarDetails
                  car={car}
                  brandName={brandName}
                  modelName={modelName}
                  handleMouseOver={handleMouseOver}
                  setShow={setShow}
                  show={show}
                  hoveredCar={hoveredCar}
                  isEnglish={isEnglish}
                  handleReport={handleReport}
                  showReportModal={showReportModal}
                  setshowReportModal={setshowReportModal}
                  submitReportReason={submitReportReason}
                  selectedCar={selectedCar}
                  t={t}
                  cityName={cityName}
                />

                <div className="bottom">
                  <div className="price">
                    {/* <span> {t("search.price")} </span>{" "} */}
                    {!car.price
                      ? car.price2
                        ? numberWithCommas(car.price2)
                        : t("results.noPrice")
                      : car.price === -1
                      ? t("car.onHaggle")
                      : numberWithCommas(car.price) + ` ${t("results.riyal")}`}
                  </div>
                  <img src={apiUrl + "/upload/" + car.source_image} alt="" />
                </div>
              </div>
            </a>
            {/* <!--End Car ITem--> */}
          </div>
        );
      })}
    </>
  );
};

export default CarsContainer;
