import Select from "@mui/material/Select";
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
import { LuUserPlus } from "react-icons/lu";
import { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { CiMenuKebab } from "react-icons/ci";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import useSingleUser from "../../hooks/useSingleUser";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerTop, setheaderTop] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { userdata } = useSingleUser();
  console.log(userdata)

  console.log(user);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHeaderTop = () => {
    setheaderTop(!headerTop);
    setMenuAnchor(null);
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    handleHeaderTop();
  };

  const Navigation = () => {
    return (
      <>
        <Link to="/">
          <Button color="inherit">Home</Button>
        </Link>

        <Divider sx={{ bgcolor: "#aaa" }} />
        <Link to="/about">
          <Button color="inherit">About</Button>
        </Link>
        <Divider sx={{ bgcolor: "#aaa" }} />
        <Link to="/service">
          <Button color="inherit">Service</Button>
        </Link>
        <Divider sx={{ bgcolor: "#aaa" }} />
        <Link to="/contact">
          <Button color="inherit">Contact</Button>
        </Link>
      </>
    );
  };

  const HeaderTopContent = () => {
    return (
      <>
        <div className="w-10/12 py-2 md:flex items-center flex-row justify-between mx-auto">
          <ul className="flex md:mb-0 mb-2 items-center text-lg text-gray-500 gap-4">
            <li className="flex items-center">
              <FaPhoneAlt className="text-blue-600" /> +9123434543
            </li>
            <li className="h-[20px] w-[1px] bg-gray-700"></li>
            <li className="flex items-center">
              <MdOutlineEmail className="text-blue-600" /> helloeasy.co
            </li>
          </ul>

          <div className="md:flex items-center text-lg space-y-2 md:space-y-0 gap-4">
            <div>
              <Select
                value="en"
                className="langSel"
                variant="outlined"
                sx={{ padding: 0 }}
                fullWidth
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hn">Hindi</MenuItem>
                <MenuItem value="bn">Bangla</MenuItem>
              </Select>
            </div>

            <div className="border-2 text-lg flex gap-3 rounded border-gray-400 p-2">
              {user ? (
                <button
                  className="flex items-center capitalize text-blue-600"
                  onClick={handleLogout}
                >
                  <LogoutIcon /> logout
                </button>
              ) : (
                <Link
                  className="flex items-center text-blue-600 gap-1"
                  to="/login"
                >
                  <MdLogin /> Sign In
                </Link>
              )}
              <span>/</span>
              <Link className="flex items-center gap-1" to="/signup">
                <LuUserPlus /> Sign Up
              </Link>
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

              <Typography variant="h5">Your Logo</Typography>

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
                    top: "60px",
                    left: "0",
                    width: "100%",
                    bgcolor: "#1b273d",
                    color: "#FFFFFF",
                    border: "2px solid #aaa",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    fontSize: 20,
                  }}
                >
                  {/* <Button onClick={handleCloseMenu}>Close</Button> */}

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
                {
                userdata?.role === 'admin' && <>
               <Link to='/dashboard'>
               <MenuItem>
                    <DashboardIcon sx={{ marginRight: 1 }} />
                    Dashboard
                  </MenuItem>
               </Link>
                   <Divider />
                </>
                }
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
