const { useMutation } = require("@apollo/client");
const { useNavigate } = require("react-router-native");
const { CREATE_REVIEW } = require("../graphql/mutations");

const useCreateReview = () => {
    const navigate = useNavigate();
    const [mutate, result] = useMutation(CREATE_REVIEW, {
        refetchQueries: ["GET_SINGLE_REPOSITORY"],
    });

    if (result.error) {
        return `Error! ${result.error.message}`
    }

    const createReview = async ({ ownerName, repositoryName, rating, text }) => {
        const { data } = await mutate({
            variables: {
                ownerName,
                repositoryName,
                rating: Number(rating),
                text,
            },
        });
        navigate(`/repositories/${data.createReview.repositoryId}`);
        return data;
    };

    return [createReview, result];
};

export default useCreateReview;