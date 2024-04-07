import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useUser = () => {
  const [user, setUser] = useState(null);
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
  }, [data]);

  return { user, loading, refetch };
};

export default useUser;