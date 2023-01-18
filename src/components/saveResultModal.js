import { useState } from "react";
import { useSelector } from "react-redux";
import { saveResults } from "../features/search/searchApi";
import { Alert } from "./Alert/Alert";

export default function SaveResults() {
  const [state, setstate] = useState("");
  const searchForm = useSelector((state) => state.search.searchForm);
  const resultsNumber = useSelector((state) => state.search.numFound);
  const query = useSelector((state) => state.search.query);

  const _handleSaveResults = () => {
    if (state === "") return;
    document.querySelector(".alert-success").style.display = "none";
    document.querySelector(".alert-danger").style.display = "none";

    let key = JSON.stringify(searchForm);
    let q = JSON.stringify(query);
    let data = {
      email: state,
      keys: key,
      search: q,
      type: "saveResults",
      response: resultsNumber,
    };

    saveResults(data).then((res) => {
      console.log(res);
      const alertDiv = document.createElement("div");
      alertDiv.setAttribute("role", "alert");
      const alertBtnClose = document.createElement("button");
      alertBtnClose.className = "btn-close";
      alertBtnClose.setAttribute("type", "button");
      alertBtnClose.setAttribute("data-bs-dismiss", "alert");
      alertBtnClose.setAttribute("ari-label", "Close");
      alertDiv.appendChild(alertBtnClose);
      const modalBody = document.querySelector(".modai-body");
      modalBody.appendChild(alertDiv);
      alertDiv.style.display = "block";
      if (res && res.code === 0) {
        setstate("");
        alertDiv.className = "alert alert-success alert-dismissible fade show";
        alertDiv.innerHTML = "تم الإشتراك فى النشرة الإخبارية بنجاح.";
      } else {
        alertDiv.className = "alert alert-danger alert-dismissible fade show";
        alertDiv.innerHTML = "حدث خطأ ما تأكد من البيانات وأعد الإرسال.";
      }
      setTimeout(() => {
        document.querySelector("#exampleModal").style.display = "none";
        document.body.classList.remove("modal-open");
        document.querySelector(".alert").style.display = "none";
      }, 3000);
    });
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Alert sucess>تم حفظ البيانات بنجاح.</Alert>
            <Alert> حدث خطأ ما تأكد من البيانات وأعد الإرسال.</Alert>

            <p className="text-center">
              أدخل بريدك الألكترونى وسيتم إبلاغك عند توافر نتائج جديدة
            </p>
            <form>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  البريد الإلكترونى:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="recipient-email"
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              إغلاق
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                _handleSaveResults();
              }}
            >
              ارسال اشعارات للنتائج البحث
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
