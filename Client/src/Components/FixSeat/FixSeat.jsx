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
    // eslint-disable-next-line no-unused-vars
    setValue,
    formState: { errors },
  } = useForm();

  const { allSeats } = useSeats();


  // const [seatingData, setSeatingData] = useState(null);


  const thesis = useLoaderData();
// console.log(thesis)
const [selectedSeats, setSelectedSeats] = useState([]);
//  const [currentConfirmationSeats, setCurrentConfirmationSeats] = useState([]);
 // eslint-disable-next-line no-unused-vars
 const [confirmationSeats, setConfirmationSeats] = useState({});


  const onSubmit = (data) => {
    // console.log("onsubmit",data)
    const storedata = {
      departureDate: data?.departureDate,
      pickupPoint: data?.pickupPoint,
      droppingPoint:data?.droppingPoint,
      busType:thesis?.busType,
      busId:thesis?._id,
      serialNumber:data?.serialNumber,
      passengersName:data?.passengersName,
      passengersNumber:data?.passengersNumber,
      gender:data?.gender,
      departureTime:thesis.time,
      seatId: selectedSeats,
    };
    console.log(storedata);

    // Add the selected seats to the confirmationSeats object
    setConfirmationSeats((prevSeats) => ({
      ...prevSeats,
      [storedata.busId]: selectedSeats,
    }));

    // Reset the selected seats for the current confirmation
    setSelectedSeats([]);
  };

  const handleSeatClick = (seatId) => {
    console.log(`Seat clicked: ${seatId}`);

    // Check if the seat is already selected
    const isSeatSelected = selectedSeats.includes(seatId);

    // If selected, remove it; otherwise, add it to the array
    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
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
              {...register("serialNumber", { required: true, })}
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
                            selectedSeats === seat.id ? "selected" : ""
                          }`}
                          onClick={() => handleSeatClick(seat.id)}
                        >
                          {/* {if(gender=="male")=>{
                            <img className="" src={seat.imageSrc} alt="" />
                          }} */}
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
