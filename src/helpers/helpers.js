import moment from "moment";

export const parseParams = (querystring) => {
  const params = new URLSearchParams(querystring);

  const obj = {};

  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
};

export const sortByBrand = (data) => {
  var atLast = ["haraj", "Syarah"];
  var cars = [...data];
  cars.sort((a, b) => {
    if (atLast.includes(a.source) && atLast.includes(b.source)) {
      return 1;
    } else {
      return -1;
    }
  });
  return cars;
};

export const updateMomentLocaleToArabic = () => {
  moment.locale("ar", {
    relativeTime: {
      future: "في %s",
      past: "يوجد %s",
      s: "بعض الثواني",
      m: "دقيقة",
      mm: "%d الدقائق",
      h: "أ ساعة",
      hh: "%d ساعات",
      d: "يوم",
      dd: function (number) {
        if (number < 7) {
          return number + " أيام"; // Moment uses "d" when it's just 1 day.
        } else {
          const weeks = Math.round(number / 7);
          return weeks + " " + (weeks > 1 ? "أسابيع" : "أسبوع");
        }
      },
      M: "شهر",
      MM: "%d شهر",
      y: "سنة",
      yy: "%d أعوام",
    },
  });
};
export const updateMomentLocaleToEng = () => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s+",
      s: "%d seconds",
      ss: "%d seconds",
      m: "%d min",
      mm: "%d minutes",
      h: "%d hr",
      hh: "%d hrs",
      d: "%d d",
      dd: function (number) {
        if (number < 7) {
          return number + " days"; // Moment uses "d" when it's just 1 day.
        } else {
          const weeks = Math.round(number / 7);
          return weeks + " " + (weeks > 1 ? "w" : "W");
        }
      },
      M: "%d mth",
      MM: "%d mths",
      y: "y",
      yy: "%d ys",
    },
  });
};
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
