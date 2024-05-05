import { RepositoryItem } from "./RepositoryItem";
import { View } from "react-native";

const RepositoryView = ({ repository }) => {
  return (
    <View>
      {repository && <RepositoryItem item={repository} showButton={true} />}
    </View>
  );
};

export default RepositoryView;