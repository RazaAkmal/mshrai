import logo from "../images/logo.png";
const LogoHeader = () => {
  return (
    <header>
      <div className="container">
        <div className="row logo-row">
          <div className="col-6">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default LogoHeader;
