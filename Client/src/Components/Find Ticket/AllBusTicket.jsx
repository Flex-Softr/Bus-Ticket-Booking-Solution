/* eslint-disable react/prop-types */
import { ArrowForward, DirectionsBus } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
// import busImg from "../../assets/DB35.gif";
import { Link } from "react-router-dom";

const AllBusTicket = ({ allBus }) => {
  const {
    busName,
    pickupPoint,
    droppingPoint,
    busType,
    supervisorName,
    supervisorNumber,
    departureDate,
    serialNumber,
    time,
    pickuptime,
    droppingtime,
    _id,
    selectedZilla,
  } = allBus;
  // console.log(allBus)

  return (
    <div>
      {/* <img className=" h-20 w-20" src={busImg} alt="" /> */}
      <div className="flex flex-wrap justify-center items-center bg-white rounded">
      <div className="flex justify-between capitalize w-full mt-5 items-center mx-4 border-b-2 pb-4 ">
            <Typography className=" font-semibold text-xl ">
              {busName} - {serialNumber}
            </Typography>
            
            <Typography>
              {selectedZilla &&
                selectedZilla?.map((any, index) => (
                  <span key={index} className="text-xl text-gray-700">
                    {any?.value}
                   <span className="text-blue-600">{index < selectedZilla?.length - 1 && " > "}</span>
                  </span>
                ))}
            </Typography>
          </div>
        <div className="basis-6/12 grow mb-2 p-4">
          
         

          <Typography className="font-semibold text-xl">
            {pickupPoint.value} - {droppingPoint.value}
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
              {pickuptime} am
            </Typography>
            <Typography varient="p" className="text-gray-500">
              {pickupPoint.value}
            </Typography>
          </div>
          <div>
            <ArrowForward className="mx-auto block text-blue-400" />
            <Typography varient="p" className="text-sm mx-1 text-gray-500">
              {time}
            </Typography>
          </div>
          <div>
            <Typography varient="p" className="text-md font-semibold">
              {droppingtime} pm
            </Typography>
            <Typography varient="p" className="text-gray-500">
              {droppingPoint.value}
            </Typography>
          </div>
        </div>
        <div className="basis-full grow mb-5">
          <Link to={`/fixSeat/${_id}`}>
            <Button
              variant="contained"
              className="px-6 py-2 my-3 mx-auto block"
            >
              Select Seat
            </Button>
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
};

export default AllBusTicket;