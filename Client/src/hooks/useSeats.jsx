import { useQuery } from "@tanstack/react-query";

const useSeats = () => {
  const {
    isPending,
    data: allSeats = [],
    refetch,
  } = useQuery({
    queryKey: ["allSeats"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/seats");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allSeats, refetch };
};

export default useSeats;
