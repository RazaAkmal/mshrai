import React, { useEffect, useState, useSelector } from "react";
import "./App.css";
import ReactGA from 'react-ga';
import {
  Switch,
  Route,
  useHistory,
  Router,
  useLocation,
} from "react-router-dom";
import Resault from "./pages/resaults";
import Search from "./pages/search";
import Feedback from "./components/feedback";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Cookies from "js-cookie";
import uniqid from "uniqid";
import "./i18n";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { updateMomentLocaleToArabic } from "./helpers/helpers";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacebookLogin from "./components/FacebookLogin";
import TwitterLogins from "./components/TwitterLogin";
import {
  faEnvelope,
  faUser,
  faEye,
  faStar,
  faCommentAlt,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./components/loader";
import { apiUrl } from "./features/constants";
import { Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import GoogleLog from "./components/GoogleLogin";

const lngs = {
  ar: { nativeName: "Arabic" },
  en: { nativeName: "English" },
};

const App = () => {
  const { t, i18n } = useTranslation();
  const [selectedLng, setSelectedLng] = useState(i18n.language);
  const [state, setState] = useState({
    isOpen: false,
  });
  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
  const toggleOpen = () => setState({ isOpen: !state.isOpen });

  const [login, showLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [continueWithEmail, showContinueWithEmailModal] = useState(false);
  const [validationError, setValidationError] = useState();
  const [validationErrorLogIn, setValidationErrorLogIn] = useState();
  const [isInValidCredentials, setIsInvalidCredentials] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [date, setDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const getID = Cookies.get("id");
    if (!getID) {
      let userId = uniqid("userId-");
      Cookies.set("id", userId);
    }
    ReactGA.initialize('UA-248573380-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userDetails");

    if (token) {
      setIsLoggedIn(true);
    }
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const loginFrom = localStorage.getItem("loginFrom");
    if (loginFrom === "twitter") {
      twitterLogin(location.search);
    } else if(loginFrom==="google") {
      googleFn(location.search);
    }
  }, [location.search]);

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  const loginHelper = (token, userData) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userDetails", JSON.stringify(userData));
    setUserDetails(userData);
    setIsLoggedIn(true);
    setIsInvalidCredentials(false);
    resetFormLogin();
    setValidationErrorLogIn(undefined);
    history.push("/results");
    // setSubmitting(false);
    showLogin(false);
  };

  // FOR GOOGLE LOGIN
  const googleFn = async (val) => {
    localStorage.removeItem("loginFrom");
    const res = await axios(
      `${apiUrl}/api/auth/callback/google${val}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (res.data.data.token) {
      loginHelper(res.data.data.token, res.data.data.user);
    }
  };

  //FOR FACEBOOKLOGIN

  const fbLogin = (data) => {
    const responseData = data.data.data;
    if (responseData.token.access_token) {
      loginHelper(responseData.token.access_token, responseData.user);
    }
  };
  // FOR TWITTER
  const twitterLogin = async (val) => {
    localStorage.removeItem("loginFrom");
    try{
      const res = await axios(
        `${apiUrl}/api/auth/callback/twitter${val}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (res) {
        loginHelper(res.data.data.token, res.data.data.user);
        // window.close();
      }
    }catch(err){
      console.log(err);
      // window.close();
    }

  };

  // TO LOGOUT
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setIsLoggedIn(false);
    setUserDetails(null);
    toast.success(t("logoutSuccessfullyMessage"), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/");
  };

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
          setShowRegister(false);
          if (res) {
              loginHelper(res.data.data.token, res.data.data.user);
          }
        })
        .catch((err) => {
          const errors = {};
          if (err.response.status === 403) {
            Object.keys(err.response.data.errors).forEach((key) => {
              errors[key] = err.response.data.errors[key];
            });
          }
          setValidationError(errors);
          setSubmitting(false);
        });
    },
  });

  //FOR LOGIN ////////////////////////////////////////////////////
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      // let formatedDate = moment(date).format("YYYY-MM-DD");
      // values.dob = formatedDate;
      axios
        .post(`${apiUrl}/api/login`, values)
        .then((res) => {
          showContinueWithEmailModal(false);
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (res.data.data.token) {
            loginHelper(res.data.data.token, res.data.data.user);
            setSubmitting(false);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
          const errors = {};
          if (err.response.status === 403) {
            Object.keys(err.response.data.errors).forEach((key) => {
              errors[key] = err.response.data.errors[key];
            });
          }
          setValidationErrorLogIn(errors);
          if (
            err.response.data &&
            typeof err.response.data.errors === "string"
          ) {
            console.log("invalid credentials");
            setIsInvalidCredentials(true);
          } else {
            console.log("something went wrong");
          }
          // setSubmitting(false);
        });
    },
  });

  const {
    values: valuesLogin,
    resetForm: resetFormLogin,
    handleChange: handlerChangeLogin,
    isSubmitting: isSubmittingLogin,
    handleSubmit: handleSubmitLogin,
    errors: errorLogin,
  } = formikLogin;
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
      <div className="h-left d-flex">
        <div className="language-button" onClick={toggleOpen}>
          <button
            className="btn btn-secondary bg-white"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span style={{ color: "black" }}>{t("language")}</span>
          </button>

          <div
            className={menuClass}
            aria-labelledby="dropdownMenuButton"
            x-placement="bottom-start"
            style={{
              position: "absolute",
              transform: "translate3d(-1px, 36px, 0px)",
              top: "0px",
              left: "0px",
              willChange: "transform",
              zIndex: "1000 !important",
            }}
          >
            {Object.keys(lngs).map((lng) => (
              <div
                key={lng}
                className="dropdown-item"
                onClick={() => {
                  i18n.changeLanguage(lng);
                  localStorage.setItem("lang", lng);
                  setSelectedLng(lng);
                  if (lng === "ar") {
                    updateMomentLocaleToArabic();
                  } else {
                    moment.locale(lng);
                  }
                }}
              >
                {t(lng)}
              </div>
            ))}
          </div>
        </div>
        {!isLoggedIn ? (
          <div
            className="login-link"
            onClick={() => {
              showLogin(true);
              resetFormLogin();
              setIsInvalidCredentials(null);
              setValidationErrorLogIn(null);
            }}
          >
            {t("login")}
          </div>
        ) : (
          <Dropdown className="login-drop">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FontAwesomeIcon icon={faUser} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" className="user-name">
                <FontAwesomeIcon icon={faUser} color="white" />
                {t("hiText")}, {userDetails && userDetails.name}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-2">
                <FontAwesomeIcon icon={faUser} />
                  {selectedLng === "en" ?
                    <>{t("profileMenu.MyProfile")}  <span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span> </> :
                    <><span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span>  {t("profileMenu.MyProfile")}   </>
                  }
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <FontAwesomeIcon icon={faEye} />
                {selectedLng === "en" ?
                    <>{t("profileMenu.MyRequest")}  <span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span> </> :
                    <><span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span>  {t("profileMenu.MyRequest")}   </>
                  }
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <FontAwesomeIcon icon={faStar} />{" "}
                {selectedLng === "en" ?
                    <>{t("profileMenu.RelatedPosts")}  <span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span> </> :
                    <><span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span>  {t("profileMenu.RelatedPosts")}   </>
                  }
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <FontAwesomeIcon icon={faCommentAlt} />{" "}
                {selectedLng === "en" ?
                    <>{t("profileMenu.CommentedPosts")}  <span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span> </> :
                    <><span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span>  {t("profileMenu.CommentedPosts")}   </>
                  }
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <FontAwesomeIcon icon={faEyeSlash} />{" "}
                {selectedLng === "en" ?
                    <>{t("profileMenu.HiddenPosts")}  <span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span> </> :
                    <><span style={{ color: '#00CEBD' }}>{t("profileMenu.commingSoon")}</span>  {t("profileMenu.HiddenPosts")}   </>
                  }
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutHandler}>
                {t("profileMenu.LogOut")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          // <div className="login-link" onClick={logoutHandler}>
          //   logout
          // </div>
        )}
      </div>

      {/* social MODAL  */}
      <Modal
        className="custom-modal"
        centered
        show={login}
        onHide={() => showLogin(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-logo">
            <img src="./images/logo_color.png" alt="logo" />
          </div>
          <Modal.Title>{t("welcomeMessage")}</Modal.Title>
          <GoogleLog />
          <FacebookLogin fbLogin={fbLogin} />
          {/* <TwitterLogins/> */}
          {/* <TwitterLogins /> */}
          <Button
            onClick={() => {
              showLogin(false);
              showContinueWithEmailModal(true);
            }}
            className="btn btn-solid d-flex align-items-center justify-content-center w-100"
          >
            <FontAwesomeIcon className="me-2" icon={faEnvelope} />
            {t("continueWithEmail")}
          </Button>
        </Modal.Body>
      </Modal>

      {/*  login modal  */}
      <Modal
        className="custom-modal"
        centered
        show={continueWithEmail}
        onHide={() => showContinueWithEmailModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-logo">
            <img src="./images/logo_color.png" alt="logo" />
          </div>
          <Modal.Title>{t("welcomeMessage")}</Modal.Title>
          <Form onSubmit={handleSubmitLogin}>
            <Form.Group className="mb-3">
              <Form.Label>{t("formFields.Email")}</Form.Label>
              <Form.Control
                type="text"
                value={valuesLogin.email}
                onChange={handlerChangeLogin}
                name="email"
                id="email"
              />
              {validationErrorLogIn?.email && (
                <span style={{ color: "red" }}>
                  {validationErrorLogIn.email}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("formFields.password")}</Form.Label>
              <Form.Control
                value={valuesLogin.password}
                onChange={handlerChangeLogin}
                name="password"
                id="password"
                type="password"
              />
              {validationErrorLogIn?.password && (
                <span style={{ color: "red" }}>
                  {validationErrorLogIn.password}
                </span>
              )}
              {!validationErrorLogIn?.password && isInValidCredentials && (
                <span style={{ color: "red" }}>
                  {" "}
                  {t("profileMenu.invalidCredentials")}
                </span>
              )}
            </Form.Group>
            <Button
              className="w-100 mt-2"
              size="lg"
              variant="primary"
              disabled={false}
              type="submit"
            >
              {t("login")}
            </Button>
            <div className="text-center mt-2">
              <span
                className="form-link"
                onClick={() => {
                  showContinueWithEmailModal(false);
                  setShowRegister(true);
                  resetForm();
                  setValidationError();
                }}
              >
                {t("register")}
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ragister modal */}
      <Modal
        className="custom-modal modal-register"
        centered
        scrollable
        show={showRegister}
        onHide={() => setShowRegister(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-logo">
            <img src="./images/logo_color.png" alt="logo" />
          </div>
          <Modal.Title>{t("formFields.createYourAccoutonMsh")}</Modal.Title>
          <Form onSubmit={handleSubmit}>
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
                    <span style={{ color: "red" }}>{validationError.name}</span>
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
                  <Form.Label>{t("formFields.phonenumber")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    name="phone"
                    id="phone"
                  />
                  {validationError?.phone && (
                    <span style={{ color: "red" }}>
                      {validationError.phone}
                    </span>
                  )}
                </Form.Group>
              </Col>
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
                    <option value="female">{t("formFields.Female")}</option>
                  </Form.Select>
                  {validationError?.gender && (
                    <span style={{ color: "red" }}>
                      {validationError.gender}
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
                    <span style={{ color: "red" }}>{validationError.city}</span>
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
                    <span style={{ color: "red" }}>{validationError.dob}</span>
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
            <Button className="w-100" size="lg" variant="primary" type="submit">
              {t("formFields.createaccount")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Provider store={store}>
        <div
          className={selectedLng === "en" ? "App-en" : "App-ar"}
          style={{ direction: selectedLng === "en" ? "ltr" : "rtl" }}
        >
          {/* <div className="App"> */}
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route path="/results">
              <Resault />
              <Feedback selectedLng={selectedLng} />
            </Route>
          </Switch>
        </div>
      </Provider>
      {isSubmitting && <Loader />}
      <ToastContainer />
    </>
  );
};

export default App;
