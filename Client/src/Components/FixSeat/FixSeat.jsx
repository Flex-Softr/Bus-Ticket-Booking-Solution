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
// import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useSeats from "../../hooks/useSeats";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useSelectedseatbus from "../../hooks/useSelectedseatbus";
import Swal from "sweetalert2";

const FixSeat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { allSeats } = useSeats();
  console.log(allSeats)
  
  const [selectedGender, setSelectedGender] = useState("");
  
  const thesis = useLoaderData();
  console.log(thesis._id);
  
 

  const [selectedSeats, setSelectedSeats] = useState([]);


  const [confirmationSeats, setConfirmationSeats] = useState({});
  const [reservationData, setReservationData] = useState(null);
  const onSubmit = (data,e) => {
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
      seatIds: selectedSeats,
      
    };

    console.log(storedata);

    fetch('http://localhost:5000/seat-reservation',{
      method:"POST",
      headers:{
          'content-type':'application/json'
      },
      body:JSON.stringify(storedata)
  })
  .then(res => res.json())
  .then(result=>{
      console.log(result)
      if(result.insertedId){
          Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Your Post has been saved',
              showConfirmButton: false,
              timer: 1500
          })
e.target.reset();
     }
          
   
           
    
  })

  

    // Add the selected seats to the confirmationSeats object
    setConfirmationSeats((prevSeats) => ({
      ...prevSeats,
      [storedata.busId]: selectedSeats,
    }));

    // Reset the selected seats for the current confirmation
    setSelectedSeats([]);
  };
  console.log("Client-side _id:", thesis?._id);
  useEffect(() => {
    // Fetch reservation data
    fetch(`http://localhost:5000/resarvedSeat/${thesis?._id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching reservation data:", data.error);
        } else {
          setReservationData(data);
        }
      })
      .catch((error) => console.error("Error fetching reservation data:", error));
  }, [thesis?._id,reservationData]);
  
  console.log("reservtion data",reservationData)



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
              {...register("serialNumber", { required: true })}
              defaultValue={thesis?.serialNumber}
              required
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
              required
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
              required
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
                      {row.seats.map((seat) => {
                        const isSeatSelected = selectedSeats.includes(seat.id);

                        // Check if the seat is reserved for a specific gender
                        const reservation =
                          reservationData &&
                          reservationData.find((reservation) =>
                            reservation.seatIds.includes(seat.id)
                          );

                        // Set seat image style based on reservation
                        const seatImageStyle = {
                          backgroundColor: "",
                          borderRadius: "10px",
                          border: isSeatSelected ? "2px solid #000" : "none",
                          cursor: isSeatSelected  ? 'context-menu' : 'pointer',
                        };

                        // Set button disabled state for each gender
                        let isButtonDisabled = false;
                        if (reservation) {
                          if (reservation.gender === "Male") {
                            seatImageStyle.backgroundColor = "#9797D5";
                            isButtonDisabled = true;
                          } else if (reservation.gender === "Female") {
                            seatImageStyle.backgroundColor = "#FA99BC";
                            isButtonDisabled = true;
                          } else if (reservation.gender === "Others") {
                            seatImageStyle.backgroundColor = "#8BB3B4";
                            isButtonDisabled = true;
                          }
                        }

                        return (
                          <li key={seat.id} className="seat cursor-pointer">
                            <img
                              src={seat.imageSrc}
                              alt=""
                              style={seatImageStyle}
                              onClick={() => !isButtonDisabled && handleSeatClick(seat.id)}
                            />
                            
                          </li>
                        );
                      })}
                    </ol>
                  </li>
                ))}
              </ul>
            </div>

          </ol>

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

        

      </div>
            
         
       
     
      <ToastContainer />
    </Box>
  );
};

export default FixSeat;