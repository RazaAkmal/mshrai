import { Modal, ListGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const ReportModal = ({ handleClose, show }) => {
  const { t } = useTranslation();

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
        <ListGroup>
          <ListGroup.Item>{t("car.notMatch")}</ListGroup.Item>
          <ListGroup.Item>{t("car.notCar")}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>{t("close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
