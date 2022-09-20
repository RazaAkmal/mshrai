import React, { useEffect, useState, useSelector } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Resault from "./pages/resaults";
import Search from "./pages/search";
import Feedback from "./components/feedback"
import { Provider } from "react-redux";
import { store } from "./app/store";
import Cookies from "js-cookie";
import uniqid from "uniqid";
import "./i18n";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { updateMomentLocaleToArabic } from "./helpers/helpers";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import Loader from "./components/loader";

const lngs = {
  ar: { nativeName: "Arabic" },
  en: { nativeName: "English" },
};

const App = () => {
  useEffect(() => {
    const getID = Cookies.get("id");
    if (!getID) {
      let userId = uniqid("userId-");
      Cookies.set("id", userId);
    }
  }, []);

  const { t, i18n } = useTranslation();
  const [selectedLng, setSelectedLng] = useState(i18n.language)
  const [state, setState] = useState({
    isOpen: false,
  });

  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
  const toggleOpen = () => setState({ isOpen: !state.isOpen });

  const [login, showLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [continueWithEmail, showContinueWithEmailModal] = useState(false);
  const [validationError, setValidationError] = useState();
  const [date, setDate] = useState(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      email: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      let formatedDate = moment(date).format('YYYY-MM-DD')
      values.dob = formatedDate
      axios.post("http://local.meshray-backend.co/api/register", values)
        .then(res => {
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
          setShowRegister(false)
        }).catch(err => {
          const errors = {};
          if (err.response.status === 403) {
            Object.keys(err.response.data.errors).forEach((key) => {
              errors[key] = err.response.data.errors[key];
            });
          }
          setValidationError(errors)
          setSubmitting(false);
        })
    },
  });

  const { values, resetForm, handleChange, isSubmitting, handleSubmit, errors } = formik;
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
                  setSelectedLng(lng)
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
        <div className="login-link" onClick={() => showLogin(true)}>{t("login")}</div>
      </div>


      {/* social MODAL  */}
      <Modal className="custom-modal" centered show={login} onHide={() => showLogin(false)}>
        <Modal.Header closeButton >
        </Modal.Header>
        <Modal.Body>
          <div className="modal-logo">
            <img src="./images/logo_color.png" alt="logo" />
          </div>
          <Modal.Title>{t("welcomeMessage")}</Modal.Title>
          <Button onClick={() => { showLogin(false); showContinueWithEmailModal(true) }} className="btn btn-solid d-flex align-items-center justify-content-center w-100">  <FontAwesomeIcon className="me-1" icon={faEnvelope} /> {t("continueWithEmail")}</Button>
        </Modal.Body>
      </Modal>


      {/*  login modal  */}
      <Modal className="custom-modal" centered show={continueWithEmail} onHide={() => showContinueWithEmailModal(false)}>
        <Modal.Header closeButton >
        </Modal.Header>
        <Modal.Body>
          <div className="modal-logo">
            <img src="./images/logo_color.png" alt="logo" />
          </div>
          <Modal.Title>{t("welcomeMessage")}</Modal.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t('formFields.Email')}</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('formFields.password')}</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" type="button" disabled={true}>
              {t("login")}
            </Button>
            <div className="text-center mt-2">
              <span className="form-link" onClick={() => { showContinueWithEmailModal(false); setShowRegister(true); resetForm(); setValidationError() }}>{t("register")}</span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>


      {/* ragister modal */}
      <Modal className="custom-modal" show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-logo">
            <img src="./images/logo_color.png" alt="logo" />
          </div>
          <Modal.Title>{t('formFields.createYourAccoutonMsh')}</Modal.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t('formFields.Username')}</Form.Label>
              <Form.Control type="text" value={values.name} onChange={handleChange} name="name" id="name" />
              {validationError?.name && <span style={{ color: "red" }}>{validationError.name}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('formFields.Email')}</Form.Label>
              <Form.Control type="text" value={values.email} onChange={handleChange} name="email" id="email" />
              {validationError?.email && <span style={{ color: "red" }}>{validationError.email}</span>}

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('formFields.phonenumber')}</Form.Label>
              <Form.Control type="text" value={values.phone} onChange={handleChange} name="phone" id="phone" />
              {validationError?.phone && <span style={{ color: "red" }}>{validationError.phone}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('formFields.Gender')}</Form.Label>
              <Form.Select size="lg" name="gender" id="gender" value={values.gender} onChange={handleChange}>
                <option disabled selected hidden></option>
                <option value="male">{t('formFields.Male')}</option>
                <option value="female">{t('formFields.Female')}</option>
              </Form.Select>

              {validationError?.gender && <span style={{ color: "red" }}>{validationError.gender}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('formFields.City')}</Form.Label>
              <Form.Control type="text" value={values.city} onChange={handleChange} name="city" id="city" />
              {validationError?.city && <span style={{ color: "red" }}>{validationError.city}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('formFields.dateofbirth')}</Form.Label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                onCalendarClose={handleCalendarClose}
                onCalendarOpen={handleCalendarOpen}
              />
              {validationError?.dob && <span style={{ color: "red" }}>{validationError.dob}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("formFields.password")}</Form.Label>
              <Form.Control type="password" value={values.password} onChange={handleChange} name="password" id="password" />
              {validationError?.password && <span style={{ color: "red" }}>{validationError.password}</span>}
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("formFields.createaccount")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>


      <Provider store={store}>
        <Router basename="/">
          <div className={selectedLng === 'en' ? "App-en" : 'App-ar'} style={{ direction: selectedLng === 'en' ? "ltr" : 'rtl' }}>
            {/* <div className="App"> */}
            <Switch>
              <Route exact path="/results">
                <Resault />
                <Feedback selectedLng={selectedLng} />
              </Route>
              <Route exact path="/">
                <Search />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
      {isSubmitting && <Loader />}
      <ToastContainer />
    </>
  );
};

export default App;
