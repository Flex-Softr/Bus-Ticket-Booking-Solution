


import { useQuery } from "@tanstack/react-query";

const useAllBusData = () => {
  const {
    isPending,
    data: allBusData = [],
    refetch,
  } = useQuery({
    queryKey: ["allBusData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/allbus");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allBusData, refetch };
};

export default useAllBusData;
