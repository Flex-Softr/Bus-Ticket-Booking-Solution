
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import Alert from '@mui/material/Alert';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const busTypes = ['AC', 'Non-AC'];

// Array of predefined locations
const locations = [
  'Barishal',
  'Chattogram',
  'Dhaka',
  'Khulna',
  'Rajshahi',
  'Rangpur',
  'Mymensingh',
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
    <Box sx={{ backgroundColor: '#fff', borderRadius: '3px' }}  className="px-20 py-10 md:w-11/12 mx-auto" style={{ "boxShadow": " rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        padding: '30px',
        // color: 'white',
        height: '40px',
        width: '40px',
        margin: '0 auto',
        backgroundColor: '#d6d8da',
      }}
    >
      <DirectionsBusIcon sx={{ fontSize: '44px' }} color="primary" />
    </Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5"
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
          <TextField
            label="Time"
            type="time"
            fullWidth
            {...register("time", { required: "This field is required" })}
          />
        </div>

        <div className="mb-4">
          <FormControl fullWidth>
            <Controller
              name="busType"
              control={control}
              defaultValue=""
              rules={{ required: 'this field is required' }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  aria-label="busType"
                  onChange={(e) => setValue('busType', e.target.value)}
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


        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddBus;
