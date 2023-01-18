import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Dropdown } from "react-bootstrap";

const DropDownItemContainer = ({
  href,
  icon,
  color,
  children,
  className,
  onClick,
}) => {
  return (
    <>
      <Dropdown.Item href={href} className={className} onClick={onClick}>
        {icon && <FontAwesomeIcon icon={icon} color={color} />}
        {children}
      </Dropdown.Item>
    </>
  );
};

export default DropDownItemContainer;
