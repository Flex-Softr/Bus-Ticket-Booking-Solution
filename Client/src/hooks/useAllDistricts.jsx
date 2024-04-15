import { useQuery } from "@tanstack/react-query";

const useAllDistricts = () => {
  const {
    isPending,
    data: allDistricts = [],
    refetch,
  } = useQuery({
    queryKey: ["allDistricts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/ticket");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allDistricts, refetch };
};

export default useAllDistricts;
