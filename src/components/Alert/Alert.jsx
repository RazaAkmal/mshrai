export const Alert = ({ sucess, children }) => {
  return (
    <div
      className={`alert ${
        sucess ? "alert-success" : "alert-danger"
      } alert-dismissible fade  show`}
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};
