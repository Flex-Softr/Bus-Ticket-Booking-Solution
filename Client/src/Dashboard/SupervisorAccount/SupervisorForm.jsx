// import React from 'react';
import { useForm, Controller } from "react-hook-form";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {
  TextField,
  Button,
  Container,
  Box,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SupervisorForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, phone, nid, presentAddress, permanentAddress, image } = data;

    const newItem = {
      name,
      phone,
      nid,
      presentAddress,
      permanentAddress,
      image,
    };

    axios
      .post("http://localhost:5000/supervisor", newItem)
      .then((responseData) => {
        console.log(responseData.data);
        if (responseData.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/allsupervisor");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while submitting the form. Please try again later.",
        });
      });
  };

  return (
    <Box
      sx={{ backgroundColor: "#fff", borderRadius: "3px" }}
      className="px-20 py-10 md:w-11/12 mx-auto"
      style={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{  padding: "30px",
            borderRadius: "50%",
            height: "40px",
            width: "40px",
            backgroundColor: "#d6d8da",}}
          >
            <GroupAddIcon
              sx={{ fontSize: "44px" }} color= "primary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Supervisor Information
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        label="Name"
                        fullWidth
                        margin="normal"
                        size="big"
                      />
                      {errors.name && (
                        <span className="text-red-500 block">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        label="Phone number"
                        fullWidth
                        margin="normal"
                        size="big"
                      />
                      {errors.phone && (
                        <span className="text-red-500 block">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="nid"
                  control={control}
                  rules={{ required: "NID number is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        label="NID number"
                        fullWidth
                        margin="normal"
                        size="big"
                      />
                      {errors.nid && (
                        <span className="text-red-500 block">
                          {errors.nid.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="presentAddress"
                  control={control}
                  rules={{ required: "Present Address is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        label="Present Address"
                        fullWidth
                        margin="normal"
                        size="big"
                      />
                      {errors.presentAddress && (
                        <span className="text-red-500 block">
                          {errors.presentAddress.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="permanentAddress"
                  control={control}
                  rules={{ required: "Permanent Address is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        label="Permanent Address"
                        fullWidth
                        margin="normal"
                        size="big"
                      />
                      {errors.permanentAddress && (
                        <span className="text-red-500 block">
                          {errors.permanentAddress.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: "Image is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        type="file"
                        fullWidth
                        margin="normal"
                        size="big"
                      />
                    </div>
                  )}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              // size="medium"
              className="mt-3"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SupervisorForm;
