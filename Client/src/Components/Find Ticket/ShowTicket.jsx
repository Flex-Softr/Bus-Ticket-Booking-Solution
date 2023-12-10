import useAllBusData from "../../hooks/useAllBusData";
import AllBusTicket from "./AllBusTicket";

const ShowTicket = () => {
  const { allBusData } = useAllBusData();
  return (
    <div>
      <div className="h-full max-w-full mt-12 px-4">
        {allBusData.map((allBus) => (
          <AllBusTicket allBus={allBus} key={allBus._id}></AllBusTicket>
        ))}
      </div>
    </div>
  );
};

export default ShowTicket;
