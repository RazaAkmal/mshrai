const SearchTagsRemove = ({ searchForm, _handleStartSearch, isEnglish }) => {
  return (
    <>
      {(searchForm.city_id.length > 0 ||
        searchForm.source_id.length > 0 ||
        searchForm.brand_type_id.length > 0 ||
        searchForm.model_year_end < new Date().getFullYear() ||
        searchForm.model_year_start > 1990 ||
        searchForm.brand_id.length > 0) && (
        <li
          className="search_tags-remove"
          key={"searchcitiesclear"}
          onClick={() => _handleStartSearch("clearall")}
        >
          {isEnglish ? "Clear All" : "امسح الكل"}
        </li>
      )}
    </>
  );
};

export default SearchTagsRemove;
