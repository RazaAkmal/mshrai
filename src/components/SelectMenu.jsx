import { components } from "react-select";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import _ from "lodash";

const Menu = (props) => {
  const [pageonyear, setPageOnYear] = useState(1);
  const [totalpages, setTotalPages] = useState(16);
  const [optionsArray, setOptionsArray] = useState(props.options);
  const endpage = Math.ceil(props.options.length / totalpages);

  const changePage = (e, value) => {
    setPageOnYear(value);
  };

  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  };
  const [windowwidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowwidth >= 992) {
      let chunkArray = _.chunk(optionsArray, 16);
      setOptionsArray(chunkArray);
      setTotalPages(16);
    } else if (windowwidth >= 768) {
      setTotalPages(12);
      let chunkArray = _.chunk(optionsArray, 12);
      setOptionsArray(chunkArray);
    } else if (windowwidth < 768) {
      setTotalPages(8);
      let chunkArray = _.chunk(optionsArray, 8);
      setOptionsArray(chunkArray);
    }
  }, [windowwidth]);

  return (
    <>
      <components.Menu {...props}>
        <div>
          <div className="selct-year">
            {_.isArray(optionsArray[pageonyear - 1]) &&
              optionsArray[pageonyear - 1].map((item, index) => {
                let checkedValue = props.selectProps.value.some(
                  (element) => element?.label === item.label
                );
                return (
                  <>
                    <span className="fetching">
                      <Form.Check
                        checked={checkedValue}
                        scrollable={true}
                        id={item.label}
                        value={checkedValue}
                        onChange={() => props.selectProps.onChange(item)}
                        type="checkbox"
                      />
                      <span> {item.value}</span>
                    </span>
                  </>
                );
              })}
          </div>
          <div className="carsual-button">
            <Stack spacing={4} className="year-paginat">
              <Pagination
                count={endpage}
                page={pageonyear}
                onChange={changePage}
                style={{ backgroundColor: "white", color: "black" }}
              />
            </Stack>
          </div>
        </div>
      </components.Menu>
    </>
  );
};

export default Menu;
