import globalStyles from "../../styles";
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import Purchases, { PURCHASE_TYPE } from "react-native-purchases";

import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
  AdEventType,
} from "react-native-google-mobile-ads";

import { db } from "../../firebase/firebase";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";

import AnimatedView from "../../components/AnimatedView";
import NavigateBack from "../../components/NavigateBack";
import GradientView from "../../components/GradientView";

const Shop = ({ setView, user, setUser }) => {
  const [products, setProducts] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const rewardedRef = useRef();

  useEffect(() => {
    const adUnitId = __DEV__
      ? TestIds.REWARDED
      : "ca-app-pub-4914934905972625~8102513732";

    rewardedRef.current = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    return () => {
      rewardedRef.current = null;
    };
  }, []);

  useEffect(() => {
    const unsubscribeLoaded = rewardedRef.current.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedRef.current.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      async (reward) => {
        console.log("User earned reward of ", reward);
        const currentTokenCount = await checkTokens();
        const newTokenCount = currentTokenCount + reward.amount;

        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, user.name), {
          ...user,
          tokens: newTokenCount,
        });

        setUser((prev) => ({
          ...prev,
          tokens: newTokenCount,
        }));
      }
    );

    const unsubscribeClosed = rewardedRef.current.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        rewardedRef.current.load();
      }
    );

    // Start loading the rewarded ad straight away
    rewardedRef.current.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  useEffect(() => {
    async function getProducts() {
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_WONGywBNRxPtGQvyQqcdDkSwXhB" });
      }

      try {
        const fetchedProducts = await Purchases.getProducts(
          ["tokens_100", "tokens_600", "tokens_1300"],
          PURCHASE_TYPE.INAPP
        );
        setProducts(fetchedProducts);
      } catch (e) {
        console.log(err);
      }
    }

    getProducts();
  }, []);

  async function purchaseTokens(productId) {
    try {
      console.log(productId);
      const res = await Purchases.purchaseProduct(
        productId,
        null,
        PURCHASE_TYPE.INAPP
      );

      const currentTokenCount = await checkTokens();
      const usersRef = collection(db, "users");

      switch (productId) {
        case "tokens_100":
          await setDoc(doc(usersRef, user.name), {
            ...user,
            tokens: currentTokenCount + 100,
          });
        case "tokens_600":
          await setDoc(doc(usersRef, user.name), {
            ...user,
            tokens: currentTokenCount + 600,
          });
        case "tokens_1300":
          await setDoc(doc(usersRef, user.name), {
            ...user,
            tokens: currentTokenCount + 1300,
          });
      }
    } catch (err) {
      console.log("PurchaseTokens Error: ", err);
    }
  }

  async function checkTokens() {
    const docRef = doc(db, "users", user.name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().tokens;
    } else {
      return 0;
    }
  }

  return (
    <AnimatedView
      style={globalStyles.container}
      animationType='speed-in-left'
      duration={200}
    >
      <NavigateBack currentView='SHOP' navigateTo={() => setView("main")} />
      <View style={styles.offers}>
        <View style={styles.section}>
          <View style={styles.sectionName}>
            <Text style={{ ...globalStyles.text_heading, fontSize: 18 }}>
              Tokens
            </Text>
          </View>
          <View style={styles.tokenOffers}>
            {products?.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.product}
                onPress={() => purchaseTokens(product.identifier)}
              >
                <GradientView style={styles.gradientContainer}>
                  <View style={styles.amount}>
                    <Ionicons
                      style={{
                        ...globalStyles.text_white,
                        fontSize: 24,
                        fontWeight: "700",
                      }}
                      name='ice-cream'
                    />
                    <Text
                      style={{
                        ...globalStyles.text_white,
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: 22,
                      }}
                    >
                      {product.title.split(" Tokens")[0]}
                    </Text>
                  </View>
                  <View style={styles.price}>
                    <Text style={{ ...globalStyles.text_white, fontSize: 14 }}>
                      {product.priceString}
                    </Text>
                  </View>
                </GradientView>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              try {
                if (!loaded) {
                  console.log("not loaded");
                  return;
                }

                rewardedRef.current.show();
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <GradientView style={styles.buttonContainer}>
              {!loaded ? (
                <Text style={{ ...globalStyles.text_white }}>
                  Loading a Reward Ad!
                </Text>
              ) : (
                <Text style={{ ...globalStyles.text_white }}>
                  Watch an AD to get reward
                </Text>
              )}
              <View style={styles.visual}>
                <Ionicons
                  style={{
                    ...globalStyles.text_white,
                    fontSize: 32,
                    fontWeight: "700",
                  }}
                  name='film'
                />
                <Ionicons
                  style={{
                    ...globalStyles.text_white,
                    fontSize: 32,
                    fontWeight: "700",
                  }}
                  name='arrow-forward'
                />
                <View style={styles.reward}>
                  <Text
                    style={{
                      ...globalStyles.text_white,
                      fontWeight: "700",
                      fontSize: 24,
                    }}
                  >
                    +
                  </Text>
                  <Ionicons
                    style={{
                      ...globalStyles.text_white,
                      fontSize: 32,
                      fontWeight: "700",
                    }}
                    name='ice-cream'
                  />
                  <Text
                    style={{
                      ...globalStyles.text_white,
                      fontWeight: "700",
                      fontSize: 24,
                    }}
                  >
                    5
                  </Text>
                </View>
              </View>
            </GradientView>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  offers: {
    display: "flex",
    gap: 20,
  },

  section: {
    gap: 20,
  },

  tokenOffers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 15,
  },

  product: {
    aspectRatio: 1 / 1,
    flex: 1,
  },

  gradientContainer: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },

  amount: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonContainer: {
    gap: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },

  visual: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  reward: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Shop;
