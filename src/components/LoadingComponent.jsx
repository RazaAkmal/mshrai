import loaderGif from "../images/loading.gif";
const LoadingComponent = () => {
  return (
    <div className="loading">
      <div className="load_cont">
        <img src={loaderGif} alt="loading" />
      </div>
    </div>
  );
};

export default LoadingComponent;
