import { components } from "react-select";

const Option = (props) => {
  return (
    <div style={{display: 'flex'}}>
      <components.Option {...props} ><div style={{color: 'red'}}>{props.children}</div></components.Option>
    </div>
  );
};

export default Option;