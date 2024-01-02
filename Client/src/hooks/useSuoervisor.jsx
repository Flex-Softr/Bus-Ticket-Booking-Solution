import { useQuery } from "@tanstack/react-query";

const useSuoervisor = () => {
  const {
    isPending,
    data: supervisors = [],
    refetch,
  } = useQuery({
    queryKey: ["supervisors"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/supervisors");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, supervisors, refetch };
};

export default useSuoervisor;
