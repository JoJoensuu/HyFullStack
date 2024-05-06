const { Formik } = require("formik");
import * as yup from "yup";
import ReviewForm from "./ReviewForm";
import useCreateReview from "../hooks/useCreateReview";
const { View, StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: { 
      padding: 20
    },
    submit: {
      marginTop: 20,
    }
  });

const validationSchema = yup.object().shape({
    gitHubUsername: yup
      .string()
      .required('GitHub username is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .integer()
      .min(0)
      .max(100)
      .required('Rating is required'),
    review: yup
      .string()
      .max(2000, 'Review length cant exceed 2000 characters')
  });

const initialValues = {
    gitHubUsername: '',
    repositoryName: '',
    rating: '',
    review: '',
};

const CreateReview = () => {
    const [createReview] = useCreateReview();

    const onSubmit = async (values) => {
        const { gitHubUsername, repositoryName, rating, review } = values;
        try {
            const variables = {
                repositoryName,
                ownerName: gitHubUsername,
                rating,
                text: review,
            };
            await createReview(variables);
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <View style={styles.container}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    );
};

export default CreateReview;