import { Link } from "react-router-dom";
import { apiUrl } from "../features/constants";

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    let isValid = pattern.test(str);
    let src = isValid ? `${apiUrl}/upload/` : "";
  return src + str;
}


export default function Cars({ cars }) {

  return (
    <div className="row">
      {cars.length > 0 ? cars.map((car) => (
        <div className="col-lg-4 col-md-6 col-sm-6" key={car.id}>
          <Link to={{ pathname:car.url }} className="car_item" target="_blank" rel="noopener noreferrer">
            <div className="car_img">
              <img onError={(e)=>{e.target.onerror = null; e.target.src=`${apiUrl}/upload/default.jpg`}} src={car.image} alt="" id={car.id}/>
            </div>
            <div className="car_cont">
              <h3>{car.brand + " - " + car.brand_type}</h3>
              <p>
                <i className="far fa-clock"></i>
                {car.addDate}
              </p>
              <ul className="tags">
                <li>{car.model_year}</li>
                <li>{car.kilometer} كم</li>
              </ul>
              <p>
                <i className="fa fa-map-marker-alt"></i> {car.city}
              </p>
              <div className="bottom">
                <div className="price">
                  <span> السعر </span> {car.price} ريال
                </div>
                <img src={apiUrl+"/upload/"+car.source_image || "./images/olx.jpg"} alt="" />
              </div>
            </div>
          </Link>
          {/* <!--End Car ITem--> */}
        </div>
      )): (<div className="col-12 text-center d-flex justify-content-center align-items-center" style={{"minHeight": "50vh"}}>لا يوجد نتائج توافق بحثك</div>)}
    </div>
  );
}
