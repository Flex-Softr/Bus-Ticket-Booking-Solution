import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Components/Providers/AuthProvider/AuthProvider";
import Box from "@mui/material/Box";

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
      >
        loading...
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
