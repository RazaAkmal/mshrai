import {
  FormCityTags,
  FormKilometerTags,
  FormManufacturingYear,
  FormModelYear,
  FormPriceTags,
  FormShapeTags,
  FormSourceTags,
  SearchTagsRemove,
} from "./Tags";
const AllSearchTags = ({ searchInputs, searchForm, _handleStartSearch }) => {
  const isEnglish = localStorage.getItem("lang") === "en";
  return (
    <>
      <div className="row">
        <ul className="search_tags">
          <FormShapeTags
            searchForm={searchForm}
            searchInputs={searchInputs}
            _handleStartSearch={_handleStartSearch}
            isEnglish={isEnglish}
          />
          <FormSourceTags
            searchForm={searchForm}
            searchInputs={searchInputs}
            _handleStartSearch={_handleStartSearch}
            isEnglish={isEnglish}
          />
          <FormPriceTags
            searchForm={searchForm}
            _handleStartSearch={_handleStartSearch}
          />
          <FormKilometerTags
            searchForm={searchForm}
            _handleStartSearch={_handleStartSearch}
          />
          <FormCityTags
            searchForm={searchForm}
            searchInputs={searchInputs}
            _handleStartSearch={_handleStartSearch}
            isEnglish={isEnglish}
          />

          <FormModelYear
            searchForm={searchForm}
            _handleStartSearch={_handleStartSearch}
          />
          <FormManufacturingYear
            searchForm={searchForm}
            _handleStartSearch={_handleStartSearch}
          />

          {/*  this will require when we remove reange manufacturing_year filter  
                    {searchForm.manufacturing_year && searchForm.manufacturing_year.length > 0
                      ? searchForm.manufacturing_year.map((year, index) => {
                        return (
                          <li
                            style={{ direction: "ltr" }}
                            key={"searchcities" + index}
                          >
                            {year}
                            <span
                              onClick={() => {
                                _handleStartSearch("model_year", {
                                  model_year_start: 1990,
                                  model_year_end: new Date().getFullYear(),
                                });
                              }}
                            >
                              <IoIosClose />
                            </span>
                          </li>
                        );
                      })
                      : ""} */}

          <SearchTagsRemove
            searchForm={searchForm}
            _handleStartSearch={_handleStartSearch}
            isEnglish={isEnglish}
          />
        </ul>
      </div>
    </>
  );
};

export default AllSearchTags;
