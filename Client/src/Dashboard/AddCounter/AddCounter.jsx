
import { useForm, Controller } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CountertopsIcon from '@mui/icons-material/Countertops';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useContext } from "react";
import { AuthContext } from "../../Components/Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

// const theme = createTheme();
const AddCounter = () => {
  const { createUser } = useContext(AuthContext);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(data);

    createUser(email, password)
      .then((result) => {
        const NewUser = result.user;
        console.log(NewUser);
        const saveAccount={account_name:data?.name, email:data?.email, password:data?.password, role:data?.role}
         fetch('http://localhost:5000/add-account',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(saveAccount)
         })
         .then(res=>res.json())
         .then(data=>{
          if(data.insertedId){
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Account Added Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            
          }
         })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box sx={{ backgroundColor: '#fff', borderRadius: '3px' }}  className="px-20 py-10 md:w-11/12 mx-auto" style={{ "boxShadow": " rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
      <Container  component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            className="bg-blue-600"
            sx={{ m: 1, bgcolor: "secondary.main" }}
          >
            <CountertopsIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a New Counter
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Counter Name"
                  autoFocus
                  {...register("Name", { required: " Name is required" })}
                />
                {errors.Name && (
                  <p className="text-red-600">{errors.Name.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Counter Email"
                  name="email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Role</FormLabel>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Role is required" }}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="user"
                          control={<Radio />}
                          label="User"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.role && (
                    <p className="text-red-600">{errors.role.message}</p>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Counter
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddCounter;
