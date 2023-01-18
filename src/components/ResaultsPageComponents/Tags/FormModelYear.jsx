import { IoIosClose } from "react-icons/io";
const FormModelYear = ({ searchForm, _handleStartSearch }) => {
  return (
    <>
      {searchForm.model_year_end &&
      (searchForm.model_year_end < new Date().getFullYear() ||
        searchForm.model_year_start > 1990) ? (
        <li>
          {searchForm.model_year_start + "-" + searchForm.model_year_end}
          <span
            onClick={() => {
              _handleStartSearch("model_year", {
                model_year_start: 1990,
                model_year_end: new Date().getFullYear(),
              });
            }}
          >
            <IoIosClose />
          </span>
        </li>
      ) : (
        ""
      )}
    </>
  );
};

export default FormModelYear;
