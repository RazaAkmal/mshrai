import React, { useState, useEffect } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../features/constants";
import { Col, Row } from "react-bootstrap";
import "react-phone-input-2/lib/bootstrap.css";
import OtpInput from "react18-input-otp";
import RegisterModel from "./RegisterModel";

const OtpVerify = (props) => {

  const { t } = useTranslation();
  const [validationError, setValidationError] = useState();
  const [seconds, setSeconds] = useState(59);
  const [openregistermodel, setOpenRegisterModel] = useState(false);
  const [otp, setOtp] = useState("");
  const [isValid, setValid] = useState(false);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const validate = () => {
    return otp.length === 4;
  };
  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
  }, [otp]);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  });
  const values = {
    phone: props.phoneNumber,
    otp: otp,
  };
  const openRegisterModel = () => {
    axios
      .post(`${apiUrl}/api/verify-otp`, values)
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
        setOpenRegisterModel(true)
        props.setOtpModel(false);
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
      });
  };

  return (
    <Modal
      className="custom-modal modal-register"
      centered
      scrollable
      show={props.otpmodel}
      onHide={() => {
        props.setOtpModel(false);
      }}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
      <Modal.Title>Welcome to</Modal.Title>
        <div className="modal-logo">
          <img src="./images/logo_color.png" alt="logo" />
        </div>
        
        <Row>
          <Col md="12">
            <Form.Group className="mb-3">
              <p style={{ textAlign: "center", marginTop: "7px" }}>
                We sent verification code to <br /> {props.phoneNumber}
              </p>
              <OtpInput
                containerStyle="containerStyle"
                inputStyle="otpInputStyle"
                autoComplete
                value={otp}
                numInputs={4}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          disabled={!isValid}
          onClick={openRegisterModel}
          className="w-100 mt-3 verifyBtn"
          size="lg"
          variant="primary"
          type="submit"
        >
          Verify & Proceed
        </Button>
        <p style={{ textAlign: "center", marginTop: "7px", fontSize: "13px" }}>
          We'll send you an SMS verification code
        </p>
        <div className="timer_div">
          <Modal.Title className="mt-3">
            <span style={{ fontSize: "1rem" }}>
              Don't receive the notification code ?
            </span>
            <br />
            <button className="mt-1 resendBtn">
              Resend SMS (00:{seconds})
            </button>
          </Modal.Title>
        </div>
        <RegisterModel
          openregistermodel={openregistermodel}
          setOpenRegisterModel={setOpenRegisterModel}
          loginHelper={props.loginHelper}
          phoneNumber={props.phoneNumber}
        />
      </Modal.Body>
    </Modal>
  );
};

export default OtpVerify;
