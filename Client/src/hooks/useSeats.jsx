import { useQuery } from "@tanstack/react-query";

const useSeats = () => {
  const {
    isPending,
    data: allSeats = [],
    refetch,
  } = useQuery({
    queryKey: ["allSeats"],
    queryFn: async () => {
      const response = await fetch("https://bus-server-ucdk.onrender.com/seats");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allSeats, refetch };
};

export default useSeats;
