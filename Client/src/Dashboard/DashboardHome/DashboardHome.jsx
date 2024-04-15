import Lottie from "lottie-react";
import animationData from "../../../public/dashboard.json";
import { Helmet } from "react-helmet-async";

const DashboardHome = () => {
  return (
    <div>
      <Helmet>
        <title> TravelTrek - Dashboard Home </title>
      </Helmet>
      <div>
        <h3>Dashboard Data is coming soon...</h3>
      </div>
      <Lottie
        className="loginAnimation"
        animationData={animationData}
        loop
        autoplay
        style={{
          width: "100%",
          maxWidth: "880px",
          height: "auto",
        }}
      />
    </div>
  );
};

export default DashboardHome;
