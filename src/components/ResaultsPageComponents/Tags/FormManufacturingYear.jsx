import { IoIosClose } from "react-icons/io";
const FormManufacturingYear = ({ searchForm, _handleStartSearch }) => {
  return (
    <>
      {searchForm.manufacturing_year && searchForm.manufacturing_year.length > 0
        ? searchForm.manufacturing_year.map((year, index) => (
            <li>
              {year}
              <span
                onClick={() => {
                  _handleStartSearch("manufacturing_year", year);
                }}
              >
                <IoIosClose />
              </span>
            </li>
          ))
        : ""}
    </>
  );
};

export default FormManufacturingYear;
