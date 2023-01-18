import { IoIosClose } from "react-icons/io";
const FormKilometerTags = ({ searchForm, _handleStartSearch }) => {
  return (
    <>
      {searchForm.kilometer && searchForm.kilometer.length > 0
        ? searchForm.kilometer.map((kilometer, index) => {
            return (
              <li style={{ direction: "ltr" }} key={"searchcities" + index}>
                {kilometer}
                <span
                  onClick={() => {
                    let kilometers = [...searchForm.kilometer];
                    kilometers.splice(kilometers.indexOf(kilometer), 1);
                    _handleStartSearch("kilometer", kilometers);
                  }}
                >
                  <IoIosClose />
                </span>
              </li>
            );
          })
        : ""}
    </>
  );
};

export default FormKilometerTags;
