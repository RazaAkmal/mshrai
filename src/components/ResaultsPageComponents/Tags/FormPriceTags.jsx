import { IoIosClose } from "react-icons/io";
const FormPriceTags = ({ searchForm, _handleStartSearch }) => {
  return (
    <>
      {searchForm.price && searchForm.price.length > 0
        ? searchForm.price.map((price, index) => {
            return (
              <li style={{ direction: "ltr" }} key={"searchcities" + index}>
                {price}
                <span
                  onClick={() => {
                    let prices = [...searchForm.price];
                    prices.splice(prices.indexOf(price), 1);
                    _handleStartSearch("price", prices);
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

export default FormPriceTags;
