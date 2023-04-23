import React, { useEffect, useState } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Purchases from "react-native-purchases";
import Ionicons from "@expo/vector-icons/Ionicons";
import Benefit from "../Benefit";

export default function PremiumPage({ setIsPremiumOpen }) {
  const [currentOffering, setCurrentOffering] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          setCurrentOffering(offerings.current);
          return;
        }

        console.log("No offerings :(");
      };

      fetchData();
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }, []);

  const purchaseSubscription = async (pkg) => {
    try {
      const purchaserInfo = await Purchases.purchaseProduct(
        pkg.product.identifier,
        null,
        Purchases.PURCHASE_TYPE.SUBS
      );
      console.log(purchaserInfo);
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  };

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setIsPremiumOpen(false)}>
                <View style={styles.closeContainer}>
                  <Text style={styles.close}>
                    <Ionicons style={styles.close} name='close' />
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.appName}>PhotoBud</Text>
                <Text style={styles.packageName}>premium</Text>
              </View>
            </View>
            <View style={styles.textExtra}>
              <Text style={styles.heading}>a hefty package :o</Text>
            </View>
            <View style={styles.packageDescription}>
              <Benefit
                icon='flame'
                title='Explanations'
                description='Upon each question or prompt, you will also get a detailed explanation!'
              />
              <Benefit
                icon='chatbox-ellipses'
                title='Chat'
                description='Ask individual questions about the provided image or use the Chat room instead'
              />
              <Benefit
                icon='speedometer'
                title='Latest Technology'
                description='Have a better experience with the above benefits paired with the latest technology, GPT-4!'
              />
            </View>
          </View>
        </ScrollView>
        {currentOffering?.availablePackages.map((pkg, index) => {
          return (
            <View style={styles.buyContainer} key={index}>
              <TouchableOpacity onPress={() => purchaseSubscription(pkg)}>
                <View style={styles.buyButton}>
                  <Text style={styles.price}>{pkg.product.priceString}/</Text>
                  <Text style={styles.month}>month</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
}

// () => purchaseSubscription(pkg)

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    flex: 1,
  },

  closeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 100,
    padding: 3,
  },

  close: {
    display: "flex",
    fontSize: 16,
    color: "white",
  },

  header: {
    paddingTop: 30,
    paddingBottom: 30,
    padding: 15,
    backgroundColor: "#1464FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },

  appName: {
    color: "white",
    fontSize: 32,
  },

  packageName: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    paddingRight: 6,
    paddingLeft: 6,
  },

  text: {
    color: "white",
  },

  mainContainer: {
    gap: 20,
  },

  textExtra: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  buyContainer: {
    backgroundColor: "#1a1a1a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  buyButton: {
    padding: 10,
    backgroundColor: "#1464FF",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 20,
  },

  price: {
    fontSize: 24,
    color: "white",
  },

  month: {
    color: "white",
    fontSize: 16,
  },
});
