import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Radio,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Button,
  InputLabel,
  RadioGroup,
} from "@mui/material";
// import { ArrowForward, DirectionsBus } from "@mui/icons-material";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import ShowTicket from "./ShowTicket";

function FindTicket() {
  const { control, handleSubmit, register, setValue } = useForm();

  // Retrieve data from local storage
  const storedData = JSON.parse(localStorage.getItem("formData")) || {};
  console.log("Stored Data:", storedData);

  // Set default values for form fields
  useEffect(() => {
    Object.entries(storedData).forEach(([key, value]) => {
      setValue(key, value.value);
    });
  }, [storedData, setValue]);

  const [selectedDate, setSelectedDate] = useState(
    storedData.departureDate || ""
  );

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

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

  const onSubmit = (data) => {
    console.log(data);
    // find ticket form logic code
  };

  return (
    <>
      <div className="flex bg-slate-600">
        <div className="flex flex-wrap grow gap-4 pb-20 mt-10 bg-gray-200">
          {/* find ticket form section */}
          <div className="basis-3/12 grow">
            <div className="mt-12 px-4 h-full max-w-full">
              <Box component="form" className="bg-gray-50 rounded">
                <div className="p-3 mr-2">
                  <Typography className="text-center text-xl p-3 font-semibold">
                    View Vehicle
                  </Typography>

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

                  <TextField
                    type="date"
                    label="Departure Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <Typography className="text-md font-semibold px-2 mt-2">
                    Vehicle Type
                  </Typography>

                  <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type">
                      <FormControlLabel
                        value="nonAC"
                        control={<Radio {...register("type")} />}
                        label="Non AC"
                      />
                      <FormControlLabel
                        value="ac"
                        control={<Radio {...register("type")} />}
                        label="AC"
                      />
                    </RadioGroup>
                  </FormControl>

                  <Button
                    fullWidth
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    className="mt-3 p-2"
                  >
                    Find Tickets
                  </Button>
                </div>
              </Box>
            </div>
          </div>
          {/* all buses view section */}
          <div className="basis-8/12 grow">
            {/* <div className="h-full max-w-full mt-12 px-4">
              <div className="flex flex-wrap justify-center items-center bg-gray-50 rounded">
                <div className="basis-6/12 grow p-2 mb-2">
                  <Typography className="font-semibold text-xl">
                    UNIQUE - MOTIJHEEL-COXSBAZAR
                  </Typography>
                  <Typography
                    varient="span"
                    className="block my-1 text-gray-500"
                  >
                    Seat Layout 2x2
                  </Typography>
                  <Typography
                    varient="span"
                    className="inline-block text-yellow-400 my-1"
                  >
                    <DirectionsBus />
                    UNIQUE
                  </Typography>
                </div>
                <div className="basis-6/12 flex justify-evenly grow p-2">
                  <div>
                    <Typography varient="p" className="text-md font-semibold">
                      6:30 pm
                    </Typography>
                    <Typography varient="p" className="text-gray-500">
                      Motijheel
                    </Typography>
                  </div>
                  <div>
                    <ArrowForward className="mx-auto block text-blue-400" />
                    <Typography
                      varient="p"
                      className="text-sm mx-1 text-gray-500"
                    >
                      10:30 min
                    </Typography>
                  </div>
                  <div>
                    <Typography varient="p" className="text-md font-semibold">
                      7:30 pm
                    </Typography>
                    <Typography varient="p" className="text-gray-500">
                      CoxsBazar
                    </Typography>
                  </div>
                </div>
                <div className="basis-full grow">
                  <Button
                    variant="contained"
                    className="px-6 py-2 my-3 mx-auto block"
                  >
                    Select Seat
                  </Button>
                </div>
              </div>
            </div> */}
            <ShowTicket />
          </div>
        </div>
      </div>
    </>
  );
}

export default FindTicket;
