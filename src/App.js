import React, { useEffect, useState } from "react";
import "./App.css";
import ReactGA from "react-ga";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Search, Resault, Blog, BlogDetails } from "./pages";
import Cookies from "js-cookie";
import uniqid from "uniqid";
import "./i18n";
import { useTranslation } from "react-i18next";
import { updateMomentLocaleToArabic, notifySucess } from "./helpers";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { apiUrl } from "./features/constants";
import { useSelector } from "react-redux";
import { Feedback, PhoneOtpModel, FeedbackModel, NavBar } from "./components";

const App = () => {
  const { t, i18n } = useTranslation();
  const [registerModal, setRegisterModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [validationErrorLogIn, setValidationErrorLogIn] = useState();
  const [isInValidCredentials, setIsInvalidCredentials] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const selectedLng = useSelector((state) => state.search.language);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    i18n.changeLanguage("ar");
    localStorage.setItem("lang", "ar");
    updateMomentLocaleToArabic();
    const getID = Cookies.get("id");
    if (!getID) {
      let userId = uniqid("userId-");
      Cookies.set("id", userId);
    }
    ReactGA.initialize("UA-248573380-1");
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
    } else if (loginFrom === "google") {
      googleFn(location.search);
    }
  }, [location.search]);

  const loginHelper = (token, userData) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userDetails", JSON.stringify(userData));
    setUserDetails(userData);
    setIsLoggedIn(true);
    setIsInvalidCredentials(false);
    // resetFormLogin();
    setValidationErrorLogIn(undefined);
    navigate("/results");
    // setSubmitting(false);
    showRegister(false);
  };

  // FOR GOOGLE LOGIN
  const googleFn = async (val) => {
    localStorage.removeItem("loginFrom");
    const res = await axios(`${apiUrl}/api/auth/callback/google${val}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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
    try {
      const res = await axios(`${apiUrl}/api/auth/callback/twitter${val}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (res) {
        loginHelper(res.data.data.token, res.data.data.user);
        // window.close();
      }
    } catch (err) {
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
    notifySucess(t("logoutSuccessfullyMessage"));
    navigate("/");
  };

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //   },
  //   onSubmit: (values, { setSubmitting }) => {
  //     let formatedDate = moment(date).format("YYYY-MM-DD");
  //     values.dob = formatedDate;
  //     axios
  //       .post(`${apiUrl}/api/registerModal`, values)
  //       .then((res) => {
  //notifySucess(res.data.message)
  //
  //         setSubmitting(false);
  //         setShowRegister(false);
  //         if (res) {
  //             loginHelper(res.data.data.token, res.data.data.user);
  //         }
  //       })
  //       .catch((err) => {
  //         const errors = {};
  //         if (err.response.status === 403) {
  //           Object.keys(err.response.data.errors).forEach((key) => {
  //             errors[key] = err.response.data.errors[key];
  //           });
  //         }
  //         setValidationError(errors);
  //         setSubmitting(false);
  //       });
  //   },
  // });

  //FOR LOGIN ////////////////////////////////////////////////////
  // const formikLogin = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: (values, { setSubmitting }) => {
  //     // let formatedDate = moment(date).format("YYYY-MM-DD");
  //     // values.dob = formatedDate;
  //     axios
  //       .post(`${apiUrl}/api/login`, values)
  //       .then((res) => {
  //         showContinueWithEmailModal(false);
  //notifySucess(res.data.message)
  //
  //         if (res.data.data.token) {
  //           loginHelper(res.data.data.token, res.data.data.user);
  //           setSubmitting(false);
  //         }
  //         return;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         const errors = {};
  //         if (err.response.status === 403) {
  //           Object.keys(err.response.data.errors).forEach((key) => {
  //             errors[key] = err.response.data.errors[key];
  //           });
  //         }
  //         setValidationErrorLogIn(errors);
  //         if (
  //           err.response.data &&
  //           typeof err.response.data.errors === "string"
  //         ) {
  //           console.log("invalid credentials");
  //           setIsInvalidCredentials(true);
  //         } else {
  //           console.log("something went wrong");
  //         }
  //         // setSubmitting(false);
  //       });
  //   },
  // });

  // const {
  //   values: valuesLogin,
  //   resetForm: resetFormLogin,
  //   handleChange: handlerChangeLogin,
  //   isSubmitting: isSubmittingLogin,
  //   handleSubmit: handleSubmitLogin,
  //   errors: errorLogin,
  // } = formikLogin;
  // const {
  //   values,
  //   resetForm,
  //   handleChange,
  //   isSubmitting,
  //   handleSubmit,
  //   errors,
  // } = formik;
  // const { open, handleClick } = useNavBarContext();
  return (
    <>
      <FeedbackModel />
      {/* Navbar */}
      <NavBar
        t={t}
        i18n={i18n}
        isLoggedIn={isLoggedIn}
        setRegisterModal={setRegisterModal}
        setIsInvalidCredentials={setIsInvalidCredentials}
        setValidationErrorLogIn={setValidationErrorLogIn}
        userDetails={userDetails}
        logoutHandler={logoutHandler}
      />

      {/* social MODAL  */}
      {/* <Modal
        className="custom-modal"
        centered
        show={login}
        onHide={() => showLogin(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
           <ModalLogo />
          <Modal.Title>{t("welcomeMessage")}</Modal.Title>
          <GoogleLog />
          <FacebookLogin fbLogin={fbLogin} />
          <TwitterLogins/>
          <TwitterLogins />
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
          <PhoneLogin showLogin={showLogin} />
          <Button
        onClick={() => {
          showLogin(false);
          // setPhoneLogin(true);
          // showContinueWithPhoneModal(true);
        }}
        className="btn btn-solid mt-3 d-flex align-items-center justify-content-center w-100"
      >
        <FontAwesomeIcon className="me-2" icon={faPhoneAlt} />
        {t("continueWithnumber")}
      </Button>
        </Modal.Body>
      </Modal> */}

      {/*  login modal  */}
      {/* <Modal
        className="custom-modal"
        centered
        show={continueWithEmail}
        onHide={() => showContinueWithEmailModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
           <ModalLogo />
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
                  // resetForm();
                  setValidationError();
                }}
              >
                {t("registerModal")}
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal> */}

      {/* ragister modal */}
      {/* <Modal
        className="custom-modal modal-registerModal"
        centered
        scrollable
        show={showRegister}
        onHide={() => setShowRegister(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
           <ModalLogo />
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
      </Modal> */}
      {/* < RegisterModel registerModal={registerModal} setRegisterModal={setRegisterModal} loginHelper={loginHelper} /> */}
      < PhoneOtpModel registerModal={registerModal} setRegisterModal={setRegisterModal} loginHelper={loginHelper} />

      <div
        className={selectedLng === "en" ? "App-en" : "App-ar"}
        style={{ direction: selectedLng === "en" ? "ltr" : "rtl" }}
      >
        {/* <div className="App"> */}

        <Routes>
          <Route path="/" element={<Search />} />
          <Route
            path="/results"
            element={
              <>
                <Resault />
                <Feedback selectedLng={selectedLng} />
              </>
            }
          />
          <Route path="/blogs" element={<Blog selectedLng={selectedLng} />} />
          <Route
            path="/blogs/:id"
            element={<BlogDetails selectedLng={selectedLng} />}
          />
        </Routes>
      </div>

      {/* {isSubmitting && <Loader />} */}
      <ToastContainer />
    </>
  );
};

export default App;
