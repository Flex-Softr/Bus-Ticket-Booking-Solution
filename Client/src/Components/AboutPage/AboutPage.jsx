import { Typography, Paper, Grid, makeStyles } from '@material-ui/core';

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

// Functional component for About page
const AboutPage = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        About Us
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to our bus booking platform! We are dedicated to providing a seamless and
        convenient bus booking experience for our users.
      </Typography>

      <Typography variant="body1" paragraph>
        Our mission is to connect people and places by offering a reliable and comfortable
        mode of transportation. With a wide range of routes and schedules, we aim to make
        travel accessible to everyone.
      </Typography>

      <Typography variant="body1" paragraph>
        At our bus booking service, we prioritize safety and customer satisfaction. Our
        team works tirelessly to ensure that your journey is not just a trip but an
        enjoyable experience.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Our Vision</Typography>
          <Typography variant="body1" paragraph>
            To be the leading bus booking platform, connecting communities and providing
            reliable transportation services.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body1">
            Email: info@busbooking.com
            <br />
            Phone: +1 (123) 456-7890
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AboutPage;
