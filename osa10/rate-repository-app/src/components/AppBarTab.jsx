import { Text, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
    appBarTab: {
        padding: 10,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      }
})

const AppBarTab = ({text}) => {
    return (
        <View style={styles.appBarTab}>
                <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default AppBarTab;