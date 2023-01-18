import { IoIosClose } from "react-icons/io";
const FormCityTags = ({
  searchForm,
  searchInputs,
  _handleStartSearch,
  isEnglish,
}) => {
  return (
    <>
      {searchForm.city_id && searchForm.city_id.length > 0
        ? searchInputs.cityOptions.map((city, index) => {
            return searchForm.city_id.includes(city.value) ? (
              <li key={"searchcities" + index}>
                {isEnglish ? city.label_en : city.label}
                <span
                  onClick={() => {
                    let cities = [...searchForm.city_id];
                    if (cities.includes(city.value)) {
                      cities.splice(cities.indexOf(city.value), 1);
                    }
                    _handleStartSearch("city_id", cities);
                  }}
                >
                  <IoIosClose />
                </span>
              </li>
            ) : (
              false
            );
          })
        : ""}
    </>
  );
};

export default FormCityTags;
