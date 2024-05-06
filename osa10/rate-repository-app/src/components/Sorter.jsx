import { Picker } from "@react-native-picker/picker";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    picker: {
        height: 60,
        padding: 10,
    },
});

const Sorter = ({ orderBy, setOrderBy, orderDirection, setOrderDirection }) => {
    const handleChange = (itemValue) => {
        if (itemValue === "CREATED_AT.DESC") {
            setOrderBy("CREATED_AT");
            setOrderDirection("DESC");
        } else if (itemValue === "RATING_AVERAGE.DESC") {
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("DESC");
        } else if (itemValue === "RATING_AVERAGE.ASC") {
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("ASC");
        }
    };

    return (
        <Picker
          style={styles.picker}
          selectedValue={`${orderBy}.${orderDirection}`}
          onValueChange={( itemValue ) => handleChange(itemValue)}
        >
            <Picker.Item label="Latest repositories" value="CREATED_AT.DESC" />
            <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE.DESC" />
            <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE.ASC" />
        </Picker>
    );
};

export default Sorter;