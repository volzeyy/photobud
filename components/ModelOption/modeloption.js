import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import GradientView from '../GradientView'
import globalStyles from '../../styles'
import Ionicons from "@expo/vector-icons/Ionicons";

const ModelOption = ({name, model, price, description, isSelected, setChat}) => {
    const selectModel = () => {
        setChat(prev => {
            return {...prev,
                model: model,
            }
        })
    }

  return (
    <GradientView style={styles.container}>
        <View style={styles.info}>
            <Text style={{...globalStyles.text_white, fontWeight: "700"}}>{name}</Text>
            <View style={styles.price}>
                <Ionicons style={{...globalStyles.text_light, fontSize: 24, fontWeight: "700"}} name="ice-cream" />
                <Text style={{...globalStyles.text_light, fontWeight: "700"}}>{price}</Text>
            </View>
        </View>
        <View style={styles.description}>
            <Text style={{...globalStyles.text_white, fontSize: 14}}>{description}</Text>
        </View>
        {isSelected ?
            <TouchableOpacity style={styles.selected}>
                <Text style={{...globalStyles.text_black, fontWeight: "700"}}>Selected</Text>
            </TouchableOpacity>
        :
            <TouchableOpacity style={isSelected ? styles.selected : styles.select} onPress={selectModel}>
                <Text style={{...globalStyles.text_black, fontWeight: "700"}}>Select</Text>
            </TouchableOpacity>
        }
    </GradientView>
  )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        display: "flex",
        padding: 20,
        gap: 20,
    },

    info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    price: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    description: {
        display: "flex",
    },

    select: {
        display: "flex",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },

    selected: {
        display: "flex",
        alignItems: "center",
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 10,
    }
})

export default ModelOption