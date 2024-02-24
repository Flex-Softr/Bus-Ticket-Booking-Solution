import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
// import { ArrowForward, DirectionsBus } from "@mui/icons-material";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import { Helmet } from "react-helmet-async";

function FindTicket() {
  const { control, setValue } = useForm();

  // Retrieve data from local storage
  const storedData = JSON.parse(localStorage.getItem("formData")) || {};
  // console.log("Stored Data:", storedData);

  useEffect(() => {
    Object.entries(storedData).forEach(([key, value]) => {
      if (key !== "date") {
        setValue(key, value.value);
      }
    });
  }, [storedData, setValue]);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/ticket") // Replace with your actual endpoint
      .then((res) => res.json())
      .then((data) => {
        // Assuming the array of tickets is in the response
        setTickets(data || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Convert the tickets array to options format required by react-select
  const ticketOptions = tickets.map((ticket) => ({
    value: ticket.name,
    label: ticket.name,
  }));

  const [allBusData, setAllBusData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allbus")
      .then((res) => res.json())
      .then((data) => {
        setAllBusData(data || []);
      })
      .catch((error) => console.error("Error fetching all bus data:", error));
  }, []);

  return (
    <>
      <Helmet>
        <title> TravelTrek - Find Ticket </title>
      </Helmet>
      <div>
        <Box component="form" className="bg-gray-50 rounded flex py-10 mt-10">
          <FormControl fullWidth className="p-2 m-1">
            <InputLabel htmlFor="pickupPoint">
              <LocationOffIcon fontSize="medium" /> pickupPoint
            </InputLabel>
            <Controller
              name="pickupPoint"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} isSearchable>
                  {storedData.pickupPoint && (
                    <MenuItem value={storedData.pickupPoint.value}>
                      {storedData.pickupPoint.label}
                    </MenuItem>
                  )}

                  {ticketOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth className="p-2 m-1">
            <InputLabel htmlFor="droppingPoint">
              <LocationOffIcon fontSize="medium" /> Dropping Point
            </InputLabel>

            <Controller
              name="droppingPoint"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} displayEmpty>
                  {storedData.droppingPoint && (
                    <MenuItem value={storedData.droppingPoint.value}>
                      {storedData.droppingPoint.label}
                    </MenuItem>
                  )}

                  {ticketOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>
      </div>
    </>
  );
}

export default FindTicket;
