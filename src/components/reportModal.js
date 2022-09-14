import { Modal, ListGroup, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState } from "react";

export const ReportModal = ({ handleClose, show, handleSubmit }) => {
  const { t } = useTranslation();
  const reportReasons = useSelector((state) => state.search.allReportReasons);
  const [ selectedReason, setSelectedReason] = useState(null);

  return (
    <Modal
      show={show}
      backdrop={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("car.report")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Select aria-label="Select Reason" onChange={(e) => setSelectedReason(e.target.value)}>
      {reportReasons?.map((reason, i) => {
        return <option key={i} value={reason.id}>{reason.reason}</option>
      })}
      </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>handleClose()}>{t("close")}</Button>
        <Button onClick={()=>handleSubmit(selectedReason)} variant="success">{t("saveButton")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
