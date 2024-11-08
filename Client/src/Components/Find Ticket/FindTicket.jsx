// import { useEffect, useState, useMemo } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Box, Typography, TextField, FormControl, Button, RadioGroup, Radio, FormControlLabel } from "@mui/material";

// import ShowTicket from "./ShowTicket";
// import { Helmet } from "react-helmet-async";
// import Select from "react-select";

// function FindTicket() {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [normalizedBusTickets, setNormalizedBusTickets] = useState([]);
//   const { control, handleSubmit, register, setValue } = useForm();

//   // Retrieve data from local storage and memoize it
//   const storedData = useMemo(() => {
//     return JSON.parse(localStorage.getItem("formData")) || {};
//   }, []);

//   useEffect(() => {
//     Object.entries(storedData).forEach(([key, value]) => {
//       if (key !== "date") {
//         setValue(key, value);
//       }
//     });
//   }, [storedData, setValue]);

//   const [selectedDate, setSelectedDate] = useState(storedData.departureDate || "");

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const [allZillaOptions, setAllZillaOptions] = useState([]);

//   useEffect(() => {
//     fetch("https://bus-server-ucdk.onrender.com/allZilla")
//       .then((res) => res.json())
//       .then((data) => {
//         const zillaOptions = data.map((zilla) => ({
//           value: zilla.value,
//           label: zilla.label,
//         }));
//         setAllZillaOptions(zillaOptions);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const [allBusData, setAllBusData] = useState([]);

//   useEffect(() => {
//     fetch("https://bus-server-ucdk.onrender.com/allbus")
//       .then((res) => res.json())
//       .then((data) => {
//         setAllBusData(data || []);
//       })
//       .catch((error) => console.error("Error fetching all bus data:", error));
//   }, []);

//   const onSubmit = (data) => {
//     data.selectedZilla = selectedOption;
//     console.log("Form Data:", data);

//     const filteredBusData = allBusData.filter((bus) => {
//       const selectedZillaValues = data.selectedZilla.map((zilla) => zilla.value);

//       return (
//         (data.zillaSearch
//           ? data.zillaSearch?.some((selectedZilla) =>
//               selectedZillaValues?.includes(selectedZilla?.value?.toLowerCase())
//             )
//           : true) &&
//         bus?.busType?.toLowerCase() === data?.type?.toLowerCase()
//         // Additional conditions if needed
//       );
//     });

//     setNormalizedBusTickets(filteredBusData);

//     // Save form data to local storage
//     const formDataToSave = {
//       pickupPoint: data.pickupPoint,
//       droppingPoint: data.droppingPoint,
//       departureDate: data.departureDate,
//       zillaSearch: data.zillaSearch,
//       type: data.type,
//     };

//     localStorage.setItem("formData", JSON.stringify(formDataToSave));
//   };

//   console.log(normalizedBusTickets);

//   return (
//     <>
//       <Helmet>
//         <title> TravelTrek - Find Ticket </title>
//       </Helmet>
//       <div className="flex bg-slate-600">
//         <div className="flex flex-wrap grow gap-4 pb-20 mt-10 bg-gray-200">
//           {/* find ticket form section */}
//           <div className="basis-3/12 grow">
//             <div className="mt-12 px-4 h-full max-w-full">
//               <Box component="form" className="bg-gray-50 rounded">
//                 <div className="p-3 mr-2">
//                   <Typography className="text-center text-xl p-3 font-semibold">
//                     View Vehicle
//                   </Typography>

//                   <FormControl fullWidth className="p-2 m-1">
//                     <Controller
//                       name="pickupPoint"
//                       control={control}
//                       defaultValue=""
//                       render={({ field }) => (
//                         <Select
//                           {...field}
//                           isSearchable
//                           options={allZillaOptions}
//                           value={allZillaOptions.find(option => option.value === field.value)}
//                           onChange={(val) => field.onChange(val.value)}
//                           placeholder="Select PickUp Point"
//                         />
//                       )}
//                     />
//                   </FormControl>

//                   <FormControl fullWidth className="p-2 m-1">
//                     <Controller
//                       name="droppingPoint"
//                       control={control}
//                       defaultValue=""
//                       render={({ field }) => (
//                         <Select
//                           {...field}
//                           isSearchable
//                           options={allZillaOptions}
//                           value={allZillaOptions.find(option => option.value === field.value)}
//                           onChange={(val) => field.onChange(val.value)}
//                           placeholder="Select Dropping Point"
//                         />
//                       )}
//                     />
//                   </FormControl>

//                   {/* -------------- multi selected input field ----------- */}
//                   <FormControl fullWidth className="p-2 m-1">
//                     <Select
//                       defaultValue={selectedOption}
//                       onChange={setSelectedOption}
//                       options={allZillaOptions}
//                       placeholder="Search by Zilla 🚌"
//                       isMulti
//                     />
//                   </FormControl>

//                   {/* Updated code for departure date */}
//                   <FormControl fullWidth className="p-2 m-1">
//                     <TextField
//                       type="date"
//                       label="Departure Date"
//                       {...register("departureDate")}
//                       value={selectedDate}
//                       onChange={handleDateChange}
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                     />
//                   </FormControl>

//                   <Typography className="text-md font-semibold px-2 mt-2">
//                     Vehicle Type
//                   </Typography>

