import AppBar from "./src/components/AppBar";
import RepositoryList from "./src/components/RepositoryList";
import { View } from 'react-native'

const App = () => {
  return (
    <View>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default App;