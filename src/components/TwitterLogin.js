import { LoginSocialTwitter } from "reactjs-social-login";

const TwitterLogins = ({ setProvider }) => {
  // TWITTER CLIENT ID = iA0r6DXAfYjFBeEdWyVURSM0Q
  //TWITTER SECRET = buUXf26aQl7PWOg2S9z0zwPN_8RS5xTy-VNolSunb0N3kV0kMn]

  return (
    <>
      <LoginSocialTwitter
        client_id={
          process.env.REACT_APP_TWITTER_V2_APP_KEY ||
          "Y0I5UktyV1hMRzFDQTNlcHlkbEM6MTpjaQ"
        }
        redirect_uri={"http://local.meshray-backend.co/api/auth/twitter/callback"}
        onLoginStart={() => console.log("twitter login start")}
        onLogoutSuccess={() => null}
        state={"twitter"}
        onResolve={({ provider, data }) => {
          // setProvider(provider);
          // setProfile(data);
          alert("hit");
          console.log(data);
        }}
        onReject={(err) => {
          alert("not hit");
          console.log(err);
        }}
      >
        <button onClick={() => localStorage.setItem("loginFrom", "twitter")}>
          twitter login
        </button>
      </LoginSocialTwitter>
    </>
  );
};

export default TwitterLogins;
