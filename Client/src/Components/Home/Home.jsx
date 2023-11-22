import React from 'react';
import "./Home.css"
import { useForm, Controller } from 'react-hook-form';
// import { FaCaretUp } from "react-icons/fa";
const Home = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
   <div className='find-ticket-Section'>
     <div className=" grid md:grid-cols-2 sm:grid-cols-1">
      <div>
        <img className='home-img mx-auto mt-24' src="https://i.ibb.co/8PtKyKn/bus-tickets-2.jpg" alt="" />
      </div>
      <div className='form-section text-center mt-36'> {/* Move text-center class here */}
        <form className='mt-7' onSubmit={handleSubmit(onSubmit)}>
          <div className='md:flex mx-auto md:gap-6  md:ms-6'>
            <div>
              <Controller
                name="pickupPoint"
                control={control}
                
                render={({ field }) => (
                  <select {...field} className="md:w-60 field-style p-2">
                    
                    <option value="place1">PickUp Point</option>
                    <option value="place2">Dhaka</option>
                    <option value="place3">Cumilla</option>
                    <option value="place4">cox's Bazar</option>
                    {/* Add more options as needed */}
                  </select>
                )}
              />
            </div>

            <div>
              <Controller
                name="droppingPoint"
                control={control}
                render={({ field }) => (
                  <select {...field} className="md:w-60  field-style p-2">
                    <option value="place1">Dropping Point</option>
                    <option value="place2">Dhaka</option>
                    <option value="place3">Cumilla</option>
                    <option value="place4">cox's Bazar</option>
                    {/* Add more options as needed */}
                  </select>
                )}
              />
            </div>
          </div>

          <div>
            <Controller
              name="departureDate"
              control={control}
              render={({ field }) => (
                <input type="date" placeholder='Select Date' {...field} className="w-11/12 p-2 field-style my-5" />
              )}
            />
          </div>

          <div className="mt-2">
            <button type="submit" className="p-2 bg-blue-500 text-white w-60">Find Tickets</button>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
};

export default Home;
