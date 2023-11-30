import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
// import Typography from '@mui/material/Typography';

const busTypes = ["AC", "Non-AC"];

// Array of predefined locations
const locations = [
  "Barishal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Rajshahi",
  "Rangpur",
  "Mymensingh",
];

const AddBus = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 w-9/12 mt-10 mx-auto"
      >
        <div className="flex gap-2">
          <div className="mb-4 flex-1">
            <TextField
              label="Serial Number"
              fullWidth
              {...register("serialNumber", {
                required: "This field is required",
              })}
            />
            
          </div>
          <div className="mb-4 flex-1">
            <TextField
              label="Bus Name"
              fullWidth
              {...register("busName", { required: "This field is required" })}
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="mb-4 flex-1">
            <FormControl fullWidth>
              <Controller
                name="pickupPoint"
                control={control}
                defaultValue=""
                rules={{ required: "this field is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={locations}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Pickup Point" />
                    )}
                    onChange={(_, value) => setValue("pickupPoint", value)}
                  />
                )}
              />
              {errors.droppingPoint && (
                <p className="text-red-600">{errors.droppingPoint.message}</p>
              )}
            </FormControl>
          </div>
          <div className="mb-4 flex-1">
            <FormControl fullWidth>
              <Controller
                name="droppingPoint"
                control={control}
                defaultValue=""
                rules={{ required: "this field is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={locations}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Dropping Point" />
                    )}
                    onChange={(_, value) => setValue("droppingPoint", value)}
                  />
                )}
              />
              {errors.droppingPoint && (
                <p className="text-red-600">{errors.droppingPoint.message}</p>
              )}
            </FormControl>
          </div>
        </div>

        <div className="flex gap-2 mb-4 w-full">
          <div className=" flex-1">
            <TextField
              label="Supervisor Name"
              fullWidth
              {...register("supervisorName", {
                required: "This field is required",
              })}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Supervisor Number"
              fullWidth
              {...register("supervisorNumber", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="mb-4">
          <FormControl fullWidth>
            <Controller
              name="busType"
              control={control}
              defaultValue=""
              rules={{ required: "this field is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={busTypes}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="AC/Non-AC" />
                  )}
                  onChange={(_, value) => setValue("busType", value)}
                />
              )}
            />
            {errors.droppingPoint && (
              <p className="text-red-600">{errors.droppingPoint.message}</p>
            )}
          </FormControl>
        </div>

        <div className="mb-4">
          <TextField
            label="Time"
            type="time"
            fullWidth
            {...register("time", { required: "This field is required" })}
          />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default AddBus;
