import { View, StyleSheet, ScrollView } from 'react-native'
import NavigateBack from '../../components/NavigateBack'
import DisplayCard from '../../components/DisplayCard'

const AboutUs = ({ setView }) => {
  return (
    <View style={styles.container}>
        <NavigateBack 
            currentView="ABOUT US"
            navigateTo={() => setView("main")}
        />
        <ScrollView>
            <View style={styles.aboutUs}>
                <DisplayCard
                    label="Me"
                    text="Hello, my name is Voldemar! I'm 18 and from Latvia! I am motivated by technology, by its ongoing improvements and exponential expansion. It's exciting!"
                    icon="happy"
                />
                <DisplayCard
                    label="App"
                    text="I created this software because I was always assisting my classmates with programming tasks. They provide me the images they took of the work, and I check through them and respond. It took a lot of time and mental energy for me, so I came up with this app idea. The problem's solution."
                    icon="bulb"
                />
                <DisplayCard
                    label="Problems"
                    text="While this software may provide wrong answers or hallucinate, my goal is to make the greatest Photo2Answer app possible. You can be sure that when the next great technology comes out, I'll incorporate it and improve the app further."
                    icon="bug"
                />
                <DisplayCard
                    label="You"
                    text="Many additional things will be added, and if you have any suggestions, feel free to contact me ;&#41;"
                    icon="person"
                />
            </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
    },

    text: {
        color: "white",
        fontSize: 18,
        lineHeight: 28.8,
        padding: 10,
        backgroundColor: "#1a1a1a",
        borderRadius: 10,
    },

    aboutUs: {
        padding: 10,
        display: "flex",
        justifyContent: "center",
        gap: 15,
    }
})

export default AboutUs