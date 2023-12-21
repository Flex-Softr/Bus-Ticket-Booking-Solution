/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Box,
} from "@mui/material";
import "./FixSeat.css";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useSeats from "../../hooks/useSeats";

const FixSeat = () => {
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { allSeats } = useSeats();

  const storedData = JSON.parse(localStorage.getItem("formData")) || {};
  console.log("Stored Data:", storedData);

  // Get the stored date from local storage
  const [selectedDate, setSelectedDate] = useState(
    storedData.departureDate || ""
  );

  // const [seatingData, setSeatingData] = useState(null);

  // useEffect(() => {
  //   // Fetch seating data or use the provided JSON directly
  //   // For example, you can fetch data from an API or use local data
  //   const fetchData = async () => {
  //     // Assuming the JSON is stored locally
  //     const response = await fetch("../../../public/seats.json");
  //     const data = await response.json();
  //     setSeatingData(data);
  //   };

  //   fetchData();
  // }, []); // Empty dependency array means useEffect runs only once on mount

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Set default values for form fields
  useEffect(() => {
    Object.entries(storedData).forEach(([key, value]) => {
      if (key !== "date") {
        setValue(key, value.value);
      }
    });
  }, [storedData, setValue]);

  // const onSubmit = (data) => {
  //   console.log(data); // You can handle form submission logic here
  // };

  const [selectedSeat, setSelectedSeat] = useState(null);

  const onSubmit = (data) => {
    // const formDataWithSeat = {
    //   ...data,
    //   selectedSeat: selectedSeat,
    // };
    // console.log(formDataWithSeat, data);
    // Add logic to handle form submission here
    console.log(data);
  };

  useEffect(() => {
    if (selectedSeat !== null) {
      // Do not submit the form automatically when a seat is selected
      // onSubmit({});
      // Reset the selected seat to avoid duplicate submissions
      setSelectedSeat(null);
    }
  }, [selectedSeat]);

  const handleSeatClick = (seatId) => {
    console.log(`Seat clicked: ${seatId}`);
    setSelectedSeat(seatId);
  };

  const thesis = useLoaderData();

  const { serialNumber } = thesis;

  // seat id for changing the design after clicking
  // const handleSeatClick = (seatId) => {
  //   console.log(`Seat clicked: ${seatId}`);
  // };

  return (
    <Box className="grid md:grid-cols-2 grid-cols-1 gap-[50px] md:w-10/12 mx-auto my-20">
      <form
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
        // style={{ maxWidth: 400, height: 630, margin: "auto" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className="w-full"
              type="date"
              label="Departure Date"
              {...register("departureDate")}
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.date && (
              <span className="text-red-700">This field is required</span>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pickup Point"
              {...register("pickupPoint", { required: true })}
            />
            {errors.pickupPoint && (
              <span className="text-red-700">This field is required</span>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dropping Point"
              {...register("droppingPoint", { required: true })}
            />
            {errors.droppingPoint && (
              <span className="text-red-700">This field is required</span>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={serialNumber}
              label="SL Number"
              {...register("slNumber", { required: true })}
            />
            {errors.slNumber && (
              <span className="text-red-700">This field is required</span>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Passengers Name"
              {...register("passengersName", { required: true })}
            />
            {errors.passengersName && (
              <span className="text-red-700">This field is required</span>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Passengers Number"
              {...register("passengersNumber", { required: true })}
            />
            {errors.passengersNumber && (
              <span className="text-red-700">This field is required</span>
            )}
          </Grid>

          <Grid item xs={12}>
            <RadioGroup row>
              <FormControlLabel
                control={<Radio {...register("gender", { required: true })} />}
                label="Male"
                value="Male"
              />
              <FormControlLabel
                control={<Radio {...register("gender", { required: true })} />}
                label="Female"
                value="Female"
              />
              <FormControlLabel
                control={<Radio {...register("gender", { required: true })} />}
                label="Others"
                value="Others"
              />
            </RadioGroup>
            {errors.gender && (
              <span className="text-red-700">This field is required</span>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* bus seat======================================> */}
      <div>
        <div className="plane ps-7 pe-3 py-3 w-full">
          

          <ol>
            <li>
              <ol className="seats ">
                <li className="frontSiteofBus">
                  <h3 className="font-extrabold">Door</h3>
                </li>
                <li className="frontSiteofBus">
                  <img
                    className="steering-wheel "
                    src="https://i.ibb.co/wQHXVnv/wheel.png"
                    alt=""
                  />
                </li>
              </ol>
            </li>

            {/* all seats */}
            {/* all seats */}
            <div>
              <ul>
                {allSeats.map((row) => (
                  <li key={row.row}>
                    <ol className="seats gap-1">
                      {row.seats.map((seat) => (
                        <li
                          key={seat.id}
                          className="seat cursor-pointer"
                          onClick={() => handleSeatClick(seat.id)}
                        >
                          <img src={seat.imageSrc} alt="" />
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
            </div>
          </ol>
        </div>
      </div>
    </Box>
  );
};

export default FixSeat;
