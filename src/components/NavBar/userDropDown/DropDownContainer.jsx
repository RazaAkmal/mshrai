import {
  faCommentAlt,
  faEye,
  faEyeSlash,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Dropdown } from "react-bootstrap";
import DropDownItemContainer from "./DropDownItemContainer";

const DropDownContainer = ({ t, selectedLng, userDetails, logoutHandler }) => {
  const styleObject = { color: "#00CEBD" };
  return (
    <>
      <Dropdown className="login-drop">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <FontAwesomeIcon icon={faUser} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <DropDownItemContainer
            href="#/action-1"
            className="user-name"
            icon={faUser}
            color="white"
          >
            {t("hiText")}, {userDetails && userDetails?.name}
          </DropDownItemContainer>
          <Dropdown.Divider />
          <DropDownItemContainer href="#/action-2" icon={faUser}>
            {selectedLng === "en" ? (
              <>
                {t("profileMenu.MyProfile")}{" "}
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
              </>
            ) : (
              <>
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
                {t("profileMenu.MyProfile")}{" "}
              </>
            )}
          </DropDownItemContainer>
          <DropDownItemContainer href="#/action-3" icon={faEye}>
            {selectedLng === "en" ? (
              <>
                {t("profileMenu.MyRequest")}{" "}
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
              </>
            ) : (
              <>
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
                {t("profileMenu.MyRequest")}{" "}
              </>
            )}
          </DropDownItemContainer>
          <DropDownItemContainer href="#/action-3" icon={faStar}>
            {selectedLng === "en" ? (
              <>
                {t("profileMenu.RelatedPosts")}{" "}
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
              </>
            ) : (
              <>
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
                {t("profileMenu.RelatedPosts")}{" "}
              </>
            )}
          </DropDownItemContainer>
          <DropDownItemContainer href="#/action-3" icon={faCommentAlt}>
            {selectedLng === "en" ? (
              <>
                {t("profileMenu.CommentedPosts")}{" "}
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
              </>
            ) : (
              <>
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
                {t("profileMenu.CommentedPosts")}{" "}
              </>
            )}
          </DropDownItemContainer>
          <DropDownItemContainer href="#/action-3" icon={faEyeSlash}>
            {selectedLng === "en" ? (
              <>
                {t("profileMenu.HiddenPosts")}{" "}
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
              </>
            ) : (
              <>
                <span style={styleObject}>{t("profileMenu.commingSoon")}</span>{" "}
                {t("profileMenu.HiddenPosts")}{" "}
              </>
            )}
          </DropDownItemContainer>
          <Dropdown.Divider />
          <DropDownItemContainer onClick={logoutHandler}>
            {t("profileMenu.LogOut")}
          </DropDownItemContainer>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DropDownContainer;
