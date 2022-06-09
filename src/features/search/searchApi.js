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
  if(result.code === "0"){
    if(result.marks && result.marks.length > 0){
      result.marks.forEach(mark => {
        options.marksOptions.push({value: mark.id, label: mark.brand, image: mark.image})
      });
    }
    if(result.model && result.model.length > 0){
      result.model.forEach(model => {
        options.modelOptions.push({value: model.id, label: model.brand_types, brandId: model.brand_id})
      });
    }
    if(result.sources && result.sources.length > 0){
      result.sources.forEach(source => {
        options.sources.push({value: source.id, label: source.title, image: source.image})
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

export async function fetchCars(query) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  try{
    var response = await fetch(`${solrUrl}/solr/syarty/select?q=${query}`, requestOptions);
    return response.json();
  }catch(err){
    console.log(err)
  }
  

    // .then(response => {return response.json()})
    // .catch(error => console.log('error', error));
}
export async function saveResults(data) {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(data),
  };
  try{
    var response = await fetch(`${apiUrl}/api/subscribe`, requestOptions);
    return response.json();
  }catch(err){
    console.log(err)
  }
  

    // .then(response => {return response.json()})
    // .catch(error => console.log('error', error));
}

