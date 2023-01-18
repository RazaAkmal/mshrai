export const handleAnyYearChangeUtility = (
  value,
  selectedYears,
  setYearRange
) => {
  if (value.length >= 0) {
    setYearRange(value);
  } else {
    console.log(
      typeof document.getElementById(value.label).value,
      "document.getElementById('isYearSelected')"
    );
    if (document.getElementById(value.label).value !== "false") {
      let newValue = [...selectedYears];
      const index = newValue.findIndex(
        (element) => element?.label === value.label
      );
      newValue.splice(index, 1);
      setYearRange(newValue);
    } else {
      let newValue = [...selectedYears];
      newValue.push(value);
      const truthyArray = newValue.filter(Boolean);
      setYearRange(truthyArray);
    }
  }
};
