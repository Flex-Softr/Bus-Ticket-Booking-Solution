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
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { CiMenuKebab } from "react-icons/ci";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerTop, setheaderTop] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleHeaderTop = () => {
    setheaderTop(!headerTop);
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
              <Link
                className="flex items-center text-blue-600 gap-1"
                to="/login"
              >
                <MdLogin /> Sign In
              </Link>
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
                onClose={handleCloseMenu}
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
                >
                  Buy Tickets
                </Button>
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


