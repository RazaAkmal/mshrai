import React, { useState, } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../features/constants";
import { Col, Row } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import OtpVerify from "./OtpVerify";
import PhoneLogin from "./PhoneLogin";

function PhoneOtpModel(props) {
  const [validationError, setValidationError] = useState();
  const [phonelogin, setPhoneLogin] = useState(false);

  const [otpmodel, setOtpModel] = useState(false);
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: (values, { setSubmitting }) => {
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
          setOtpModel(true)
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
  const { values, handleChange, handleSubmit, errors } = formik;
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
          <div className="modal-logo">
            <img src="./images/logo_color.png" alt="logo" />
          </div>
          <Modal.Title>
            {t("formFields.createYourAccoutonMsh")}
            <p>
              {t("formFields.alreadyAccount")}{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  setPhoneLogin(true);
                  props.setRegisterModal(false);
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
                  {validationError?.phone && (
                    <span style={{ color: "red" }}>
                      {validationError.phone}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Button
              className="w-100 mt-3"
              size="lg"
              variant="primary"
              type="submit"
            >
              {t("formFields.verify")}
            </Button>
            
              
          </Form>
        </Modal.Body>
      </Modal>
      <OtpVerify phoneNumber={values.phone} otpmodel={otpmodel} setOtpModel={setOtpModel} loginHelper={props.loginHelper} />
      <PhoneLogin
        phonelogin={phonelogin}
        setRegisterModal={props.setRegisterModal}
        setPhoneLogin={setPhoneLogin}
        loginHelper={props.loginHelper}
      />

    </>
  );
}

export default PhoneOtpModel;
