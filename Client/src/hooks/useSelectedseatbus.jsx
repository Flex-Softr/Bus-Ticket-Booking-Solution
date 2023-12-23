
import { useQuery } from "@tanstack/react-query";


const useSelectedseatbus = (busId) => {
    const {
        isPending,
        data: selectedseatbus = [],
        refetch,
      } = useQuery({
        queryKey: ["selectedseatbus"],
        queryFn: async () => {
          const response = await fetch(`http://localhost:5000/resarvedSeat?busId=${busId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      });
    
      return { isPending, selectedseatbus, refetch };
    };
    
export default useSelectedseatbus;