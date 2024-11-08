import { useQuery } from "@tanstack/react-query";

const useSelectedseatbus = (busId) => {
  const {
    isPending,
    data: selectedseatbus = [],
    refetch,
  } = useQuery({
    queryKey: ["selectedseatbus"],
    queryFn: async () => {
      const response = await fetch(
        `https://bus-server-ucdk.onrender.com/resarvedSeat?busId=${busId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, selectedseatbus, refetch };
};

export default useSelectedseatbus;
