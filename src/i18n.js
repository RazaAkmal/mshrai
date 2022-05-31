import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "sa",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      sa: {
        translation: {
          description: {
            Header: "أفضل منصة لتحصل على أفضل السيارات المستعملة",
            Footer: "ابحث في اكثر من موقع ومصدر لبيع السيارات المستعمله",
          },
        },
      },

      us: {
        translation: {
          description: {
            Header: "The best platform to get the best used cars",
            Footer: "Search more than one site and source to sell used cars",
          },
        },
      },
    },
  });

export default i18n;
