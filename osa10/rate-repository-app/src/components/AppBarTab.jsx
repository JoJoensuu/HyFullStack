import { Text, Pressable, Alert, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
    appBar: {
        paddingTop: 10,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      }
})

const AppBarTab = () => {
    return (
        <View style={styles.appBar}>
            <Pressable onPress={() => Alert.alert('Hello!')}>
                <Text style={styles.text}>Repositories</Text>
            </Pressable>
        </View>
    )
}

export default AppBarTab;