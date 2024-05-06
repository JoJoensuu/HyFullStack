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

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput placeholder="Username" name="username" />
            <FormikTextInput secureTextEntry={true} placeholder="Password" name="password" />
            <FormikTextInput
                secureTextEntry={true}
                placeholder="Password confirmation"
                name="passwordConfirmation"
            />
            <View style={styles.button}>
                <Button testID="signUp" title="Sign up" style={styles.button} onPress={onSubmit} />
            </View>
        </View>
    );
};

export default SignUpForm;