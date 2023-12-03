import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const theme = createTheme();
const AddCounter = () => {
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);
      };
  return (
    <ThemeProvider theme={theme}>
    <Container className="mb-10" component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar className="bg-blue-600" sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a New Counter
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
                {...register('Name', { required: ' Name is required' })}
              />
              {errors.Name && <p className="text-red-600">{errors.Name.message}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Counter Email"
                name="email"
                autoComplete="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
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
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Role is required' }}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel value="user" control={<Radio />} label="User" />
                    </RadioGroup>
                  )}
                />
                {errors.role && <p className="text-red-600">{errors.role.message}</p>}
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Counter
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  );
};

export default AddCounter;
