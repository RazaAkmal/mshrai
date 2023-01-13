import React from 'react';
import Drawer from '@mui/material/Drawer';
import {ProvienceCity} from './CityListPopper';
import { useSelector } from 'react-redux';

const MobileCityDrawer = (props) => {

    const selectedLng = useSelector((state) => state.search.language);

  return (
 <div>
   <Drawer
     PaperProps={{
      sx: {
        width: '100%',
      }
    }}
          anchor={ selectedLng === "en" ? "left" : "right" }
          open={props.open}
        >

<ProvienceCity {...props} />
        </Drawer>
  </div>
  )
}

export default MobileCityDrawer