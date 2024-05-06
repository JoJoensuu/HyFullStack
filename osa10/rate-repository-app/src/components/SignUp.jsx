import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { Formik } from "formik";
import SignUpForm from "./SignUpForm";

const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters")
      .max(30, "Username must not exceed 30 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(50, "Password must not exceed 50 characters"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
});

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();

    const onSubmit = async ({ username, password }) => {
        try {
            await signUp({ username, password });
            try {
                await signIn({ username, password });
                } catch(e) {
                    console.log(e);
                }
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignUp;