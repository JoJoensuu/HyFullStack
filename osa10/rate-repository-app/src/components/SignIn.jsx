import { StyleSheet, View, Button } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './TextInput';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';


const styles = StyleSheet.create({
  container: { 
    padding: 20
  },
  submit: {
    marginTop: 20,
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
  password: yup
    .string()
    .required('Please Enter your password')
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <View style={styles.submit}>
        <Button onPress={onSubmit} title="Sign in"/>
      </View>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}       
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn