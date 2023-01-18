<Modal
  className="custom-modal"
  centered
  show={continueWithEmail}
  onHide={() => showContinueWithEmailModal(false)}
>
  <Modal.Header closeButton></Modal.Header>
  <Modal.Body>
    <ModalLogo />
    <Modal.Title>{t("welcomeMessage")}</Modal.Title>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>{t("formFields.Email")}</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("formFields.password")}</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      <Button
        className="w-100 mt-2"
        size="lg"
        variant="primary"
        type="button"
        disabled={true}
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
</Modal>;
