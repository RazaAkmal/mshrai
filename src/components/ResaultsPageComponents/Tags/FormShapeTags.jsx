import { IoIosClose } from "react-icons/io";
const FormShapeTags = ({
  searchForm,
  searchInputs,
  _handleStartSearch,
  isEnglish,
}) => {
  return (
    <>
      {searchForm.shape_id && searchForm.shape_id.length > 0
        ? searchInputs.shapes.map((shape, index) => {
            return searchForm.shape_id.includes(shape.id) ? (
              <li key={"searchShapes" + index}>
                {isEnglish ? shape.title_en : shape.title}
                <span
                  onClick={() => {
                    let shapes = [...searchForm.shape_id];
                    if (shapes.includes(shape.value)) {
                      shapes.splice(shapes.indexOf(shape.value), 1);
                    }
                    _handleStartSearch("shape_id", shapes);
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

export default FormShapeTags;
