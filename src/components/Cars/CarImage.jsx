import { apiUrl } from "../../features/constants";

const CarImage = ({ image, id, srcImage }) => {
  return (
    <>
      <div className="car_img">
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${apiUrl}/img/default.jpg`;
          }}
          src={image ? image : `${apiUrl}/img/default.jpg`}
          alt=""
          id={id}
        />
        <div className="source_logo_mobile">
          <img src={apiUrl + "/upload/" + srcImage} alt="" />
        </div>
      </div>
    </>
  );
};

export default CarImage;
