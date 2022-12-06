import { useState } from "react";
import { useSelector } from "react-redux";
import { saveResults } from "../features/search/searchApi";
import $ from "jquery";

export default function SaveResults() {
  const [state, setstate] = useState("");
  const searchForm = useSelector((state) => state.search.searchForm);
  const resultsNumber = useSelector((state) => state.search.numFound);
  const query = useSelector((state) => state.search.query);

  const _handleSaveResults = () => {
    if (state === "") return;
    $(".alert-success").hide();
    $(".alert-danger").hide();

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
      if (res && res.code == 0) {
        setstate("");
        $(".modai-body")
          .append(`<div className="alert alert-success alert-dismissible fade show" role="alert">
              تم الإشتراك فى النشرة الإخبارية بنجاح.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`);
        $(".alert-success").show();
        setTimeout(() => {
          // $("[data-bs-dismiss]").trigger({ type: "click" });
          window.$('#exampleModal').modal('hide')
          $("body").removeClass("modal-open");
          // $("body").css("overflow-y", "scroll");
          $(".alert").hide();
        }, 3000);
      } else {
        $(".modai-body")
          .append(`<div className="alert alert-danger alert-dismissible fade show" role="alert">
              حدث خطأ ما تأكد من البيانات وأعد الإرسال.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`);
        $(".alert-danger").show();
      }
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
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              تم حفظ البيانات بنجاح.
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              حدث خطأ ما تأكد من البيانات وأعد الإرسال.
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
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
