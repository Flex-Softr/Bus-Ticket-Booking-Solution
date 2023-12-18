import { useQuery } from "@tanstack/react-query";

const useAllAddAccount = () => {
  const {
    isPending,
    data: allaccountData = [],
    refetch,
  } = useQuery({
    queryKey: ["allaccountData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/add-account");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allaccountData, refetch };
};

export default useAllAddAccount;