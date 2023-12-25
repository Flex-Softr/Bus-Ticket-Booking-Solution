import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title> TravelTrek - Contact </title>
      </Helmet>
      <Box
        className="md:w-7/12 mx-auto"
        height="100%"
        sx={{
          flexDirection: "column",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center">
          <Typography
            textTransform="capitalize"
            component="h4"
            variant="h4"
            color="primary"
          >
            Contact with us
          </Typography>
          <Typography
            textTransform="capitalize"
            component="p"
            variant="p"
            color="primary"
          >
            {`  Let's get this conversation strated. Tell us a bit about yourself, and we'll get in touch as soon as  we can.`}
          </Typography>
        </Box>
        <Box width="100%" marginTop="29px">
          <div className="gap-3 flex mb-3 w-full">
            <input
              type="text"
              placeholder="write your name"
              className="border border-[#143f40b8] w-full p-3"
            />
            <input
              type="email"
              placeholder="write your email"
              className="w-full border border-[#143f40b8] p-3"
            />
          </div>
          <div>
            <textarea
              name="message"
              className="border border-[#143f40b8] p-3 w-full"
              placeholder="Message"
              rows="5"
            ></textarea>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default ContactPage;
