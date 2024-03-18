import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useFormik } from 'formik';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 20,
      backgroundColor: '#FFF',
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      paddingLeft: 10,
      marginTop: 10,
    },
    button: {
      backgroundColor: '#0366d6',
      width: '80%',
      height: 40,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      }
  });

const SignIn = () => {
  const initialValues = {
        username: '',
        password: '',
  };

  const onSubmit = (values) => {
        console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={formik.values.password}
            secureTextEntry
            onChangeText={formik.handleChange('password')}
        />
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
    </View>
    );
};

export default SignIn;