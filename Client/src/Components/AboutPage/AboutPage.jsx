import React from "react";
import {
  Typography,
  Paper,
  Grid,
  makeStyles,
  Divider,
} from "@material-ui/core";
import backgroundImage from "../../../public/bus_about.jpg";
import Lottie from "lottie-react";
import aboutLottie from "../../../public/about_lottie.json";
import { Helmet } from "react-helmet-async";

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center 89%",
    padding: `${theme.spacing(3)}px 0`, // Adjusted padding here
    marginBottom: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgba(20, 63, 64, 0.3)",
    color: "rgba(20, 63, 64, 0.8)",
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing(2)}px 0`, // Adjusted padding for small screens
    },
  },
  title: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem", // Adjusted font size for small screens
    },
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Stack content in a column on small screens
    },
  },
  content: {
    width: "100%",
    padding: theme.spacing(3),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    [theme.breakpoints.up("md")]: {
      width: "48%",
    },
  },
  gifContainer: {
    width: "100%",
    padding: theme.spacing(3),
    backgroundColor: "rgba(20, 63, 64, 0.1)",
    [theme.breakpoints.up("md")]: {
      width: "48%",
    },
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
    borderBottom: "2px solid #143f40",
    opacity: 0.2,
  },
  gridContainer: {
    padding: theme.spacing(3),
    margin: "auto",
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title> TravelTrek - About </title>
      </Helmet>
      <Paper className={classes.root}>
        <div className={classes.titleContainer}>
          <Typography variant="h3" className={classes.title}>
            ABOUT
          </Typography>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Typography variant="h5" className={classes.title}>
              About Us
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to our bus booking platform! We are dedicated to providing
              a seamless and convenient bus booking experience for our users.
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to connect people and places by offering a reliable
              and comfortable mode of transportation. With a wide range of
              routes and schedules, we aim to make travel accessible to
              everyone.
            </Typography>
            <Typography variant="body1" paragraph>
              At our bus booking service, we prioritize safety and customer
              satisfaction. Our team works tirelessly to ensure that your
              journey is not just a trip but an enjoyable experience.
            </Typography>
          </div>
          <div className={classes.gifContainer}>
            <Lottie animationData={aboutLottie} />
          </div>
        </div>
        <Divider className={classes.divider} />
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Our Vision</Typography>
            <Typography variant="body1" paragraph>
              To be the leading bus booking platform, connecting communities and
              providing reliable transportation services.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body1">
              Email: travel@trek.com
              <br />
              Phone: +9123434543
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default AboutPage;
