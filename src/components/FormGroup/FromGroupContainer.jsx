import React from "react";
import { Form } from "react-bootstrap";

const FromGroupContainer = ({ label, children, Error }) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        {children}
        {Error && <span style={{ color: "red" }}>{Error}</span>}
      </Form.Group>
    </>
  );
};

export default FromGroupContainer;
