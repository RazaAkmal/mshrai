import React, { useState } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from "formik";
import axios from "axios";
import { apiUrl } from "../features/constants";
import { notifySucess } from "../helpers";
import FromGroupContainer from "./FormGroup/FromGroupContainer";
import ModalLogo from "./Modal/ModalLogo";

const PhoneLogin = (props) => {
  const { t } = useTranslation();
  const [validationErrorLogIn, setValidationErrorLogIn] = useState();
  const [isInValidCredentials, setIsInvalidCredentials] = useState(false);

  return (
    <>
      <Modal
        className="custom-modal"
        centered
        show={props.phonelogin}
        onHide={() => {
          props.setPhoneLogin(false);
          setValidationErrorLogIn(null);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ModalLogo />
          <Modal.Title>{t("welcomeMessage")}</Modal.Title>
          <Formik
            initialValues={{ phone: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.phone) {
                errors.phone = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              axios
                .post(`${apiUrl}/api/login`, values)
                .then((res) => {
                  props.setPhoneLogin(false);
                  notifySucess(res.data.message);
                  console.log("res befoer loop", res.data);

                  if (res.data.data.token) {
                    console.log("res", res.data);
                    props.loginHelper(res.data.data.token, res.data.data.user);
                    setSubmitting(false);
                    setValidationErrorLogIn(undefined);
                  }
                  return;
                })
                .catch((err) => {
                  console.log(err);
                  const errors = {};
                  if (err.response?.status === 403) {
                    Object.keys(err.response.data.errors).forEach((key) => {
                      errors[key] = err.response.data.errors[key];
                    });
                  }
                  setValidationErrorLogIn(errors);
                  if (
                    err.response?.data &&
                    typeof err.response?.data?.errors === "string"
                  ) {
                    console.log("invalid credentials");
                    setIsInvalidCredentials(true);
                  } else {
                    console.log("something went wrong");
                  }
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              resetForm,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FromGroupContainer
                  label={t("formFields.phonenumber")}
                  Error={validationErrorLogIn?.phone}
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
                <FromGroupContainer
                  label={t("formFields.password")}
                  Error={validationErrorLogIn?.user}
                >
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </FromGroupContainer>

                <Button
                  className="w-100 mt-2"
                  size="lg"
                  variant="primary"
                  disabled={false}
                  type="submit"
                >
                  {t("Login")}
                </Button>
                <div className="text-center mt-2">
                  <span
                    className="form-link"
                    onClick={() => {
                      props.setPhoneLogin(false);
                      resetForm();
                      setValidationErrorLogIn(null);
                      props.setRegisterModal(true);
                    }}
                  >
                    {t("register")}
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhoneLogin;
