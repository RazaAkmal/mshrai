import { components } from "react-select";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Menu = (props) => {
  const isEnglish = localStorage.getItem("lang") === "en";
  const [pageonyear, setPageOnYear] = useState(1)
  const [pageLength, setPageLength] = useState(16)
  const [totalpages, setTotalPages] = useState(16)
  const endpage = Math.ceil(props.options.length/totalpages);

  const changePage  = (e, value) => {
    
    setPageOnYear(value)
    if(pageonyear >= value){
      
      setPageLength(pageLength / 2)

    } else if(pageonyear <= value ){
      setPageLength(pageLength * 2)
    }};
    
  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  }
  const [windowwidth, setWindowWidth] = useState(getWindowWidth());

  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(getWindowWidth());
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
      if (windowwidth >= 992) {
        setTotalPages(16)
        setPageLength(16)
      } else if (windowwidth >= 768){
        setTotalPages(12)
        setPageLength(12)
      } else if (windowwidth >= 576){
        setPageLength(8)
        setTotalPages(10)
      }
    }, [windowwidth])
    


  
  // const prevPage = (e) => {
  //   setPageOnYear(pageonyear - 1)
  //   setPageLength(pageLength / 2)
  //   e.preventDefault();
  // }
  // const nextPage = (e) => {
  //   setPageOnYear(pageonyear + 1)
  //   setPageLength(pageLength * 2)
  //   e.preventDefault()
  // }



  return (
    <>
      <components.Menu {...props}>
        <div>
          {props.selectProps.fetchingData ? (
            <span className="fetching">Fetching data...</span>
          ) : (
            <div className="selct-year">
              {props.options.map((item, index) => {
                let checkedValue = props.selectProps.value.some(
                  (element) => element?.label === item.label
                );
                return (
                  <>
                  { 
                  ((pageonyear === 1 && index < pageLength) || (pageonyear > 1 && index >= (pageLength / 2) && index < pageLength)) && 
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
                  </span> }

                  </>
                );
              })}
            </div>
          )}
          <div className="carsual-button">
            {/* <button
              className={"change-data"}
              onClick={prevPage}
              disabled={ pageonyear === 1 }  
            >
              {isEnglish ? <i class="fa fa-arrow-left"></i> : <i class="fa fa-arrow-right"></i>}
            </button>
            <button
              className={"change-data"}
              onClick={nextPage}
              disabled={pageonyear === endpage }
            >
              {isEnglish ? <i class="fa fa-arrow-right"></i> : <i class="fa fa-arrow-left"></i>}
            </button> */}
            <Stack spacing={4} className="year-paginat">
          <Pagination
            count={endpage}
            page={pageonyear}
            onChange={changePage}
            style={{backgroundColor:"white", color:'black'}}
          />
        </Stack>
          </div>
        </div>
      </components.Menu>
    </>
  );
};

export default Menu;