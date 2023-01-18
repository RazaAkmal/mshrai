import React from "react";
import { Modal } from "react-bootstrap";

const ModalTitleContainer = ({ setPhoneLogin, setRegisterModal, t }) => {
  return (
    <>
      <Modal.Title>
        {t("formFields.createYourAccoutonMsh")}
        <p>
          {t("formFields.alreadyAccount")}
          {/* <span style={{ color: "darkgrey" }}>? </span> */}{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              setPhoneLogin(true);
              setRegisterModal(false);
            }}
          >
            {t("formFields.loginLink")}
          </span>
        </p>
      </Modal.Title>
    </>
  );
};

export default ModalTitleContainer;
