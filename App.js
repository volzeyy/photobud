import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Purchases, { LOG_LEVEL } from 'react-native-purchases';

export default function App() {
  useEffect(() => {
    try {
      alert(1)
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
      alert(2)
      if (Platform.OS === 'android') {
        alert(3)
        Purchases.configure({apiKey: "goog_WONGywBNRxPtGQvyQqcdDkSwXhB"});
        alert("Success")
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
