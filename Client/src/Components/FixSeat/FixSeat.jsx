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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useSeats from "../../hooks/useSeats";
import Swal from "sweetalert2";

// Define the FixSeat component
const FixSeat = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch seat data using custom hook
  const { allSeats } = useSeats();

  // Get data from react-router-dom
  const thesis = useLoaderData();

  // State variables for selected and confirmed seats
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmedSeats, setConfirmedSeats] = useState([]);

  // State variable for selected gender
  const [selectedGender, setSelectedGender] = useState("");

  // State variables for reservation data
  const [reservationData, setReservationData] = useState(null);

  // Form submission handler
  const onSubmit = (data, e) => {
    // Prepare data for API request
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

    // Check if any seat is selected
    if (selectedSeats.length > 0) {
      // Show confirmation dialog using SweetAlert
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Make API request for seat reservation
          fetch("http://localhost:5000/seat-reservation", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(storedata),
          })
            .then((res) => res.json())
            .then((result) => {
              // Handle API response
              console.log(result);
              if (result.insertedId) {
                // Show success message using SweetAlert
                Swal.fire({
                  title: "Confirmed!",
                  text: "Your Seat has been Booked.",
                  icon: "success",
                });
    
                // Reset the form
                e.target.reset();
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // If the user clicks the cancel button, unselect the seats
          setSelectedSeats([]);
        }
      });
    } else {
      // If no seat is selected, show an error toast
      toast.error("No Seat Selected ..!");
      return;
    }
    

    // Update the confirmed seats state
    setConfirmedSeats([...confirmedSeats, ...selectedSeats]);

    // Reset the selected seats for the current confirmation
    setSelectedSeats([]);
  };

  // Fetch reservation data using useEffect
  useEffect(() => {
    fetch(`http://localhost:5000/resarvedSeat/${thesis?._id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching reservation data:", data.error);
        } else {
          setReservationData(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching reservation data:", error)
      );
  }, [thesis?._id, reservationData,]);

  // Handle seat click event
  const handleSeatClick = (seatId) => {
    // Check if the seat is confirmed
    const isSeatConfirmed = confirmedSeats.includes(seatId);

    // If confirmed, do nothing
    if (isSeatConfirmed) {
      return;
    }

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
        className="w-full :"
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 450, height: 660 }}
      >
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
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
          </Grid> */}

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
                    <ol className="seats gap-1 ">
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
                          borderRadius: "8px",

                          border: isSeatSelected ? "2px solid #000" : "none",
                          cursor: isSeatSelected ? "context-menu" : "pointer",
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
                          <li
                            key={seat.id}
                            className="seat cursor-pointer mb-1"
                          >
                            <img
                              src={seat.imageSrc}
                              alt=""
                              style={seatImageStyle}
                              onClick={() =>
                                !isButtonDisabled && handleSeatClick(seat.id)
                              }
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
            marginTop="35px"
            marginBottom="20px"
            gap="15px"
          >
            <h5 className="font-bold text-[#143f40]">Seat Indicator</h5>
            {/* available seat*/}
            <Box>
              <img
                style={{ borderRadius: "45%" }}
                src="https://i.ibb.co/9whMc4Q/seat.png"
                alt=""
              />
              <p>available</p>
            </Box>

            {/* when this seat is for female*/}
            <Box>
              <img
                style={{
                  backgroundColor: "#f76399a6",
                  borderRadius: "45%",
                }}
                src="https://i.ibb.co/9whMc4Q/seat.png"
                alt=""
              />
              <p>Female</p>
            </Box>

            {/* when this seat is for male*/}
            <Box>
              <img
                style={{
                  backgroundColor: "#544bb99a",
                  borderRadius: "45%",
                }}
                src="https://i.ibb.co/9whMc4Q/seat.png"
                alt=""
              />
              <p>Male</p>
            </Box>

            {/* when this seat is for others*/}
            <Box>
              <img
                style={{
                  backgroundColor: "#2b75768b",
                  borderRadius: "45%",
                }}
                src="https://i.ibb.co/9whMc4Q/seat.png"
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
