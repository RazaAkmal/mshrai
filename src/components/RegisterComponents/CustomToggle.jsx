import { useAccordionButton } from "react-bootstrap";

const CustomToggle = ({ children, eventKey, shoeaccor, setShowAccor }) => {
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => setShowAccor(!shoeaccor)
    // console.log('totally custom!'),
  );

  return (
    <button
      type="button"
      style={{
        border: "none",
        display: "-webkit-box",
        backgroundColor: "#f7f9fa",
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
};
export default CustomToggle;
