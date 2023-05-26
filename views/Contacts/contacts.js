import styles from './styles'
import { View, ScrollView } from 'react-native'

import NavigateBack from '../../components/NavigateBack'
import DisplayCard from '../../components/DisplayCard/displaycard'

const Contacts = ({ setView }) => {
  return (
    <View style={styles.container}>
        <NavigateBack 
            currentView="CONTACTS"
            navigateTo={() => setView("main")}
        />
        <ScrollView>
            <View style={styles.contacts}>
                <DisplayCard 
                    label="Email"
                    text="vezedoes@gmail.com"
                    icon="mail-outline"
                />
                <DisplayCard 
                    label="Phone (SMS/WhatsApp only)"
                    text="+371 22446922"
                    icon="chatbox-ellipses-outline"
                />
                <DisplayCard 
                    label="Instagram"
                    text="@voldemarezerin"
                    icon="logo-instagram"
                />
            </View>
        </ScrollView>
    </View>
  )
}

export default Contacts