export default function Cars({ cars }) {
  return (
    <div className="row">
      {cars.map((car) => (
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="car_item">
            <div className="car_img">
              <img src={car.image} alt="" />
            </div>
            <div className="car_cont">
              <h3>{car.model}</h3>
              <p>
                <i className="far fa-clock"></i>
                {car.addDate}
              </p>
              <ul className="tags">
                <li>{car.year}</li>
                <li>{car.kilometers} كم</li>
              </ul>
              <p>
                <i className="fa fa-map-marker-alt"></i> {car.city}
              </p>
              <div className="bottom">
                <div className="price">
                  <span> السعر </span> {car.price} ريال
                </div>
                <img src={car.websiteImage} alt="" />
              </div>
            </div>
          </div>
          {/* <!--End Car ITem--> */}
        </div>
      ))}
    </div>
  );
}
