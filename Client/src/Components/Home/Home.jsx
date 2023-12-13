// import { useEffect, useState } from "react";
import "./Home.css";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useAllDistricts from "../../hooks/useAllDistricts";
import bgskyline from "../../../public/cityskyline.svg"
import Lottie from "lottie-react";
import bus from "../../../public/bus2.json"
import text from "../../../public/coffe2.png"
// import cloud from "../../../public/cloud.json"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = () => {
  const { allDistricts } = useAllDistricts();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Convert the tickets array to options format required by react-select
  const ticketOptions = allDistricts.map((ticket) => ({
    value: ticket.name,
    label: ticket.name,
  }));

  const onSubmit = (data) => {
    // Handle form submission logic here

    // Save data to local storage
    localStorage.setItem("formData", JSON.stringify(data));
    console.log(data);

    // Corrected navigation
    navigate("/find-ticket");
  };


  // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  return (
    <div className="find-ticket-Section bg-[#ff5f0212] relative py-24 md:overflow-hidden overflow-x-hidden" >
      <div className="text-img md:w-[100%] md:mt-0 absolute top-10 md:top-0">
      <img src={text} alt="" />
      </div>
      <div className="md:flex items-center justify-center">
        <div className="md:absolute -z-20 top-5 md:h-full h-[350px]  flex w-full overflow-hidden">
          <img
            className="home-img w-full h-[500px] mx-auto"
            src={bgskyline}
            alt=""
          />
          <img
            className="home-img w-full h-[500px] mx-auto"
            src={bgskyline}
            alt=""
          />
        </div>
        <div className="absolute -z-10 top-[219px] infiniteAnimation w-[100vw] overflow-hidden">
        <Lottie style={{ height: 300 }} animationData={bus} />
        </div>
        <span className="hidden md:block" style={{height: '2px', width: '100%' ,position:'absolute', bottom:'78px' , background: '#143f40'}}></span>
        <div className="w-[350px]">

        </div>
        <Box sx={{ backgroundColor: "#ffffff", borderRadius: "3px" }} className="py-3 text-center md:w-[550px] w-full md:mt-7 md:mb-10"
         style={{ boxShadow: " rgba(0, 0, 0, 0.35) 0px 3px 8px" }}
         >
          <Typography component="h4" variant="h5">
          Make a seat
            </Typography>
          <form className="mt-3 " onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex mx-auto md:gap-0 justify-center">
              <div>
                <Controller
                  name="pickupPoint"
                  control={control}
                  rules={{ required: "PickUp Point is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="md:w-60 field-style point p-2"
                      options={ticketOptions}
                      isSearchable
                      placeholder="Select PickUp Point"
                    />
                  )}
                />

                {errors.pickupPoint && (
                  <p style={{ color: "red" }}>{errors.pickupPoint.message}</p>
                )}
              </div>

              <div>
                <Controller
                  name="droppingPoint"
                  control={control}
                  rules={{ required: "dropping Point is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="md:w-60 field-style point p-2"
                      options={ticketOptions}
                      isSearchable
                      placeholder="Select Dropping Point"
                    />
                  )}
                />
                {errors.droppingPoint && (
                  <p style={{ color: "red" }}>{errors.droppingPoint.message}</p>
                )}
              </div>
            </div>
            <div>
              <Controller
                name="departureDate"
                control={control}
                
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <input
                    type="date"
                    placeholder="Select Date"
                    {...field}
                    className="md:w-10/12 mx-2 p-2 field-style mb-5 border-[#143f40] mt-3"
                  />
                )}
              />
              {errors.departureDate && (
                <p style={{ color: "red" }}>{errors.departureDate.message}</p>
              )}
            </div>
            <div>
              <Button type="submit" variant="contained">
                Find Tickets
              </Button>
            </div>
          </form>
          <br />
        </Box>
      </div>
    </div>
  );
};

export default Home;
