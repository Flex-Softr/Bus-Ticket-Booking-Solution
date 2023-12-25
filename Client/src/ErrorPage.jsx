import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ErrorAnimation from "../public/errorPage.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#f6f6f6] px-5">
      <div className="text-center h-screen flex items-center justify-center flex-col md:w-1/2 mx-auto ">
        <Lottie style={{ height: 300 }} animationData={ErrorAnimation} />
        <h3 className="text-[#65676b] text-[20px] font-bold">{`This content isn't available right now`}</h3>
        <p className="text-[#65676b] mb-4 text-[17px]">{`When this happens, it's usually because the owner only shared it with a small group of people, changed who can see it or it's been deleted.`}</p>
        <Box className="flex items-center justify-center gap-4">
          <Button onClick={goBack} variant="contained">
            <ArrowBackIosIcon />
            Go Back
          </Button>

          <Box className="h-[40px] w-[1px]" 
          sx={{ backgroundColor: theme => theme.palette.primary.main }}
        //   backgroundColor='primary' 
        //   sx={{ backgroundColor: "primary" }}
          ></Box>

          <Link to="/">
            <Button variant="outlined">
                <HomeOutlinedIcon />
              Go Home
            </Button>
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default ErrorPage;
