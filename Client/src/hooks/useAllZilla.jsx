

import { useQuery } from "@tanstack/react-query";

const useAllZilla = () => {
  const {
    isPending,
    data: allZilla = [],
    refetch,
  } = useQuery({
    queryKey: ["allZilla"],
    queryFn: async () => {
      const response = await fetch("../../public/zilla.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allZilla, refetch };
};

export default useAllZilla;
