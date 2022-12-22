import React, { useEffect, useState, useSelector } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../features/constants";
import { Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import PhoneLogin from "./PhoneLogin";
import Loader from "./loader";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const RegisterModel = (props) => {
  const [validationError, setValidationError] = useState();
  const [date, setDate] = useState(new Date());
  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");
  const [shoeaccor, setShowAccor] = useState(false);
  const [phonelogin, setPhoneLogin] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      let formatedDate = moment(date).format("YYYY-MM-DD");
      values.dob = formatedDate;
      axios
        .post(`${apiUrl}/api/register`, values)
        .then((res) => {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSubmitting(false);
          props.setRegisterModal(false);
          if (res) {
            props.loginHelper(res.data.data.token, res.data.data.user);
          }
        })
        .catch((err) => {
          const errors = {};
          if (err.response?.status === 403) {
            Object.keys(err.response.data.errors).forEach((key) => {
              errors[key] = err.response.data.errors[key];
            });
          }
          console.log(errors, 'errors')
          setValidationError(errors);
          setSubmitting(false);
        });
    },
  });
  const { t } = useTranslation();
  const {
    values,
    resetForm,
    handleChange,
    isSubmitting,
    handleSubmit,
    errors,
  } = formik;

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => setShowAccor(!shoeaccor)
      // console.log('totally custom!'),
    );

    return (
      <button
        type="button"
        style={{
          border: "none",
          display: "-webkit-box",
          backgroundColor: "#f7f9fa",
        }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  };
  return (
    <>
      <Modal
        className="custom-modal modal-register"
        centered
        scrollable
        show={props.registerModal}
        onHide={() => {
        props.setRegisterModal(false);
        setValidationError(null)

        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-logo">
            <img src="./images/logo_color.png" alt="logo" />
          </div>
          <Modal.Title>
            {t("formFields.createYourAccoutonMsh")}
            <p>
            {t("formFields.alreadyAccount")}
              {/* <span style={{ color: "darkgrey" }}>? </span> */}
              {' '}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  setPhoneLogin(true);
                  props.setRegister(false);
                }}
              >
                {t("formFields.loginLink")}
              </span>
            </p>
          </Modal.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="12">
                <Form.Group className="mb-3">
                  <Form.Label>{t("formFields.phonenumber")}</Form.Label>
                  {/* <Form.Control
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    name="phone"
                    id="phone"
                  /> */}
                  <PhoneInput
                    country="sa"
                    preferredCountries={["sa", "ae", "qa", "kw", "om", "bh"]}
                    value={values.phone}
                    autoFormat	={false}
                    inputProps={{
                      name: "phone",
                      id: "phone",
                      required: true,
                      autoFocus: true,
                      onChange: handleChange,
                    }}
                  ></PhoneInput>
                  {validationError?.phone && (
                    <span style={{ color: "red" }}>
                      {validationError.phone}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>{t("formFields.password")}</Form.Label>
              <Form.Control
                type="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                id="password"
              />
              {validationError?.password && (
                <span style={{ color: "red" }}>{validationError.password}</span>
              )}
            </Form.Group>
            <Accordion>
              <Card style={{ display: "contents" }}>
                <CustomToggle eventKey="1">
                  {" "}
                  {shoeaccor ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}{" "}
                  Add More
                </CustomToggle>

                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Row>
                      <Col md="6">
                        <Form.Group className="mb-3">
                          <Form.Label>{t("formFields.Username")}</Form.Label>
                          <Form.Control
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            name="name"
                            id="name"
                          />
                          {validationError?.name && (
                            <span style={{ color: "red" }}>
                              {validationError.name}
                            </span>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group className="mb-3">
                          <Form.Label>{t("formFields.Email")}</Form.Label>
                          <Form.Control
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            id="email"
                          />
                          {validationError?.email && (
                            <span style={{ color: "red" }}>
                              {validationError.email}
                            </span>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <Form.Group className="mb-3">
                          <Form.Label>{t("formFields.City")}</Form.Label>
                          <Form.Control
                            type="text"
                            value={values.city}
                            onChange={handleChange}
                            name="city"
                            id="city"
                          />
                          {validationError?.city && (
                            <span style={{ color: "red" }}>
                              {validationError.city}
                            </span>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md="6">
                        <Form.Group className="mb-3">
                          <Form.Label>{t("formFields.dateofbirth")}</Form.Label>
                          <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            onCalendarClose={handleCalendarClose}
                            onCalendarOpen={handleCalendarOpen}
                          />
                          {validationError?.dob && (
                            <span style={{ color: "red" }}>
                              {validationError.dob}
                            </span>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <Form.Label>{t("formFields.Gender")}</Form.Label>
                        <Form.Select
                          size="lg"
                          name="gender"
                          id="gender"
                          value={values.gender}
                          onChange={handleChange}
                        >
                          <option disabled selected hidden></option>
                          <option value="male">{t("formFields.Male")}</option>
                          <option value="female">
                            {t("formFields.Female")}
                          </option>
                        </Form.Select>
                        {validationError?.gender && (
                          <span style={{ color: "red" }}>
                            {validationError.gender}
                          </span>
                        )}
                      </Form.Group>
                    </Col>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {validationError?.user && (
                    <span style={{ color: "red" }}>
                      {validationError.user}
                    </span>
                  )}
            <Button
              className="w-100 mt-3"
              size="lg"
              variant="primary"
              type="submit"
            >
              {t("formFields.createaccount")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <PhoneLogin
        phonelogin={phonelogin}
        showRegister={props.setRegister}
        setPhoneLogin={setPhoneLogin}
        loginHelper={props.loginHelper}
      />
      
      {/* <PhoneLogin setPhoneLogin={setPhoneLogin} phonelogin={phonelogin} loginHelper={loginHelper} /> */}
    </>
  );
};

export default RegisterModel;
