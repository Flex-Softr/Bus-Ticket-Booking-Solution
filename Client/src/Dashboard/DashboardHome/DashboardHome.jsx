
import Lottie from "lottie-react";
import animationData from "../../../public/dashboard.json";

const DashboardHome = () => {
    return (
        <div>
            <div><h3>Dashboard Data coming soon...</h3></div>
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