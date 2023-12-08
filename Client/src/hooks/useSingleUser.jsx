import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Components/Providers/AuthProvider/AuthProvider";
import { useContext } from "react";

const useSingleUser = () => {
    const { user } = useContext(AuthContext)
    const {
        isPending,
        data: userdata = [],
        refetch,
      } = useQuery({
        queryKey: ["userdata", user?.email],
        queryFn: async () => {
          const response = await fetch(`http://localhost:5000/users/${user?.email}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      });
    
      return { isPending, userdata, refetch };
    };
    
export default useSingleUser;