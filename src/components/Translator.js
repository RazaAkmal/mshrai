import React, { useState } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import FlagIcon from "./FlagIcon.js";

function Translator() {
  const { i18n } = useTranslation();
  const [countries] = useState([
    // { code: "gr", title: "Greece" },
    { code: "sa", title: "Saudi Arabia" },
    { code: "us", title: "United States" },
  ]);
  const [toggleContents, setToggleContents] = useState("Select Language");
  const [selectedCountry, setSelectedCountry] = useState();

  const lngs = {
    sa: { nativeName: "Arabic" },
    us: { nativeName: "English" },
  };

  return (
    <>
      <Dropdown
        onSelect={(eventKey) => {
          const { code, title } = countries.find(
            ({ code }) => eventKey === code
          );

          setSelectedCountry(eventKey);
          setToggleContents(
            <>
              <FlagIcon code={code} /> {title}
            </>
          );
        }}
      >
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-flags"
          className="text-left"
          style={{ width: 160 }}
        >
          {toggleContents}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {countries.map(({ code, title }) => (
            <Dropdown.Item
              key={code}
              eventKey={code}
              onClick={() => i18n.changeLanguage(code.toString())}
            >
              <FlagIcon code={code} /> {title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div> */}
    </>
  );
}

export default Translator;
