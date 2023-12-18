import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import Alert from "@mui/material/Alert";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import useAllDistricts from "../../hooks/useAllDistricts";
import useSuoervisor from "../../hooks/useSuoervisor";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const busTypes = ["AC", "Non-AC"];

const AddBus = () => {
  const { allDistricts } = useAllDistricts();
  const { supervisors } = useSuoervisor();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const locations = allDistricts.map((ticket) => ({
    value: ticket.name,
    label: ticket.name,
  }));

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    axios
      .post("http://localhost:5000/addbus", data)
      .then((res) => {
        console.log("post", res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Created a new bus",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/allbus");
        reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.message}, please try again later`,
        });
        console.error("Post request failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{ backgroundColor: "#fff", borderRadius: "3px" }}
      className="px-5 md:px-20 py-10 md:w-11/12 mx-auto"
      style={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          padding: "30px",
          height: "40px",
          width: "40px",
          margin: "0 auto",
          backgroundColor: "#d6d8da",
        }}
      >
        <DirectionsBusIcon sx={{ fontSize: "44px" }} color="primary" />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="flex gap-2">
          <div className="mb-4 flex-1">
            <TextField
              type="number"
              label="Serial Number"
              fullWidth
              type="number"
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
          {/* pickup time */}
          <div className="mb-4 flex-1">
            <TextField
              label="Pickup Time"
              type="time"
              fullWidth
              {...register("pickuptime", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="flex gap-2 w-full">
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

          {/* dropping time */}
          <div className="mb-4 flex-1">
            <TextField
              label="Dropping Time"
              type="time"
              fullWidth
              {...register("droppingtime", {
                required: "This field is required",
              })}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-4 w-full">
          <div className="flex-1">
            <FormControl fullWidth>
              <Controller
                name="supervisorName"
                control={control}
                defaultValue=""
                rules={{ required: "this field is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={supervisors.map((supervisor) => ({
                      label: supervisor.name,
                      value: supervisor._id,
                    }))}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Supervisor Name" />
                    )}
                    onChange={(_, value) => setValue("supervisorName", value)}
                  />
                )}
              />

              {errors.supervisorName && (
                <p className="text-red-600">{errors.supervisorName.message}</p>
              )}
            </FormControl>
          </div>

          <div className="flex-1">
            <FormControl fullWidth>
              <Controller
                name="supervisorNumber"
                control={control}
                defaultValue=""
                rules={{ required: "this field is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={supervisors.map((supervisor) => ({
                      label: supervisor.phone,
                      value: supervisor._id,
                    }))}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Supervisor Number" />
                    )}
                    onChange={(_, value) => setValue("supervisorNumber", value)}
                  />
                )}
              />
              {errors.supervisorNumber && (
                <p className="text-red-600">
                  {errors.supervisorNumber.message}
                </p>
              )}
            </FormControl>
          </div>
        </div>

        <div className="flex gap-2 mb-4 w-full">
          <div className="flex-1">
            <TextField
              label="departureDate"
              type="date"
              fullWidth
              {...register("departureDate", {
                required: "This field is required",
              })}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Time"
              type="time"
              fullWidth
              {...register("time", { required: "This field is required" })}
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
                <RadioGroup
                  {...field}
                  row
                  aria-label="busType"
                  onChange={(e) => setValue("busType", e.target.value)}
                >
                  {busTypes.map((type) => (
                    <FormControlLabel
                      key={type}
                      value={type}
                      control={<Radio color="primary" />}
                      label={type}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.busType && (
              // <p className="text-red-600"></p>
              <Alert severity="warning">{errors.busType.message}</Alert>
            )}
          </FormControl>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          // fullWidth
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default AddBus;
