import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useItem = (id) => {
    const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id },
    });

    return { repository: data?.repository, error, loading }
}

export default useItem;