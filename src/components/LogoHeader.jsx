import logo from "../images/logo.png";
const LogoHeader = ({ background }) => {
  return (
    <header style={{ "background": background && "#3e0292" }}>
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
