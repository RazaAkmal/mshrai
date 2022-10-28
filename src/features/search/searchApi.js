import axios from "axios";
import { apiUrl, solrUrl } from "../constants";

export async function fetchSearchInputs() {
  const response = await fetch(`${apiUrl}/search_form`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    //   body: JSON.stringify({ amount }),
  });
  const result = await response.json();
  let options = {
    marksOptions: [],
    modelOptions: [],
    cityOptions: [],
    shapes: [],
    sources: [],
  };
  if (result.code === "0") {
    if (result.marks && result.marks.length > 0) {
      result.marks.forEach((mark) => {
        options.marksOptions.push({
          value: mark.id,
          label: mark.brand,
          label_en: mark.brand_en,
          image: mark.image,
        });
      });
    }
    if (result.model && result.model.length > 0) {
      result.model.forEach((model) => {
        options.modelOptions.push({
          value: model.id,
          label: model.brand_types,
          label_en: model.brand_types_en,
          brandId: model.brand_id,
        });
      });
    }
    if (result.sources && result.sources.length > 0) {
      result.sources.forEach((source) => {
        options.sources.push({
          value: source.id,
          label: source.title,
          label_en: source.title_en,
          image: source.image,
        });
      });
    }
    if (result.cities && result.cities.length > 0) {
      result.cities.forEach((city) => {
        options.cityOptions.push({ value: city.id, label: city.city, label_en: city.city_en });
      });
    }
    if (result.shapes && result.shapes.length > 0) {
      options.shapes = result.shapes;
    }
  }
  return options;
}

export async function fetchCars(query) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    var response = await fetch(
      `${solrUrl}/solr/syarty/select?q=${query}`,
      requestOptions
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }

  // .then(response => {return response.json()})
  // .catch(error => console.log('error', error));
}
export async function searchCars(payload, filterSelected) {
  try {
    const { data } = await axios.post(`${apiUrl}/api/search`, {
      query: payload,
      filter: filterSelected
    });
    return data.data;
  } catch (err) {
    return err
  }
}

export async function saveResults(payload) {
  try {
    const { data } = await axios.post(`${apiUrl}/api/subscribe`, payload);
    return data;
  } catch (err) {
    return err
  }
}
export async function saveFeedback(payload) {
  try {
    const { data } = await axios.post(`${apiUrl}/api/feedback`, payload);
    return data;
  } catch (err) {
    return err
  }
}
export async function searchResult(payload) {
  try {
    const { data } = await axios.post(`${apiUrl}/api/search`, payload);
    return data;
  } catch (err) {
    return err
  }
}

export async function userActivity(payload) {
  try {
    const { data } = await axios.post(`${apiUrl}/api/activity`, payload);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function reportReasons() {
  try {
    const { data } = await axios.get(`${apiUrl}/api/report_reasons`);
    return data;
  } catch (err) {
    console.log(err);
  }
}
