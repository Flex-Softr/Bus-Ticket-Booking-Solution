import { useQuery } from "@tanstack/react-query";

const useAllAddAccount = () => {
  const {
    isPending,
    data: allaccountData = [],
    refetch,
  } = useQuery({
    queryKey: ["allaccountData"],
    queryFn: async () => {
      const response = await fetch("https://server-khaki-theta.vercel.app/add-account");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isPending, allaccountData, refetch };
};

export default useAllAddAccount;
