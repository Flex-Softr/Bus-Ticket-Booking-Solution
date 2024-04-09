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
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import useAllZilla from "../../hooks/useAllZilla";
import "./AddBus.css";
const busTypes = ["AC", "Non-AC"];

const AddBus = () => {
  const { allDistricts } = useAllDistricts();
  const { supervisors } = useSuoervisor();

  const supervisorNames = supervisors.map((supervisor) => ({
    label: supervisor.name,
    value: supervisor._id,
    phone: supervisor.phone,
  }));

  const { allZilla } = useAllZilla();
  console.log(allZilla);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const locations = allDistricts.map((ticket) => ({
    value: ticket.name,
    label: ticket.name,
  }));

  const [names, setNames] = useState([]);

  const handleNameChange = (inputValue, actionMeta) => {
    let temp = [];

    if (inputValue) {
      try {
        (async () => {
          const data = await fetch(
            `http://localhost:5000/allNames/${inputValue}`
          );

          const result = await data.json();
          const name = result.map((n) => {
            const option = {
              label: n.name,
              value: n.name,
              color: "#" + Math.floor(Math.random() * 16777215).toString(),
            };
            temp.push(option);
          });
          setNames(temp);
        })();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.selectedZilla = selectedOption;
    setLoading(true);
    data.names = selectedOption;
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
    <>
      <Helmet>
        <title> TravelTrek - Add Bus </title>
      </Helmet>

      <Box
        sx={{ backgroundColor: "#fff", borderRadius: "3px" }}
        className=" md:px-20 py-10 md:w-11/12 mx-auto"
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
                // type="number"
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
                {errors.pickupPoint && (
                  <p className="text-red-600">{errors.pickupPoint.message}</p>
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
                name="droppingtime"
                fullWidth
                {...register("droppingtime", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>

          {/* -------------- multi selected input field ----------- */}
          <div className="mb-4 flex-1">
            <FormControl fullWidth className="">
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={allZilla?.districts}
                placeholder="select multiple districts"
                isMulti
              />
            </FormControl>
          </div>

          <br />
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
                      options={supervisorNames}
                      renderInput={(params) => (
                        <TextField {...params} label="Supervisor Name" />
                      )}
                      onChange={(_, value) => {
                        setValue("supervisorName", value);
                        if (value) {
                          setValue("supervisorNumber", value.phone); // Set supervisorNumber directly to phone
                        }
                      }}
                    />
                  )}
                />

                {errors.supervisorName && (
                  <p className="text-red-600">
                    {errors.supervisorName.message}
                  </p>
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
                    <TextField {...field} label="Supervisor Number" />
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
          <div className="flex md:gap-2 mb-4 md:w-full ">
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

          {/* bus type */}
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
    </>
  );
};

export default AddBus;
