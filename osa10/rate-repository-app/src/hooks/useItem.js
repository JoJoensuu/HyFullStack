import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useState } from "react";

const useItem = (id, first) => {
    const [reviews, setReviews] = useState([]);
    const [repository, setRepository] = useState(null);
    const { data, error, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id, first },
        onError: (error) => {
            console.log('Error: ', error);
        },
        onCompleted: (data) => {
            setRepository(data.repository);
            const reviewNodes = data.repository.reviews.edges.map((edge) => edge.node);
            setReviews(reviewNodes);
        }
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_SINGLE_REPOSITORY,
            variables: {
                after: repository.reviews.pageInfo.endCursor,
                id,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const reviewNodes = [
                    ...previousResult.repository.reviews.edges.map((edge) => edge.node),
                    ...fetchMoreResult.repository.reviews.edges.map((edge) => edge.node),
                ];
                setRepository(fetchMoreResult.repository);
                setReviews(reviewNodes);
            }
        })
    }

    return { repository, error, loading, reviews, fetchMore: handleFetchMore };
};

export default useItem;