import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../images/logo.png";
const LogoHeader = ({ background }) => {
  const history = useHistory()
  const handleNav = () => {
    history.push('/')
  }
  return (
    <header style={{ "background": background && "#3e0292" }}>
      <div className="container">
        <div className="row logo-row" onClick={handleNav}>
          <div className="col-6">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default LogoHeader;
