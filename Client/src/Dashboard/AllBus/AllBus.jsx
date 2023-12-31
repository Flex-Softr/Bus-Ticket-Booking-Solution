import useAllBusData from "../../hooks/useAllBusData";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import "./AllBus.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Swal from "sweetalert2";
import FilterListIcon from '@mui/icons-material/FilterList';

const DataTable = () => {
  const { allBusData, refetch } = useAllBusData();
  console.log(allBusData);

  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allBusData.map((row) => row._id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
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

  const filteredBus = allBusData.filter(
    (bus) =>
      bus.busName.toLowerCase().includes(search.toLowerCase()) ||
      bus.supervisorName.label.toLowerCase().includes(search.toLowerCase())
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
        await axios.delete(`http://localhost:5000/deletebus/${id}`);
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
          remaining all bus
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
          <Tooltip title="Delete" arrow>
            <Link to="/dashboard/addbus">
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
              <TableCell>
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < allBusData.length
                  }
                  checked={selected.length === allBusData.length}
                  onChange={handleSelectAllClick}
                  // onClick={handleDeleteManyClick}
                />
              </TableCell>
              <TableCell>Serial</TableCell>
              <TableCell>Bus Name</TableCell>
              <TableCell>Time</TableCell>
              {/* <TableCell>Pickup Point</TableCell> */}
              <TableCell>Dropping Point</TableCell>
              <TableCell>Supervisor Name</TableCell>
              {/* <TableCell>Supervisor Number</TableCell> */}
              <TableCell>Bus Type</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          {filteredBus && filteredBus.length > 0 ? (
            <TableBody>
              {filteredBus.map((row) => (
                <TableRow
                  key={row._id}
                  onClick={(event) => handleClick(event, row._id)}
                  selected={isSelected(row._id)}
                >
                  <TableCell>
                    <Checkbox checked={isSelected(row._id)} />
                  </TableCell>
                  <TableCell>{row.serialNumber}</TableCell>
                  <TableCell>{row.busName}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  {/* <TableCell>{row.pickupPoint.label}</TableCell> */}
                  <TableCell>{row.droppingPoint.label}</TableCell>
                  <TableCell>{row.supervisorName.label}</TableCell>
                  <TableCell>{row.busType}</TableCell>
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
                // backgroundColor: "#eceff1",
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
                No Bus Available
              </Typography>
            </Box>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
