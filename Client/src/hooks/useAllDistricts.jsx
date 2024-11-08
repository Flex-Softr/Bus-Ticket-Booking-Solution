import { useQuery } from "@tanstack/react-query";

const useAllDistricts = () => {
  const {
    isPending,
    data: allDistricts = [],
    refetch,
  } = useQuery({
    queryKey: ["allDistricts"],
    queryFn: async () => {
      const response = await fetch("https://bus-server-ucdk.onrender.com/ticket");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allDistricts, refetch };
};

export default useAllDistricts;