//                   <FormControl component="fieldset">
//                     <RadioGroup aria-label="type" name="type">
//                       <FormControlLabel
//                         value="Non-AC"
//                         control={<Radio {...register("type")} />}
//                         label="Non AC"
//                       />
//                       <FormControlLabel
//                         value="ac"
//                         control={<Radio {...register("type")} />}
//                         label="AC"
//                       />
//                     </RadioGroup>
//                   </FormControl>

//                   <Button
//                     fullWidth
//                     onClick={handleSubmit(onSubmit)}
//                     variant="contained"
//                     className="mt-3 p-2"
//                   >
//                     Find Tickets
//                   </Button>
//                 </div>
//               </Box>
//             </div>
//           </div>
//           {/* all buses view section */}
//           <div className="basis-8/12 grow">
//             <ShowTicket
//               normalizedBusTickets={normalizedBusTickets}
//               setNormalizedBusTickets={setNormalizedBusTickets}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FindTicket;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Radio,
  Box,
  Typography,
  TextField,
 
  FormControl,
  FormControlLabel,
  Button,
  
  RadioGroup,
} from "@mui/material";

import ShowTicket from "./ShowTicket";
import { Helmet } from "react-helmet-async";
import useAllZilla from "../../hooks/useAllZilla";
import Select from "react-select";

function FindTicket() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [normalizedBusTickets, setNormalizedBusTickets] = useState([]);
  const { allZilla } = useAllZilla();
  const { control, handleSubmit, register, setValue } = useForm();

  // Retrieve data from local storage
  const storedData = JSON.parse(localStorage.getItem("formData")) || {};

  useEffect(() => {
    if (storedData) {
      setValue("pickupPoint", storedData.pickupPoint.value);
      setValue("droppingPoint", storedData.droppingPoint.value);
      setSelectedDate(storedData.departureDate);
      setSelectedOption(storedData.zillaSearch || null);
    }
  }, [storedData, setValue]);

  const [selectedDate, setSelectedDate] = useState(storedData.departureDate || "");
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    fetch("https://bus-server-ucdk.onrender.com/ticket") // Replace with your actual endpoint
      .then((res) => res.json())
      .then((data) => setTickets(data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const ticketOptions = tickets.map((ticket) => ({
    value: ticket.name,
    label: ticket.name,
  }));

  const [allBusData, setAllBusData] = useState([]);
  useEffect(() => {
    fetch("https://bus-server-ucdk.onrender.com/allbus")
      .then((res) => res.json())
      .then((data) => setAllBusData(data || []))
      .catch((error) => console.error("Error fetching all bus data:", error));
  }, []);

  const onSubmit = (data) => {
    data.selectedZilla = selectedOption;

    const filteredBusData = allBusData.filter((bus) => {
      const selectedZillaValues = data.selectedZilla?.map((zilla) => zilla.value);

      return (
        (!data.zillaSearch ||
          data.zillaSearch.some((selectedZilla) =>
            selectedZillaValues.includes(selectedZilla.value.toLowerCase())
          )) &&
        bus.busType.toLowerCase() === data.type.toLowerCase()
      );
    });

    setNormalizedBusTickets(filteredBusData);

    const formDataToSave = {
      pickupPoint: { value: data.pickupPoint, label: data.pickupPoint },
      droppingPoint: { value: data.droppingPoint, label: data.droppingPoint },
      departureDate: data.departureDate,
      zillaSearch: data.zillaSearch,
      type: data.type,
    };

    localStorage.setItem("formData", JSON.stringify(formDataToSave));
  };

  return (
    <>
      <Helmet>
        <title>TravelTrek - Find Ticket</title>
      </Helmet>
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
                    <h3 className="m-1 text-gray-500">PickUp Point</h3>
                    <Controller
                      name="pickupPoint"
                      control={control}
                      defaultValue={storedData.pickupPoint?.value || ""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={ticketOptions}
                          value={
                            ticketOptions.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                          onChange={(selected) => field.onChange(selected.value)}
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl fullWidth className="p-2 m-1">
                  <h3 className="m-1 text-gray-500">Dropping Point</h3>
                    <Controller
                    
                      name="droppingPoint"
                      control={control}
                      defaultValue={storedData.droppingPoint?.value || ""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={ticketOptions}
                          value={
                            ticketOptions.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                          onChange={(selected) => field.onChange(selected.value)}
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl fullWidth className="p-2 m-1">
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={allZilla}
                      placeholder="search by zilla 🚌"
                      isMulti
                    />
                  </FormControl>

                  <FormControl fullWidth className="p-2 m-1">
                    <TextField
                      type="date"
                      label="Departure Date"
                      {...register("departureDate")}
                      value={selectedDate}
                      onChange={handleDateChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>

                  <Typography className="text-md font-semibold px-2 mt-2">
                    Vehicle Type
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="type" name="type">
                      <FormControlLabel
                        value="Non-AC"
                        control={<Radio {...register("type")} />}
                        label="Non AC"
                      />
                      <FormControlLabel
                        value="AC"
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
            <ShowTicket
              normalizedBusTickets={normalizedBusTickets}
              setNormalizedBusTickets={setNormalizedBusTickets}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FindTicket;
