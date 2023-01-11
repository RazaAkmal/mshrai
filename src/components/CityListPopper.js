import React, { useState, useEffect } from "react";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";



export const ProvienceCity = (props) => {
  const { t } = useTranslation();

  const isEnglish = localStorage.getItem("lang") === "en";
  const [filterCity, setFilterCity] = useState("");

  const filterValue = (val, filter) => {
    if (isEnglish) {
      return (
        val.city_en && val.city_en.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return val.city && val.city.toLowerCase().includes(filter.toLowerCase());
    }
  };

  const closePoper = (e) => {
    props.setOpen(!props.open);
    props.setShowWrapperDiv(false);
  };
console.log(props.searchState.city_id.includes(
  29
), "props.searchState.city_id")

  return <>
  <div className="city-header">
                {/* <Button disableRipple={true} className="closeButton">Clear</Button> */}
                <Typography style={{ fontSize: "20px" }}>Cities</Typography>
                <Button
                  disableRipple={true}
                  className="clearButton"
                  onClick={closePoper}
                >
                  {" "}
                  <img
                    style={{ width: "20px" }}
                    src="./images/close.svg"
                    alt=""
                  />{" "}
                </Button>
              </div>
              <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                <input
                  placeholder={t("search.searchForCity")}
                  type="text"
                  style={{ textAlign: isEnglish ? "left" : "right" }}
                  className="form-control"
                  onChange={(e) => setFilterCity(e.target.value)}
                />
              </div>

              {props.searchInputs.provincesOption[
                props.selectedProvience === "UAE" ? "" : props.selectedProvience
              ]
                .filter((v) => filterValue(v, filterCity))
                .map((item, index) => {
                  return (
                    <FormGroup
                      className={isEnglish ? "checkbox-en" : "checkbox-ar"}
                      style={{ padding: "5px 20px 5px 20px" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            disableRipple={true}
                            value={item.id}
                            onChange={(v) => props.addValue("city_id", item.id)}
                            checked={props.searchState.city_id.includes(
                              item.id
                            )}
                          />
                        }
                        label={isEnglish ? item.city_en : item.city}
                      />
                      <hr style={{ margin: "1px" }} />
                    </FormGroup>
                  );
                })}
  </>
}


const CityListPopper = (props) => {


  const closeDivWrapper = () => {
    props.setOpen(false);
    props.setShowWrapperDiv(false);
  };




  return (
    <>
      <div
        style={{
          display: props.showWrapperDiv ? "block" : "none",
        }}
        className="section-div-overlay"
        onClick={closeDivWrapper}
      ></div>
      <Popper
        className="form-group-poper"
        open={props.open}
        anchorEl={props.anchorEl}
        placement={props.placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ boxShadow: "none" }}>
              <ProvienceCity {...props} />
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
export default CityListPopper;
