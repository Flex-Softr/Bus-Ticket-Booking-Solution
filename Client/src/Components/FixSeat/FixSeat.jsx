import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import "./FixSeat.css";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useSeats from "../../hooks/useSeats";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const FixSeat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { allSeats, refetch } = useSeats();

  const [selectedGender, setSelectedGender] = useState("");

  const thesis = useLoaderData();
  console.log(thesis);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const onSubmit = async (data) => {
    if (selectedSeats.length === 0) {
      console.error("Please select a seat before submitting.");
      toast.error("Please select a seat before submitting.");
      return;
    }

    const storedata = {
      departureDate: data?.departureDate,
      pickupPoint: data?.pickupPoint,
      droppingPoint: data?.droppingPoint,
      busType: thesis?.busType,
      busId: thesis?._id,
      serialNumber: data?.serialNumber,
      passengersName: data?.passengersName,
      passengersNumber: data?.passengersNumber,
      gender: data?.gender,
      departureTime: thesis.time,
      seatId: selectedSeats,
    };

    try {
      // Make a POST request to reserve seats
      const response = await axios.post(
        "http://localhost:5000/seat-reservation",
        storedata
      );

      if (response.status === 200) {
        // console.log(response.data);
        toast.success("Reserved a seat for passenger");
        async (reservationId, updateData) => {
          try {
            const response = await axios.put(
              `http://localhost:5000/seat-reservation/${reservationId}`,
              updateData
            );
            console.log(response.data);
            // Handle the response data as needed
          } catch (error) {
            console.error(error);
            // Handle errors
          }
        };
        // Additional logic if the reservation is successful
      } else {
        console.error(response.data.message);
        toast.error("Failed to reserve seat");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleSeatClick = (seatId, reserved, gender) => {
    // Check if the seat is already reserved
    if (reserved && gender) {
      toast.warning("This seat is already reserved.");
      return;
    }

    // Check if the seat is already selected
    const isSeatSelected = selectedSeats.find((seat) => seat.id === seatId);

    // If selected, remove it; otherwise, add it to the array
    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat.id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, { id: seatId }]);
    }

    // Update the seat status in the database
    updateSeatReservationStatus(seatId, { reserved, gender: selectedGender });
  };

  const updateSeatReservationStatus = async (seatId, updateData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/seat-reservation/${seatId}`,
        updateData
      );

      if (response.status === 200) {
        console.log(response.data);
        refetch();
        // Additional logic if the reservation is successful
      } else {
        console.error(response.data.message);
        toast.error("Failed to update seat status");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while updating seat status");
    }
  };

  return (
    <Box className="grid md:grid-cols-2 grid-cols-1 gap-[50px] md:w-10/12 mx-auto my-20">
      <form
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 450, height: 660, margin: "auto" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className="w-full"
              label="Departure Date"
              {...register("departureDate")}
              defaultValue={thesis?.departureDate}
              InputLabelProps={{
                shrink: true,
              }}
              readOnly={true}
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
              defaultValue={thesis?.pickupPoint?.value}
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
              defaultValue={thesis?.droppingPoint?.value}
            />
            {errors.droppingPoint && (
              <span className="text-red-700">This field is required</span>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SL Number"
              // eslint-disable-next-line no-undef
              {...register("serialNumber", { required: true })}
              defaultValue={thesis?.serialNumber}
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
            <RadioGroup
              row
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
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
        <div className="plane ps-7  py-3 w-full">
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
            <div>
              <ul>
                {allSeats.map((row) => (
                  <li key={row.row}>
                    <ol className="seats gap-1">
                      {row.seats.map((seat) => (
                        <li
                          key={seat.id}
                          className={`seat cursor-pointer ${
                            selectedSeats.find(
                              (selectedSeat) => selectedSeat.id === seat.id
                            )
                              ? "selected"
                              : ""
                          } ${seat.reserved ? "reserved" : ""}`}
                          onClick={() =>
                            handleSeatClick(
                              seat.id,
                              selectedGender,
                              seat.reserved
                            )
                          }
                          title={seat.reserved ? "Reserved Seat" : ""}
                          style={{
                            backgroundColor:
                              seat.reserved && seat.gender === "Female"
                                ? "#f76399a6" // Female reserved seat color
                                : seat.reserved && seat.gender === "Male"
                                ? "#544bb99a" // Male reserved seat color
                                : seat.reserved === true
                                ? "#2b75768b"
                                : "", // Default seat color
                            borderRadius: "50%",
                            cursor: seat.reserved ? "context-menu" : "pointer",
                          }}
                          required
                        >
                          {row.gender === "female" && (
                            <img src={seat.femaleImageSrc} alt="" />
                          )}
                          {row.gender !== "female" && (
                            <img src={seat.imageSrc} alt="" />
                          )}
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>

              {/* seat color */}
              <Divider fullWidth />
              <Box
                textAlign="center"
                className="demoseat"
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginTop="20px"
                gap="15px"
              >
                {/* available seat*/}
                <Box>
                  <img
                    style={{ backgroundColor: "", borderRadius: "10px" }}
                    src="https://i.ibb.co/DV9xm9j/D3.png"
                    alt=""
                  />
                  <p>available</p>
                </Box>

                {/* when this seat is for female*/}
                <Box>
                  <img
                    style={{
                      backgroundColor: "#f76399a6",
                      borderRadius: "10px",
                    }}
                    src="https://i.ibb.co/DV9xm9j/D3.png"
                    alt=""
                  />
                  <p>Female</p>
                </Box>

                {/* when this seat is for male*/}
                <Box>
                  <img
                    style={{
                      backgroundColor: "#544bb99a",
                      borderRadius: "10px",
                    }}
                    src="https://i.ibb.co/DV9xm9j/D3.png"
                    alt=""
                  />
                  <p>Male</p>
                </Box>

                {/* when this seat is for others*/}
                <Box>
                  <img
                    style={{
                      backgroundColor: "#2b75768b",
                      borderRadius: "10px",
                    }}
                    src="https://i.ibb.co/DV9xm9j/D3.png"
                    alt=""
                  />
                  <p>Others</p>
                </Box>
              </Box>
            </div>
          </ol>
        </div>
      </div>
      <ToastContainer />
    </Box>
  );
};

export default FixSeat;
