import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { saveFeedback } from "../features/search/searchApi";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";

const feedback = [
  {
    icon: "../images/sadest.png",
    iconActive: "../images/sadest-active.png",
    rate: 1,
  },
  {
    icon: "../images/sad.png",
    iconActive: "../images/sad-active.png",
    rate: 2,
  },
  {
    icon: "../images/confused.png",
    iconActive: "../images/confused-active.png",
    rate: 3,
  },
  {
    icon: "../images/happy.png",
    iconActive: "../images/happy-active.png",
    rate: 4,
  },
  {
    icon: "../images/morehappy.png",
    iconActive: "../images/morehappy-active.png",
    rate: 5,
  },
];
const FeedbackModel = ({ selectedLng }) => {

    useEffect(() => {
        setTimeout(() => {
            SetFeedbackHide(true)
            
        }, 300000);
    }, [])

  const { t } = useTranslation();
  
  const [rate, setRate] = useState("");
  const [note, setNote] = useState("");
  const [submited, setSubmited] = useState(false);
  const [feedbackhide, SetFeedbackHide] = useState(false);

  const handleSubmit = () => {
    const data = {
      rate: rate,
    };
    if (note) {
      data["message"] = note;
    }
    saveFeedback(data).then((res) => {
      setRate("");
      setNote("");
      setSubmited(true);
      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  return (
    <div>
      <Modal
        show={feedbackhide}
        centered
        onHide={() => {
          SetFeedbackHide(false);
        }}
      >
        <Modal.Header
          style={{ borderBottom: "none !important" }}
          closeButton
        ></Modal.Header>
        {!submited ? (
          <div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                fontWeight: "500",
              }}
            >
              {t("feedbackTitle")}
            </div>
            <div style={{ paddingTop: "20px", display: "flex" }}>
              {feedback.map((data) => (
                <img
                  onClick={() => setRate(data.rate)}
                  style={{ width: "40px", height: "40px" }}
                  src={rate === data.rate ? data.iconActive : data.icon}
                  alt={data.icon}
                />
              ))}
            </div>
            <div>
              <Form.Group style={{ padding: "20px" }} className="mb-3">
                {/* <Form.Label>Example textarea</Form.Label> */}
                <Form.Control
                  onChange={(e) => setNote(e.target.value)}
                  style={selectedLng === "en" ? { textAlign: "left" } : {}}
                  placeholder={t("feedbackNote")}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </div>
            <div style={{ paddingBottom: "20px", textAlign: "center" }}>
              <Button
                variant="primary"
                disabled={rate === ""}
                onClick={handleSubmit}
              >
                {t("saveButton")}
              </Button>
            </div>
          </div>
        ) : (
          <div
            style={{ padding: "20px", textAlign: "center", fontWeight: "500" }}
          >
            <div>{t("thanksTitle")}</div>
            <div style={{ fontWeight: "400" }}>{t("thanksMessage")}</div>
            <a
              style={{ fontWeight: "400" }}
              href="https://forms.gle/aSH7T9E2UKkNR9U6A"
            >
              {" "}
              Please Click Here
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FeedbackModel;
