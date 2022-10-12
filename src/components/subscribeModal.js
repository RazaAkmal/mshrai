import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";
import Form from 'react-bootstrap/Form';
import { parseParams } from "../helpers/helpers";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  saveResults,
} from "../features/search/searchApi";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const SubscribeModal = () => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const [kindOfSubscribe, setKindOfSubscribe] = useState('email');
  const [isBusy, seIisBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const query = useSelector((state) => state.search.query);
  const searchForm = useSelector((state) => state.search.searchForm);
  const isEnglish = localStorage.getItem("lang") === "en";

  const showError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const _handleSaveResults = () => {
    if ((kindOfSubscribe === "email" && email === "") || (kindOfSubscribe === "whatsapp" && whatsapp === "")) {
      showError(t(kindOfSubscribe === "email" ? "results.pleaseEnterEmail" : "results.pleaseEnterPhone"));
      return;
    } else if (searchForm.brand_id.length === 0) {
      showError("الرجاء تحديد علامة تجارية واحدة على الأقل");
      return;
    }
    seIisBusy(true);

    let query = {
        brand_id: searchForm.brand_id,
        model_year: [{ min: searchForm.model_year_start, max: searchForm.model_year_end}],
    }

    if (searchForm.brand_type_id.length > 0) {
      query["brand_type_id"] = searchForm.brand_type_id;
    }
    if (searchForm.source_id.length > 0) {
      query["source_id"] = searchForm.source_id;
    }
    if (searchForm.city_id.length > 0) {
      query["city_id"] = searchForm.city_id;
    }
    if (searchForm.kilometer_obj.length > 0) {
      query["kilometer"] = searchForm.kilometer_obj;
    }
    if (searchForm.price_obj.length > 0) {
      query["price"] = searchForm.price_obj;
    }
    const data = {
      email: email,
      notification_medium: "email",
      query: query
    };

    saveResults(data).then((res) => {
      seIisBusy(false);
      if (res.message === "Request failed with status code 422") {
        showError("يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالحًا");
      }
      else {
        handleClose()
        toast.success(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {t("results.saveSearchResult")}
      </Button>
      <Modal className={ isEnglish ? "subscribe-modal-en" : 'subscribe-modal'} show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t("results.saveSearchResult")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tabs-menu">
            <Tabs
              activeKey={kindOfSubscribe}
              onSelect={(k) => setKindOfSubscribe(k)}
              className="mb-3"
            >
              <Tab eventKey="email" title={<div className="Tab-inner"><span style={{ marginLeft: "10px" }}>{t("tabTitleEmail")}</span><span><img style={{ width: "24px", height: "24px" }} src="../images/mailicon.png" alt="logo" /> </span></div>}>
                {isBusy ? (
                  <img src="./images/loading.gif" alt="loading" />
                ) :
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{ marginTop: '10px' }}>{t("emailInputTitle")}</Form.Label>
                    <Form.Control style={{ marginTop: '0px' }} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t("emailInputTitle")} />
                  </Form.Group>
                }
              </Tab>
              <Tab disabled eventKey="whatsapp" title={<div className="Tab-inner"><span style={{ marginLeft: "10px" }}>{t("tabTitleWhatsapp")}</span><span><img src="../images/whatsappicon.svg" alt="logo" /> </span></div>}>
                {isBusy ? (
                  <img src="./images/loading.gif" alt="loading" />
                ) :
                  <Form.Group controlId="formBasicPhone">
                    <Form.Label style={{ marginTop: '10px' }}>{t("phoneInputTitle")}</Form.Label>
                    <Form.Control style={{ marginTop: '0px' }} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} type="number" placeholder={t("phoneInputTitle")} />
                  </Form.Group>
                }
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("close")}
          </Button>
          <Button disabled={isBusy} onClick={_handleSaveResults}>
            {t("saveButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubscribeModal