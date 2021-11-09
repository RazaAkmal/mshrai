import { Link } from "react-router-dom";

export default function Cars({ cars }) {
  return (
    <div className="row">
      {cars.length > 0 ? cars.map((car) => (
        <div className="col-lg-4 col-md-6 col-sm-6" key={car.id}>
          <Link to={car.url} className="car_item" target="_blank" rel="noopener noreferrer">
            <div className="car_img">
              <img src={"http://sayarty.inzox.co/public/upload/"+car.image} alt="" />
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
                <img src={"http://sayarty.inzox.co/public/upload/"+car.source_image || "./images/olx.jpg"} alt="" />
              </div>
            </div>
          </Link>
          {/* <!--End Car ITem--> */}
        </div>
      )): (<div className="col-12 text-center d-flex justify-content-center align-items-center" style={{"minHeight": "50vh"}}>لا يوجد نتائج توافق بحثك</div>)}
    </div>
  );
}
