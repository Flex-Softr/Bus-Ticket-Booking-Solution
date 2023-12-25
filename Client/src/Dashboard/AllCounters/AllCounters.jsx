import useAllAddAccount from "../../hooks/useAllAddAccount";
import { useState } from "react";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  // Checkbox,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const AllCounters = () => {
  const { allaccountData, refetch } = useAllAddAccount();
  const [displayedAccounts, setDisplayedAccounts] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredAccount = allaccountData.filter(
    (account) =>
      account.account_name &&
      account.account_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`https://server-khaki-theta.vercel.app/delete-account/${id}`);
        refetch();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error!",
        "An error occurred while deleting this account.",
        "error"
      );
    }
    const updatedAccounts = allaccountData.filter(
      (account) => account._id !== id
    );
    setDisplayedAccounts(updatedAccounts);
  };
  return (
    <>
      <Helmet>
        <title> TravelTrek - All Counter </title>
      </Helmet>
      {/* admin data section from here.. */}
      <Box
        sx={{ backgroundColor: "#fff", borderRadius: "3px" }}
        className="md:px-5 py-10 lg:w-11/12 mx-auto"
        style={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Typography
            variant="h5"
            marginBottom="0"
            textTransform="capitalize"
            gutterBottom
          >
            all admin account
          </Typography>
          <Box display="flex" alignItems="center" gap="5px">
            <Box position="relative" width="200px">
              <Input
                title="search by supervisor name or bus name"
                type="text"
                onChange={handleSearch}
                placeholder="Search..."
                className="border-b-2 py-1 w-full"
              />
              <SearchIcon
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "0",
                  color: "#999",
                  cursor: "text",
                }}
              />
            </Box>
            <Tooltip title="Add Admin" arrow>
              <Link to="/dashboard/add-counter">
                <IconButton>
                  <AddBoxIcon color="primary" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Filter" arrow>
              <IconButton>
                <FilterListIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <TableContainer component={Paper} className="w-full">
          <Table width="100%">
            <TableHead>
              <TableRow
                style={{ color: "#fff" }}
                sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
              >
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            {filteredAccount && filteredAccount.length > 0 ? (
              <TableBody>
                {filteredAccount.map((row, index) => (
                  <TableRow key={row._id}>
                    {row.role === "admin" && (
                      <>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.account_name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.password}</TableCell>
                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDeleteClick(row._id)}
                            >
                              <DeleteForeverIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <Box
                height="20vh"
                width="100%"
                sx={{
                  color: "#999",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  marginBottom="0"
                  textTransform="capitalize"
                  gutterBottom
                >
                  No Account Available
                </Typography>
              </Box>
            )}
          </Table>
        </TableContainer>
      </Box>
      {/* counter data section from here.. */}
      <Box
        sx={{ backgroundColor: "#fff", borderRadius: "3px" }}
        className="md:px-5 py-10 lg:w-11/12 mx-auto mt-6"
        style={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Typography
            variant="h5"
            marginBottom="0"
            textTransform="capitalize"
            gutterBottom
          >
            all counter account
          </Typography>
          <Box display="flex" alignItems="center" gap="5px">
            <Box position="relative" width="200px">
              <Input
                title="search by supervisor name or bus name"
                type="text"
                onChange={handleSearch}
                placeholder="Search..."
                className="border-b-2 py-1 w-full"
              />
              <SearchIcon
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "0",
                  color: "#999",
                  cursor: "text",
                }}
              />
            </Box>
            <Tooltip title="Add Counter" arrow>
              <Link to="/dashboard/add-counter">
                <IconButton>
                  <AddBoxIcon color="primary" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Filter" arrow>
              <IconButton>
                <FilterListIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <TableContainer component={Paper} className="w-full">
          <Table width="100%">
            <TableHead>
              <TableRow
                style={{ color: "#fff" }}
                sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
              >
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            {filteredAccount && filteredAccount.length > 0 ? (
              <TableBody>
                {filteredAccount.map((row, index) => (
                  <TableRow key={row._id}>
                    {row.role === "user" && (
                      <>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.account_name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.password}</TableCell>
                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDeleteClick(row._id)}
                            >
                              <DeleteForeverIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <Box
                height="20vh"
                width="100%"
                sx={{
                  color: "#999",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  marginBottom="0"
                  textTransform="capitalize"
                  gutterBottom
                >
                  No Account Available
                </Typography>
              </Box>
            )}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AllCounters;
