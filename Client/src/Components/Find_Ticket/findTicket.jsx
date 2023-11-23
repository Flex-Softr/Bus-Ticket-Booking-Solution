import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
} from "@mui/material";
import { ArrowForward, DirectionsBus } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import DatePicker from "@mui/lab/DatePicker";
function FindTicket() {
  const { control, handleSubmit, register } = useForm();
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
                    <InputLabel htmlFor="pickUpPoint">
                      <LocationOnIcon fontSize="medium" /> Pickup Point
                    </InputLabel>
                    <Controller
                      name="pickUpPoint"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select {...field} displayEmpty>
                          <MenuItem value="Gabtoli">Gabtoli</MenuItem>
                          <MenuItem value="Sayedabad">Sayedabad</MenuItem>
                          <MenuItem value="Motijheel">Motijheel</MenuItem>
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
                          <MenuItem value="Khulna">Khulna</MenuItem>
                          <MenuItem value="CoxsBazar">CoxsBazar</MenuItem>
                          <MenuItem value="RajShahi">RajShahi</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth className="p-2 m-1">
                    <InputLabel>
                      <DatePicker fontSize="medium" />
                    </InputLabel>
                    <Controller
                      name="date"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField type="date" variant="outlined" {...field} />
                      )}
                    />
                  </FormControl>
                  <Typography className="text-md font-semibold px-2 mt-2">
                    Vehicle Type
                  </Typography>

                  <FormControl
                    component="fieldset"
                    className="flex shrink mb-2"
                  >
                    <div>
                      <Checkbox
                        {...register("type", { required: true })}
                        value="nonAC"
                        defaultChecked={false}
                      />
                      Non Ac
                    </div>
                    <div>
                      <Checkbox
                        {...register("type", { required: true })}
                        value="ac"
                        defaultChecked={false}
                      />
                      Ac
                    </div>
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
            <div className="h-full max-w-full mt-12 px-4">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindTicket;
