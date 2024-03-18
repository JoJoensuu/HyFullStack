import AppBar from "./src/components/AppBar";
import RepositoryList from "./src/components/RepositoryList";
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#e1e4e8',
  }
})

const App = () => {
  return (
    <View>
      <AppBar />
      <RepositoryList style={styles.main} />
    </View>
  );
};

export default App;