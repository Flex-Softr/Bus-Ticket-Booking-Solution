import Box from "@mui/material/Box";
import useSuoervisor from "../../hooks/useSuoervisor";
// import EditIcon from "@material-ui/icons/Edit";

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
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllSupervisor = () => {
  const { supervisors, refetch } = useSuoervisor();
  console.log(supervisors);

  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const filteredSupervisor = supervisors.filter(
    (supervisor) =>
      (supervisor.name &&
        supervisor.name.toLowerCase().includes(search.toLowerCase())) ||
      (supervisor.phone &&
        supervisor.phone &&
        supervisor.phone.toLowerCase().includes(search.toLowerCase()))
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
        await axios.delete(`http://localhost:5000/supervisors/${id}`);
        // setRefetch(!refetch);
        refetch();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "An error occurred while deleting the bus.", "error");
    }
  };

  return (
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
          Remaining all Supervisors
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
          <Tooltip title="Add Supervisor" arrow>
            <Link to="/dashboard/addSupervisor">
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
              <TableCell>Phone Number</TableCell>
              <TableCell>NID</TableCell>
              <TableCell>Present Address</TableCell>
              <TableCell>Permanent Address</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          {filteredSupervisor && filteredSupervisor.length > 0 ? (
            <TableBody>
              {filteredSupervisor.map((row, index) => (
                <TableRow
                  key={row._id}
                  onClick={(event) => handleClick(event, row._id)}
                  selected={isSelected(row._id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.nid}</TableCell>

                  <TableCell>{row.presentAddress}</TableCell>
                  <TableCell>{row.permanentAddress}</TableCell>
                  <TableCell>
                    <Link to={`updateSupervisor/${row._id}`}>Edit</Link>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteClick(row._id)}>
                        <DeleteForeverIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
            ></Box>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllSupervisor;
