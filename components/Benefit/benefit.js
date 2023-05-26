import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../styles'
import Ionicons from "@expo/vector-icons/Ionicons";

const Benefit = ({oldBenefit, newBenefit}) => {
  return (
    <View style={styles.container}>
        <Text style={{...globalStyles.text_light, fontSize: 14, textDecorationLine: "line-through"}}>{oldBenefit}</Text>
        <Text style={{...globalStyles.text_white, fontSize: 14}}>{newBenefit}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
})

export default Benefit