import { ArrowForward, DirectionsBus } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
// import busImg from "../../assets/DB35.gif";

const AllBusTicket = ({ allBus }) => {
  const {
    busName,
    pickupPoint,
    droppingPoint,
    busType,
    supervisorName,
    supervisorNumber,
    departureDate,
  } = allBus;

  return (
    <div>
      {/* <img className=" h-20 w-20" src={busImg} alt="" /> */}
      <div className="flex flex-wrap justify-center items-center bg-gray-50 rounded">
        <div className="basis-6/12 grow mb-2 p-4">
          <Typography className="font-semibold text-xl">
            {busName} - {pickupPoint.value} - {droppingPoint.value}
          </Typography>
          <Typography varient="span" className="block my-1 text-gray-500">
            Seat Layout 2x2
          </Typography>

          <div className="grid grid-rows-3 gap-3">
            <Typography
              varient="span"
              className="inline-block text-yellow-400 my-1"
            >
              <DirectionsBus />
              {busType}
            </Typography>

            <Typography
              varient="span"
              className="inline-block text-yellow-400 my-1"
            >
              <DirectionsBus />
              <span className=" font-semibold">Supervisor: </span>
              {supervisorName.label}
            </Typography>

            <Typography
              varient="span"
              className="inline-block text-yellow-400 my-1"
            >
              <DirectionsBus />
              <span className=" font-semibold">Date: </span>
              {departureDate}
            </Typography>

            <Typography
              varient="span"
              className="inline-block text-yellow-400 my-1"
            >
              <DirectionsBus />
              <span className=" font-semibold">Number: </span>
              {supervisorNumber.label}
            </Typography>
          </div>
        </div>
        <div className="basis-6/12 flex justify-evenly grow p-2">
          <div>
            <Typography varient="p" className="text-md font-semibold">
              6:30 pm
            </Typography>
            <Typography varient="p" className="text-gray-500">
              {pickupPoint.value}
            </Typography>
          </div>
          <div>
            <ArrowForward className="mx-auto block text-blue-400" />
            <Typography varient="p" className="text-sm mx-1 text-gray-500">
              10:30 min
            </Typography>
          </div>
          <div>
            <Typography varient="p" className="text-md font-semibold">
              7:30 pm
            </Typography>
            <Typography varient="p" className="text-gray-500">
              {droppingPoint.value}
            </Typography>
          </div>
        </div>
        <div className="basis-full grow">
          <Button variant="contained" className="px-6 py-2 my-3 mx-auto block">
            Select Seat
          </Button>
        </div>
      </div>{" "}
      <br />
    </div>
  );
};

export default AllBusTicket;
