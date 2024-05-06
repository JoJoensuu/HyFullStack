const { StyleSheet, View, Button } = require("react-native");
const { default: FormikTextInput } = require("./TextInput");

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flexDirection: "column",
    },
    button: {
      justifyContent: "center",
      padding: 10,
    },
  });

const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput placeholder="GitHub username" name="gitHubUsername" />
            <FormikTextInput placeholder="Repository name" name="repositoryName" />
            <FormikTextInput placeholder="Rating" name="rating" />
            <FormikTextInput multiline={true} placeholder="Review" name="review" />
            <View style={styles.button}>
                <Button title="Create a review" style={styles.button} onPress={onSubmit} />
            </View>
        </View>
    );
};

export default ReviewForm;