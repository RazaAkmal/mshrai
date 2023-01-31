import React from "react";
import './FilterTag.css'
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, } from "@fortawesome/free-solid-svg-icons";


function FilterTags(props) {

  const isEnglish = localStorage.getItem("lang") === "en";

  const modalOfbrandNotSelected = (brand, index) => {
    let returnVal = true;
    props.searchInputs.modelOptions.map((model) => {
      if (
        props.searchForm.brand_type_id.includes(model.value) &&
        model.brandId === brand
      ) {
        returnVal = false;
      }
    });
    return returnVal;
  };
  const getBrandValueAswell = (model, index) => {
    let filteredBrand = props.searchInputs.marksOptions.filter(
      (item) => item.value === model.brandId
    );
    const labelval =
      (isEnglish ? model.label_en : model.label) +
      " - " +
      (filteredBrand[0]
        ? isEnglish
          ? filteredBrand[0].label_en
          : filteredBrand[0].label
        : "");

    return (
      <>
        <Stack
          style={{ padding: "2px", display: "inline-flex" }}
          direction="row"
          spacing={1}
        >
          <Chip
          deleteIcon={<FontAwesomeIcon icon={faTimes} />}
            className="filter_tag_style"
            label={labelval}
            onDelete={() => {
              let brandModel = [...props.searchForm.brand_type_id];
              if (brandModel.includes(model.value)) {
                brandModel.splice(brandModel.indexOf(model.value), 1);
              }
              props._handleStartSearch("brand_type_id", brandModel);
            }}
          />
        </Stack>
      </>
    );
  };
  
  return (
    <>
        <div>
          {props.searchForm.brand_id && props.searchForm.brand_id.length > 0
            ? props.searchInputs.marksOptions.map((mark, index) => {
                return props.searchForm.brand_id.includes(mark.value) &&
                  modalOfbrandNotSelected(mark.value, index) ? (
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={isEnglish ? mark.label_en : mark.label}
                        onDelete={() => {
                          let marks = [...props.searchForm.brand_id];
                          if (marks.includes(mark.value)) {
                            marks.splice(marks.indexOf(mark.value), 1);
                          }
                          props._handleStartSearch("brand_id", marks);
                        }}
                      />
                    </Stack>
                
                ) : (
                  false
                );
              })
            : ""}
          {props.searchForm.brand_type_id && props.searchForm.brand_type_id.length > 0
            ? props.searchInputs.modelOptions.map((model, index) => {
                return props.searchForm.brand_type_id.includes(model.value)
                  ? getBrandValueAswell(model, index)
                  : false;
              })
            : ""}
        </div>
        <div>
          {props.searchForm.shape_id && props.searchForm.shape_id.length > 0
            ? props.searchInputs.shapes.map((shape, index) => {
                return props.searchForm.shape_id.includes(shape.id) ? (
                  <Stack
                    style={{ padding: "5px 2px", display: "inline-flex" }}
                    direction="row"
                    spacing={1}
                  >
                    <Chip
                    deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                      className="filter_tag_style"
                      label={isEnglish ? shape.title_en : shape.title}
                      onDelete={() => {
                        let shapes = [...props.searchForm.shape_id];
                        if (shapes.includes(shape.value)) {
                          shapes.splice(shapes.indexOf(shape.value), 1);
                        }
                        props._handleStartSearch("shape_id", shapes);
                      }}
                    />
                  </Stack>
                ) : (
                  false
                );
              })
            : ""}
          {props.searchForm.source_id && props.searchForm.source_id.length > 0
            ? props.searchInputs.sources.map((source, index) => {
                return props.searchForm.source_id.includes(source.value) ? (
                 
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={
                          source.label === "Snap"
                            ? "Social Media"
                            : isEnglish
                            ? source.label_en
                            : source.label
                        }
                        onDelete={() => {
                          let sources = [...props.searchForm.source_id];
                          if (sources.includes(source.value)) {
                            sources.splice(sources.indexOf(source.value), 1);
                          }
                          props._handleStartSearch("source_id", sources);
                        }}
                      />
                    </Stack>
                 
                ) : (
                  false
                );
              })
            : ""}
          {props.searchForm.price && props.searchForm.price.length > 0
            ? props.searchForm.price.map((price, index) => {
                return (
             
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={price}
                        onDelete={() => {
                          let prices = [...props.searchForm.price];
                          prices.splice(prices.indexOf(price), 1);
                          props._handleStartSearch("price", prices);
                        }}
                      />
                    </Stack>
                  
                );
              })
            : ""}
          {props.searchForm.kilometer && props.searchForm.kilometer.length > 0
            ? props.searchForm.kilometer.map((kilometer, index) => {
                return (
                
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={kilometer}
                        onDelete={() => {
                          let kilometers = [...props.searchForm.kilometer];
                          kilometers.splice(kilometers.indexOf(kilometer), 1);
                          props._handleStartSearch("kilometer", kilometers);
                        }}
                      />
                    </Stack>
             
                );
              })
            : ""}
          {props.searchForm.city_id && props.searchForm.city_id.length > 0
            ? props.searchInputs.cityOptions.map((city, index) => {
                return props.searchForm.city_id.includes(city.value) ? (
                    <Stack
                      style={{ padding: "5px 2px", display: "inline-flex" }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                      deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                        className="filter_tag_style"
                        label={isEnglish ? city.label_en : city.label}
                        onDelete={() => {
                          let cities = [...props.searchForm.city_id];
                          if (cities.includes(city.value)) {
                            cities.splice(cities.indexOf(city.value), 1);
                          }
                          props._handleStartSearch("city_id", cities);
                        }}
                      />
                    </Stack>
                ) : (
                  false
                );
              })
            : ""}
          {props.searchForm.model_year_end &&
          (props.searchForm.model_year_end < new Date().getFullYear() ||
            props.searchForm.model_year_start > 1990) ? (
              <Stack
                style={{ padding: "5px 2px", display: "inline-flex" }}
                direction="row"
                spacing={1}
              >
                <Chip
                deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                  className="filter_tag_style"
                  label={
                    props.searchForm.model_year_start +
                    "-" +
                    props.searchForm.model_year_end
                  }
                  onDelete={() => {
                    props._handleStartSearch("model_year", {
                      model_year_start: 1990,
                      model_year_end: new Date().getFullYear(),
                    });
                  }}
                />
              </Stack>
          ) : (
            ""
          )}
          {props.searchForm.manufacturing_year &&
          props.searchForm.manufacturing_year.length > 0
            ? props.searchForm.manufacturing_year.map((year, index) => (
                  <Stack
                    style={{ padding: "5px 2px", display: "inline-flex" }}
                    direction="row"
                    spacing={1}
                  >
                    <Chip
                    deleteIcon={<FontAwesomeIcon icon={faTimes} />}
                      className="filter_tag_style"
                      label={year}
                      variant="outlined"
                      onDelete={() => {
                        props._handleStartSearch("manufacturing_year", year);
                      }}
                    />
                  </Stack>
              ))
            : ""}

          {/* {(props.searchForm.city_id.length > 0 ||
            props.searchForm.source_id.length > 0 ||
            props.searchForm.brand_type_id.length > 0 ||
            props.searchForm.model_year_end < new Date().getFullYear() ||
            props.searchForm.model_year_start > 1990 ||
            props.searchForm.brand_id.length > 0) && (

              <Stack direction="row" spacing={1}>
                <Chip
                  label={isEnglish ? "Clear All" : "امسح الكل"}
                  onClick={() => props._handleStartSearch("clearall")}
                />
              </Stack>
          )} */}
        </div>
    </>
  );
}

export default FilterTags;
