import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
const LogoHeader = ({ background, children }) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/");
  };
  return (
    <header style={{ background: background && "#3e0292" }}>
      <div className="container-fluid">
        <div className="row logo-row " onClick={handleNav}>
          {/* <div className="col-8 d-flex align-items-center">{children}</div> */}
          <Link to="/" className="col-6">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LogoHeader;
