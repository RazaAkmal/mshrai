import moment from "moment";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { MdOutlineLocationOn } from "react-icons/md";
import { numberWithCommas } from "../../helpers";
import { ReportModal } from "../reportModal";

const CarDetails = ({
  car,
  brandName,
  modelName,
  handleMouseOver,
  setShow,
  show,
  hoveredCar,
  isEnglish,
  handleReport,
  showReportModal,
  setshowReportModal,
  submitReportReason,
  selectedCar,
  t,
  cityName,
}) => {
  return (
    <>
      <div className="car_details">
        {brandName ? <h3>{brandName + " - " + modelName}</h3> : ""}
        <p>
          <i className="far fa-clock"></i>
          {moment(car.date).fromNow()}
        </p>
        <div
          className="three_dot_icon"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleMouseOver(car);
            setShow(!show);
          }}
        >
          <i className="fa fa-ellipsis-v"></i>
        </div>
        {car.id === hoveredCar?.id && (
          <div className={isEnglish ? "dropdown_icon_en" : "dropdown_icon_ar"}>
            <Dropdown show={show}>
              <Dropdown.Menu className="dropdown_itam_flag">
                <Dropdown.Item style={{ padding: "0px" }}>
                  <div
                    onClick={(e) => handleReport(e, car)}
                    className="report_btn"
                  >
                    <p
                      style={{
                        color: "grey",
                      }}
                    >
                      {t("car.report")}
                    </p>
                    <i className="fa fa-flag report-flag"></i>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {/* <div
                        onClick={(e)=>handleReport(e, car)}
                        className="report_btn"
                        onMouseOver={()=>handleMouseOver(car)} onMouseOut={()=>handleMouseOut(car)}
                      >
                      {isHovering && car.id === hoveredCar.id &&
                        <p
                          style={{
                            color: "grey",
                          }}
                        >
                          {t("car.report")}
                        </p>
                      }
                        <i
                          className="fa fa-flag report-flag"
                        ></i>
                      </div> */}
        <ReportModal
          show={showReportModal}
          handleClose={() => setshowReportModal(false)}
          handleSubmit={(selectedReasonId) => {
            submitReportReason(selectedCar, selectedReasonId);
          }}
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
            : numberWithCommas(car.price) + ` ${t("results.riyal")}`}
        </div>
        <p>
          <MdOutlineLocationOn /> {cityName}
        </p>
      </div>
    </>
  );
};

export default CarDetails;
