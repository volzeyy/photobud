import { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Chat from "../../components/Chat";
import NavigateBack from "../../components/NavigateBack";

const ChatRoom = ({ chat, setChat, setView }) => {
  const scrollViewRef = useRef();

  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <NavigateBack currentView='Chat' navigateTo={() => setView("main")} />
        <ScrollView
          ref={scrollViewRef}
          style={styles.main}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <Chat
            label='Anything on your heart?'
            chat={chat}
            setChat={setChat}
            placeholder='e.g. Nope.'
            setIsPremiumOpen={setIsPremiumOpen}
          />
        </ScrollView>
      </View>
      {isPremiumOpen ? (
        <PremiumPage setIsPremiumOpen={setIsPremiumOpen} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },

  main: {
    flex: 1,
  },
});

export default ChatRoom;
