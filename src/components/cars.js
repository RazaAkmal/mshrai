import { Link } from "react-router-dom";
import { apiUrl } from "../features/constants";
import { MdOutlineLocationOn } from 'react-icons/md'
import moment from 'moment';

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

  const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])

  
  const getDate = (date) => {

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const index = date.indexOf(' ')
    const dateSlice = date.slice(0, index)

    const dateArray = dateSlice.split('-')
    const dateOne = moment([year, month, day]);
    const dateTwo = moment([Number(dateArray[0]), Number(dateArray[1]), Number(dateArray[2])]);
    const resultDays = dateOne.diff(dateTwo, 'days')
    const resultWeek = dateOne.diff(dateTwo, 'week')
    const resultMonth = dateOne.diff(dateTwo, 'month')
    const arabicDays = e2a(resultDays.toString())
    const arabicWeek = e2a(resultWeek.toString())
    const arabicMonth = e2a(resultMonth.toString())
    let message
    if (resultMonth > 0) {
      return  'أكثر من شهر'
    } else if (resultWeek > 0) {
      let morethan = false
        if (resultDays > 7 &&  resultDays !== 14 && resultDays !== 21 && resultDays !== 28) {
          morethan = true
        }
        if (resultWeek > 0 && !morethan) {
          message = "منذ اسبوع "
        }
        if (resultWeek > 0 && morethan) {
          message = "أكثر من أسبوع"
        }
        if (resultWeek > 1) {
          message = "اسبوعين واكثر"
        }
        if (resultWeek > 2) {
          message = `${arabicWeek} اسابيع واكثر`
        }
      return message
    } else if (resultDays > 0) {
        message = "قبل يوم"
        if (resultDays > 1) {
          message = "قبل يومين"
        }
        if (resultDays > 2) {
          message = ` قبل ${arabicDays} ايام `
        }
        return message
    } else {
      return 'أضيف اليوم'
    }
  }


  return (
    <div className="row">
      {cars.length > 0 ? cars.map((car) => (
        <div className="col-lg-4 col-md-6 col-sm-6" key={car.id}>
          <Link to={{ pathname:car.url }} className="car_item" target="_blank" rel="noopener noreferrer">
            <div className="car_img">
              <img onError={(e)=>{e.target.onerror = null; e.target.src=`${apiUrl}/upload/default.jpg`}} src={car.image2 ? car.image2 : `${apiUrl}/upload/default.jpg`} alt="" id={car.id}/>
            </div>
            <div className="car_cont">
              <h3>{car.brand + " - " + car.brand_type}</h3>
              <p>
                <i className="far fa-clock"></i>
                {getDate(car.date)}
              </p>
              <ul className="tags">
                <li>{car.model_year}</li>
                <li>{car.kilometer} كم</li>
              </ul>
              <p>
              <MdOutlineLocationOn /> {car.city}
              </p>
              <div className="bottom">
                <div className="price">
                  <span> السعر </span> {!car.price ? (car.price2 ? car.price2 : "لايوجد سعر") : car.price === -1 ? "على السوم" : car.price + " ريال"} 
                </div>
                <img src={apiUrl+"/upload/"+car.source_image} alt="" />
              </div>
            </div>
          </Link>
          {/* <!--End Car ITem--> */}
        </div>
      )): (<div className="col-12 text-center d-flex justify-content-center align-items-center" style={{"minHeight": "50vh"}}>لا يوجد نتائج توافق بحثك</div>)}
    </div>
  );
}
