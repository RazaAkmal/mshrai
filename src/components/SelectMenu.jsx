import { components } from "react-select";
import { Form } from "react-bootstrap";

const Menu = (props) => {

  return (
    <>
      <components.Menu {...props}>
        <div>
          {props.selectProps.fetchingData ? (
            <span className="fetching">Fetching data...</span>
          ) : (
            <div className="selct-year">
              {props.options.map((item) => {
                let checkedValue = props.selectProps.value.some(
                  (element) => element?.label === item.label
                );
                return (
                  <span className="fetching">
                    <Form.Check
                      checked={checkedValue}
                      id={item.label}
                      value={checkedValue}
                      onChange={() => props.selectProps.onChange(item)}
                      type="checkbox"
                    />
                    <span> {item.value}</span>
                  </span>
                );
              })}
            </div>
          )}
          <div className="carsual-button">
            <button
              className={"change-data"}
              onClick={props.selectProps.changeOptionsData}
            >
              <i class="fa fa-arrow-left"></i>
            </button>
            <button
              className={"change-data"}
              onClick={props.selectProps.changeOptionsData}
            >
              <i class="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </components.Menu>
    </>
  );
};

export default Menu;