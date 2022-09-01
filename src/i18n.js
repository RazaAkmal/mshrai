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
    // debug: true,
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ar: {
        translation: {
          appName: "مشراي",
          ar: "عربي",
          en: "English",
          language: "لغة",
          close: "أغلق",
          saveButton: "احفظ التغييرات",
          tabTitleEmail: "بالبريد الالكتروني",
          tabTitleWhatsapp: "بواسطة واتساب",
          phoneInputTitle: "أدخل رقم هاتفك",
          emailInputTitle: "أدخل بريدك الإلكتروني",
          feedbackTitle: "ما مدى رضاك عن مشراي؟",
          feedbackNote: "هل تقترح تحسين شئ ما؟",
          thanksTitle: "شكرا جزيلا لوقتك!",
          thanksMessage: "يمكنك ملء هذا الاستبيان لمدة 5 دقائق والحصول على اشتراك مجاني فى مشراى",
          search: {
            findMyCar: "ابحث عن سيارتي",
            brand: "الماركة",
            anyBrand: "أي علامة تجارية",
            searchBrand: "البحث عن العلامة التجارية",
            model: "المودل",
            searchModal: "مشروط البحث",
            specificYearOfManufacture: "سنة تصنيع محددة",
            manufacturingYear: "سنة الصنع",
            city: "المدينة",
            anyCity: "أي مدينة",
            searchForCity: "ابحث عن المدينة",
            see: "شاهد",
            car: "سيارة",
            price: "السعر",
            saudiRiyal: "ريال سعودى",
            kilosUsed: "عدد الكيلوهات المستعملة",
            lessThan: "أقل من",
            moreThan: "أكثر من",
            source: "مصدر",
            searchSource: "مصدر البحث",
          },
          results: {
            searchResultForCar: "نتيجة بحث عن سيارة معروضة للبيع",
            filterLimitError: "لا يمكنك تحديد أكثر من ثلاث خدمات",
            exist: "يوجد",
            enterYourEmail:
              "أدخل بريدك الألكترونى وسيتم إبلاغك عند توافر نتائج جديدة",
            email: "البريد الألكترونى",
            saveSearchResult: "حفظ نتائج البحث",
            sortBy: "ترتيب حسب",
            pleaseEnterEmail: "الرجاء إدخال البريد الإلكتروني",
            pleaseEnterPhone: "الرجاء إدخال رقم الهاتف",
            noResults: "لا يوجد نتائج توافق بحثك",
            noAdditionalResults: "لاتوجد نتائج اضافية",
            noPrice: "لايوجد سعر",
            riyal: "ريال",
            date: "التاريخ",
            sort: {
              least: "الأقل",
              most: "الأكثر",
              latest: "أحدث",
              oldest: "الأقدم",
            },
          },
          car: {
            report: "بلاغ",
            notMatch: "السيارة لاتتطابق البحث",
            notCar: "البوست ليس سيارة",
            km: "كم",
            onHaggle: "على السوم",
          },
          description: {
            Header: "أفضل منصة لتحصل على أفضل السيارات المستعملة",
            Footer: "ابحث في اكثر من موقع ومصدر لبيع السيارات المستعمله",
            Filter: "فلترة",
            copyright: "جميع الحقوق محفوظة",
          },

          sources: {
            haraj: "حراج",
            Motory: "موتري",
            Syarah: "سيارة",
            Expatriates: "اكسباتريوت",
            SaudiSale: "سعودي سيل",
            Snapchat: "سناب شات",
            Mstaml: "مستعمل",
            Carswitch: "كارسويتش",
            Instagram: "انستغرام",
            Twitter: "تويتر",
            Shobbak: "شوباک",
          },
        },
      },

      en: {
        translation: {
          appName: "Mshrai",
          en: "English",
          ar: "عربي",
          language: "Language",
          close: "Close",
          feedbackTitle: "How satisfied you are with Mshrai?",
          feedbackNote: "would you improve something?",
          saveButton: "Save Changes",
          tabTitleEmail: "By email",
          tabTitleWhatsapp: "By whatsapp",
          emailInputTitle: "Enter your email",
          phoneInputTitle: "Enter your phone number",
          thanksTitle: "Thank you for your time!",
          thanksMessage: "you can take this 5 min survey and have a free subscription in Mshrai",
          search: {
            findMyCar: "Find my car",
            brand: "Brand",
            anyBrand: "Any brand",
            searchBrand: "Brand search",
            model: "Model",
            searchModal: "Seach model",
            specificYearOfManufacture: "Specific year of manufacture",
            manufacturingYear: "Manufacturing year",
            city: "City",
            anyCity: "Any city",
            searchForCity: "Search for the city",
            see: "See",
            car: "Car",
            price: "price",
            saudiRiyal: "Saudi riyal",
            kilosUsed: "The number of kilos used",
            lessThan: "less than",
            moreThan: "more than",
            source: "Source",
            searchSource: "Serch source",
          },
          results: {
            searchResultForCar: "Search result for a car for sale",
            exist: "There are",
            filterLimitError: "you can’t select more than three services",
            enterYourEmail:
              "Enter your email and you will be notified when new results are available",
            email: "E-mail",
            saveSearchResult: "Save search results",
            sortBy: "Sort by",
            pleaseEnterEmail: "Please enter email",
            pleaseEnterPhone: "Please enter Phone Number",
            noResults: "There are no results matching your search",
            noAdditionalResults: "No additional results found",
            noPrice: "no price",
            riyal: "riyal",
            date: "Date",
            sort: {
              least: "least",
              most: "most",
              latest: "latest",
              oldest: "oldest",
            },
          },
          car: {
            report: "Report",
            notMatch: "The car does not match the search",
            notCar: "This post is not a car",
            km: "km",
            onHaggle: "on haggle",
          },
          description: {
            Header: "The best platform to get the best used cars",
            Footer: "Search more than one site and source to sell used cars",
            Filter: "Filter",
            copyright: "All rights reserved",
          },

          sources: {
            haraj: "haraj",
            Motory: "Motory",
            Syarah: "Syarah",
            Expatriates: "Expatriates",
            SaudiSale: "SaudiSale",
            Snapchat: "Snapchat",
            Mstaml: "Mstaml",
            Carswitch: "Carswitch",
            Instagram: "Instagram",
            Twitter: "Twitter",
            Shobbak: "Shobbak",
          },
        },
      },
    },
  });

export default i18n;
