import MenuItem from "@mui/material/MenuItem";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLogin, MdOutlineEmail } from "react-icons/md";
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { CiMenuKebab } from "react-icons/ci";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import useSingleUser from "../../hooks/useSingleUser";
import Swal from "sweetalert2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerTop, setheaderTop] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { userdata } = useSingleUser();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = ()=>{
    setMenuOpen(false);
  }

  const handleHeaderTop = () => {
    setheaderTop(!headerTop);
    setMenuAnchor(null);
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to logout?",
      text: "You won't be able to access this site!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        handleHeaderTop();
      }
    });
  };

  const Navigation = () => {
    return (
      <>
        <Link to="/">
          <Button className="font-bold">Home</Button>
        </Link>

        <Divider sx={{ bgcolor: "#aaa" }} />
        <Link to="/about">
          <Button className="font-bold">About</Button>
        </Link>
        <Divider sx={{ bgcolor: "#aaa" }} />
        <Link to="/contact">
          <Button className="font-bold">Contact</Button>
        </Link>

        {/* ------------ */}

        <Button
          sx={{ display: { xs: "block", lg: "none" } }}
          variant="contained"
          onClick={handleMenuClick}
        >
          More
        </Button>
        <Menu
          sx={{ marginTop: 1 }}
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleHeaderTop}
        >
          {userdata?.role === "admin" && (
            <>
              <Link to="/dashboard">
                <MenuItem>
                  <DashboardIcon sx={{ marginRight: 1 }} />
                  Dashboard
                </MenuItem>
              </Link>
              <Divider />
            </>
          )} 
          <Link to="/profile"><MenuItem  onClick={handleHeaderTop}>
            <AccountCircleIcon sx={{ marginRight: 1 }} />
            Profile
          </MenuItem ></Link>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ marginRight: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  };

  const HeaderTopContent = () => {
    return (
      <>
        <div className="w-10/12 py-2 md:flex items-center flex-row justify-between mx-auto">
          <ul className="flex md:mb-0 mb-2 items-center text-lg text-gray-500 gap-4">
            <li className="flex items-center">
              <FaPhoneAlt className="style-logo"style={{ fontSize: '20px' }} /> +9123434543
            </li>
            <li className="h-[20px] w-[1px] bg-gray-700"></li>
            <li className="flex items-center">
              <MdOutlineEmail className="style-logo me-1" style={{ fontSize: '28px' }} /> travel@trek.com
            </li>
          </ul>

          <div className="md:flex items-center text-lg space-y-2 md:space-y-0 gap-4">
            <div className="border-2 text-lg flex gap-3 rounded border-gray-400 p-2">
              {user ? (
                <button
                  className="flex items-center capitalize color"
                  onClick={handleLogout}
                >
                  <LogoutIcon /> logout
                </button>
              ) : (
                <Link
                  className="flex items-center color gap-1"
                  to="/login"
                >
                  <MdLogin /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {/* top header */}
      <div className="lg:block hidden border-b bg-gray-50">
        <HeaderTopContent />
      </div>

      {/* (visible on small screens) */}
      <div className="bg-gray-50 lg:hidden ">
        {headerTop && <HeaderTopContent />}
      </div>

      {/* bottom header */}
      <div>
        <div>
          <AppBar
            position="static"
            className="w-10/12 mx-auto shadow-none"
            style={{ backgroundColor: "transparent", color: "black" }}
          >
            <Toolbar className="flex items-center justify-between">
              {/* Menu Icon for Small Screens */}
              <IconButton
                edge="start"
                className="lg:hidden block"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuToggle}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="">
                <img
                  className="img-logo"
                  src="../../../public/logo.png"
                  alt=""
                />
              </Typography>

              {/* Responsive Links (visible on small screens) */}
              <Modal
                sx={{ display: { xs: "flex", lg: "none" } }}
                open={menuOpen}
                onClose={handleMenuToggle}
                aria-labelledby="menu-modal"
                aria-describedby="menu-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    bgcolor: "#FFFFFF",
                    border: "2px solid #aaa",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    fontSize: 20,
                  }}
                >
                <Button style={{backgroundColor: "#dad7d775"}} sx={{display: "flex", justifyContent:"space-between", alignItems: "center"}} onClick={handleClose}>
                  <Typography variant="h6" component="h6">traveltalk</Typography>
                  <HighlightOffIcon />
                </Button>
                  <Navigation />
                </Box>
              </Modal>

              {/* Links (hidden on small screens) */}
              <div className="hidden lg:flex gap-4">
                <Navigation />
              </div>

              {/* Button on the right */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{ display: { xs: "none", lg: "block" } }}
                  variant="contained"
                  onClick={handleMenuClick}
                >
                  More
                </Button>
                <Menu
                  sx={{ marginTop: 1 }}
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleHeaderTop}
                >
                  {userdata?.role === "admin" && (
                    <>
                      <Link to="/dashboard">
                        <MenuItem>
                          <DashboardIcon sx={{ marginRight: 1 }} />
                          Dashboard
                        </MenuItem>
                      </Link>
                      <Divider />
                    </>
                  )}
                  <MenuItem onClick={handleHeaderTop}>
                    <AccountCircleIcon sx={{ marginRight: 1 }} />
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ marginRight: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
                <button onClick={handleHeaderTop} className="lg:hidden block">
                  <CiMenuKebab className="text-2xl" />
                </button>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    </div>
  );
};

export default Header;
