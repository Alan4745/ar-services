import BackgroundImg from "../assets/images/Background.png";

import { ReactComponent as Logo } from "../assets/svgs/LndMark_logo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("oldUser")) {
        navigate("/signIn");
      } else {
        navigate("/onboarding");
      }
    }, 2000);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${BackgroundImg})`,
        height: "100vh",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo
        style={{
          width: "268px",
          height: "83px",
        }}
      />
    </div>
  );
};

export default SplashScreen;
