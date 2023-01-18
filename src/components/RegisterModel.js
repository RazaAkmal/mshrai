import React, { useState } from "react";
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
import { apiUrl } from "../features/constants";
import { Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import PhoneLogin from "./PhoneLogin";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { notifySucess } from "../helpers";
import FromGroupContainer from "./FormGroup/FromGroupContainer";
import CustomToggle from "./RegisterComponents/CustomToggle";
import ModalTitleContainer from "./RegisterComponents/ModalTitleContainer";
import ModalLogo from "./Modal/ModalLogo";

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
          notifySucess(res.data.message);

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
          console.log(errors, "errors");
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

  return (
    <>
      <Modal
        className="custom-modal modal-register"
        centered
        scrollable
        show={props.registerModal}
        onHide={() => {
          props.setRegisterModal(false);
          setValidationError(null);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ModalLogo />
          <ModalTitleContainer
            t={t}
            setPhoneLogin={setPhoneLogin}
            setRegisterModal={props.setRegisterModal}
          />
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="12">
                <FromGroupContainer
                  label={t("formFields.phonenumber")}
                  Error={validationError?.phone}
                >
                  <PhoneInput
                    country="sa"
                    preferredCountries={["sa", "ae", "qa", "kw", "om", "bh"]}
                    value={values.phone}
                    autoFormat={false}
                    inputProps={{
                      name: "phone",
                      id: "phone",
                      required: true,
                      autoFocus: true,
                      onChange: handleChange,
                    }}
                  ></PhoneInput>
                </FromGroupContainer>
              </Col>
            </Row>
            <FromGroupContainer
              label={t("formFields.password")}
              Error={validationError?.password}
            >
              <Form.Control
                type="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                id="password"
              />
            </FromGroupContainer>

            <Accordion>
              <Card style={{ display: "contents" }}>
                <CustomToggle
                  eventKey="1"
                  shoeaccor={shoeaccor}
                  setShowAccor={setShowAccor}
                >
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
                        <FromGroupContainer
                          label={t("formFields.Username")}
                          Error={validationError?.name}
                        >
                          <Form.Control
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            name="name"
                            id="name"
                          />
                        </FromGroupContainer>
                      </Col>
                      <Col md="6">
                        <FromGroupContainer
                          label={t("formFields.Email")}
                          Error={validationError?.email}
                        >
                          <Form.Control
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            id="email"
                          />
                        </FromGroupContainer>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <FromGroupContainer
                          label={t("formFields.City")}
                          Error={validationError?.city}
                        >
                          <Form.Control
                            type="text"
                            value={values.city}
                            onChange={handleChange}
                            name="city"
                            id="city"
                          />
                        </FromGroupContainer>
                      </Col>

                      <Col md="6">
                        <FromGroupContainer
                          label={t("formFields.dateofbirth")}
                          Error={validationError?.dob}
                        >
                          <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            onCalendarClose={handleCalendarClose}
                            onCalendarOpen={handleCalendarOpen}
                          />
                        </FromGroupContainer>
                      </Col>
                    </Row>
                    <Col md="6">
                      <FromGroupContainer
                        label={t("formFields.Gender")}
                        Error={validationError?.gender}
                      >
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
                      </FromGroupContainer>
                    </Col>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {validationError?.user && (
              <span style={{ color: "red" }}>{validationError.user}</span>
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
        setRegisterModal={props.setRegisterModal}
        setPhoneLogin={setPhoneLogin}
        loginHelper={props.loginHelper}
      />
    </>
  );
};
export default RegisterModel;
