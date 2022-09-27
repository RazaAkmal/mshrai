import axios from "axios";
import { useState, useEffect } from "react";
import "./../i18n";
import { useTranslation } from "react-i18next";
import {apiUrl} from '../features/constants'

const GoogleLog = () => {
  const [loginUrl, setLoginUrl] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    urlFetch();
  }, []);

  const urlFetch = async () => {
    const res = await axios(`${apiUrl}/api/auth/google`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res) {
      setLoginUrl(res.data);
    }
  };

  return (
    <>
      <div>
        {loginUrl != null && (
          <a
            className="btn btn-solid d-flex align-items-center justify-content-center w-100 btn btn-primary mb-3"
            href={loginUrl}
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="me-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            {t("continueWithGoogle")}
          </a>
        )}
      </div>
    </>
  );
};
export default GoogleLog;
