// import { useEffect, useState } from "react";
import "./Home.css";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useAllDistricts from "../../hooks/useAllDistricts";

const Home = () => {
  const { allDistricts } = useAllDistricts();

  const { handleSubmit, control } = useForm();
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

  return (
    <div className="find-ticket-Section">
      <div className="grid md:grid-cols-2 sm:grid-cols-1">
        <div>
          <img
            className="home-img mx-auto mt-24"
            src="https://i.ibb.co/8PtKyKn/bus-tickets-2.jpg"
            alt=""
          />
        </div>
        <div className="form-section text-center mt-36">
          <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex mx-auto md:gap-6 md:ms-6">
              <div>
                <Controller
                  name="pickupPoint"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="md:w-60 field-style p-2"
                      options={ticketOptions}
                      isSearchable
                      placeholder="Select PickUp Point"
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="droppingPoint"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="md:w-60 field-style p-2"
                      options={ticketOptions}
                      isSearchable
                      placeholder="Select Dropping Point"
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <Controller
                name="departureDate"
                control={control}
                render={({ field }) => (
                  <input
                    type="date"
                    placeholder="Select Date"
                    {...field}
                    className="w-11/12 p-2 field-style my-5"
                  />
                )}
              />
            </div>

            <div className="mt-2">
              <Button type="submit" variant="contained">
                Find Tickets
              </Button>
              {/* <button type="submit" className="p-2 text-white w-60">
                Find Tickets
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
