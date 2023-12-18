import { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import useAllBusData from "../../hooks/useAllBusData";
import AllBusTicket from "./AllBusTicket";
import Lottie from "lottie-react";
import empty from "../../../public/FV6BUNxAOU.json";

const ShowTicket = ({ setNormalizedBusTickets, normalizedBusTickets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const { allBusData } = useAllBusData();

  useEffect(() => {
    if (allBusData.length > 0) {
      setNormalizedBusTickets(allBusData);
    }
  }, [allBusData, setNormalizedBusTickets]);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPageIndex - postsPerPage;
  const currentPosts = normalizedBusTickets.slice(
    firstPostIndex,
    lastPageIndex
  );

  return (
    <div>
      <div className="h-full max-w-full mt-12 px-4">
        {currentPosts.length === 0 ? (
          <p>
            <Lottie style={{ height: 500 }} animationData={empty} />
          </p>
        ) : (
          currentPosts.map((allBus) => (
            <AllBusTicket allBus={allBus} key={allBus._id}></AllBusTicket>
          ))
        )}

        {currentPosts.length > 0 && (
          <Pagination
            totalPosts={allBusData.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ShowTicket;
