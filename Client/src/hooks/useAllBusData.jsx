import { useQuery } from "@tanstack/react-query";

const useAllBusData = () => {
  const {
    isPending,
    data: allBusData = [],
    refetch,
  } = useQuery({
    queryKey: ["allBusData"],
    queryFn: async () => {
      const response = await fetch("https://bus-server-ucdk.onrender.com/allbus");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allBusData, refetch };
};

export default useAllBusData;
