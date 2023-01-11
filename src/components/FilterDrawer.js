import React from 'react';
import Drawer from '@mui/material/Drawer';
import Filters from './filters';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const FilterDrawer = (props) => {

  const selectedLng = useSelector((state) => state.search.language);

  return (
    <div>
   <Drawer
          anchor={selectedLng === 'en' ? "left" : "right"}
          open={props.openfilter}
          onClose={()=> props.setOpenFilter(false)  }
        >
                <Button
                  disableRipple={true}
                  className="close-drawer-btn"
                  onClick={()=>props.setOpenFilter(false)}
                >
                  {" "}
                  <img
                    style={{ width: "30px" }}
                    src="./images/close.svg"
                    alt=""
                  />{" "}
                </Button>
            {/* <button
          className="close-drawer-btn"
          type="button"
          onClick={()=>props.setOpenFilter(false)}
        >
          <i className="fa fa-times"></i>
        </button> */}

          <Filters windowwidth={props.windowwidth} closeFilterMenuHandle={()=> props.setOpenFilter(false)}
                    handleStartSearch={(type, value, value_obj) =>
                      props.handleStartSearch(type, value, value_obj)
                    }
                    searchState={props.searchState}/>
        </Drawer>
  </div>
  )
}

export default FilterDrawer