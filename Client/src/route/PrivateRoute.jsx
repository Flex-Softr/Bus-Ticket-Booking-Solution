import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Components/Providers/AuthProvider/AuthProvider";
import Box from "@mui/material/Box";
import LoadingAnimation from "../../public/loading2.json";
import Lottie from "lottie-react";
import Typography from "@mui/material/Typography";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  let location = useLocation();

  if (loader) {
    return (
      <Box
        height="100vh"
        sx={{ backgroundColor: "#eceff1" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection='column'
        gap='10px'
      >
         <Lottie style={{ height: 200 }} animationData={LoadingAnimation} />
         <Typography variant="h5">Loading...</Typography>

        
      </Box>
    );
  }

  if (user) {
    return children;
  }
  Swal.fire("You have to log in");
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
