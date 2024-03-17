import { Text, Pressable, Alert, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      }
})

const AppBarTab = () => {
    return (
        <Pressable onPress={() => Alert.alert('Hello!')}>
            <Text style={styles.text}>Repositories</Text>
        </Pressable>
    )
}

export default AppBarTab;