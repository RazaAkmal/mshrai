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
        if(state === "") return;
        let key = JSON.stringify(searchForm);
        let q = JSON.stringify(query);
        let data = {email: state,keys: key, search: q, type: "saveResults", response: resultsNumber}

        saveResults(data).then(res => {
            console.log(res);
            $("[data-bs-dismiss]").trigger({ type: "click" });
        })
    }
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
            <p className="text-center">أدخل بريدك الألكترونى وسيتم إبلاغك عند توافر نتائج جديدة</p>
            <form>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  البريد الإلكترونى:
                </label>
                <input type="email" className="form-control" id="recipient-email" value={state} onChange={(e)=> setstate(e.target.value)}/>
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
            <button type="button" className="btn btn-success" onClick={(e)=>{e.preventDefault();_handleSaveResults()}}>
              حفظ نتائج البحث
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
