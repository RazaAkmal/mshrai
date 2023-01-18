//sortedSearchSourcesUtility
export const sortedSearchSourcesUtility = (searchInputs) =>
  searchInputs?.sources
    .reduce((acc, element) => {
      if (
        element.label_en !== "Snapchat" &&
        element.label_en !== "Instagram" &&
        element.label_en !== "Twitter"
      ) {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [])
    .filter(
      (element) =>
        element.label_en !== "Snapchat" &&
        element.label_en !== "Instagram" &&
        element.label_en !== "Twitter"
    );
//formatOptionLabelUtility
export const formatOptionLabelUtility =
  (isEnglish) =>
  ({ label, label_en, image }) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{isEnglish ? label_en : label}</div>
        <div>
          <img alt="car-logo" height={50} width={50} src={image} />
        </div>
      </div>
    );
  };
//Handle If Conditions For State Brand ==> useEffect
