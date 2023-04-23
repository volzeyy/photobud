import { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import "react-native-url-polyfill/auto";
import Chat from "../../components/Chat";
import Purchases from "react-native-purchases";
import Ionicons from "@expo/vector-icons/Ionicons";

import DisplayCard from "../../components/DisplayCard/displaycard";
import NavigateBack from "../../components/NavigateBack";
import PremiumPage from "../../components/PremiumPage/premiumpage";

function Answer({ chat, setChat, setView }) {
  const scrollViewRef = useRef();

  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  useEffect(() => {
    checkPremium();
  }, []);
  
  async function checkPremium() {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setIsUserPremium(typeof customerInfo.entitlements.active["premium"] !== "undefined");
    } catch (err) {
      console.log(JSON.stringify(err));
      return undefined;
    }
  }

  return (
    <>
      <View style={styles.container}>
        <NavigateBack currentView='ANSWER' navigateTo={() => setView("main")} />
        <ScrollView
          ref={scrollViewRef}
          style={styles.main}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <View style={styles.answerContainer}>
            <DisplayCard
              image={chat.image}
              label='QUESTION'
              icon='help-circle'
              text={chat.question}
            />
            <DisplayCard label='ANSWER' icon='star' text={chat.answer} />
            {isUserPremium ? (
              <DisplayCard
                label='EXPLANATION'
                icon='flame'
                text={chat.explanation}
              />
            ) : (
              <TouchableOpacity onPress={() => setIsPremiumOpen(true)}>
                <View style={styles.premiumContainer}>
                  <View style={styles.premiumLabel}>
                    <Ionicons
                      name='flame'
                      size={24}
                      color='rgba(255, 255, 255, 0.5)'
                    />
                    <Text style={styles.premiumExplanation}>EXPLANATION</Text>
                  </View>
                  <Text style={styles.premiumText}>
                    Can be unlocked with premium!
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Chat
            chat={chat}
            setChat={setChat}
            label='Have a question?'
            placeholder='e.g. Can you do 2 + 2?'
            setIsPremiumOpen={setIsPremiumOpen}
          />
        </ScrollView>
      </View>
      {isPremiumOpen ? (
        <PremiumPage setIsPremiumOpen={setIsPremiumOpen} />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  text: {
    color: "white",
  },

  main: {
    flex: 1,
  },

  questionInput: {
    flex: 1,
  },

  input: {
    color: "white",
    flex: 1,
  },

  answerContainer: {
    gap: 25,
    padding: 20,
    paddingTop: 5,
  },

  //
  label: {
    color: "white",
    fontSize: 24,
  },

  chatLabel: {
    display: "flex",
    gap: 5,
  },

  chat: {
    display: "flex",
    flex: 1,
    gap: 25,
    padding: 20,
    paddingTop: 5,
  },
  //

  premiumContainer: {
    backgroundColor: "#1464FF",
    padding: 10,
    borderRadius: 10,
  },

  premiumLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  premiumExplanation: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
  },

  premiumText: {
    color: "white",
    fontSize: 18,
    lineHeight: 28,
  },
});

export default Answer;
