import { apiUrl } from "../constants";

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
  };
  if(result.code === "0"){
    if(result.marks && result.marks.length > 0){
      result.marks.forEach(mark => {
        options.marksOptions.push({value: mark.id, label: mark.brand})
      });
    }
    if(result.model && result.model.length > 0){
      result.model.forEach(model => {
        options.modelOptions.push({value: model.id, label: model.brand_types})
      });
    }
    if(result.cities && result.cities.length > 0){
      result.cities.forEach(city => {
        options.cityOptions.push({value: city.id, label: city.city})
      });
    }
    if(result.shapes && result.shapes.length > 0){
      options.shapes = result.shapes
    }
  }
  return options;
}
