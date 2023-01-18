import React from "react";
import SortDropDownItem from "./SortDropDownItem";

const SortDropDown = ({ toggleOpen, t, menuClass, _handleStartSearch }) => {
  const MenuClassStyleObject = {
    position: "absolute",
    transform: "translate3d(0px, 33px, 0px)",
    top: "0px",
    left: "0px",
    willChange: "transform",
  };
  return (
    <>
      <div className="dropdown bg-white border rounded" onClick={toggleOpen}>
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
          style={MenuClassStyleObject}
        >
          <SortDropDownItem
            sortType="sort=price+asc"
            _handleStartSearch={_handleStartSearch}
            text={`${t("search.price")} [ ${t("results.sort.least")} ]`}
          />
          <SortDropDownItem
            sortType="sort=price+desc"
            _handleStartSearch={_handleStartSearch}
            text={`${t("search.price")} [ ${t("results.sort.most")} ]`}
          />
          <SortDropDownItem
            sortType="sort=date+desc"
            _handleStartSearch={_handleStartSearch}
            text={`${t("results.date")} [ ${t("results.sort.latest")} ]`}
          />
          <SortDropDownItem
            sortType="sort=date+asc"
            _handleStartSearch={_handleStartSearch}
            text={`${t("results.date")} [ ${t("results.sort.oldest")} ]`}
          />

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
    </>
  );
};

export default SortDropDown;
