import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import Main from "./views/Main";
import Answer from "./views/Answer"
import Tutorial from "./views/Tutorial";
import ChatRoom from "./views/ChatRoom";
import AboutUs from "./views/AboutUs";
import Contacts from "./views/Contacts";

import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { REVENUECAT_PUBLIC_GOOGLE_KEY } from '@env'

export default function App() {
  const [view, setView] = useState("main");
  const [chat, setChat] = useState({
    image: "",
    question: "",
    answer: "",
    explanation: "",
    messages: []
  })
  const [chatRoom, setChatRoom] = useState({
    messages: [],
  })

  useEffect(() => {
    try {
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
      if (Platform.OS === 'android') {
        async function checkLol() {
          Purchases.configure({apiKey: "goog_WONGywBNRxPtGQvyQqcdDkSwXhB" });
          const isConfig = await Purchases.isConfigured()
        }
        checkLol();
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }, [])

  switch(view) {
    case "main":
      return (
        <Main
          setView={setView}
          setChat={setChat}
        />
      )
    case "answer":
      return (
        <Answer 
          chat={chat}
          setChat={setChat}
          setView={setView}
        />
      )
    case "chatroom":
      return (
        <ChatRoom 
          chat={chatRoom}
          setChat={setChatRoom}
          setView={setView}
        />
      )
    case "aboutus":
      return (
        <AboutUs 
          setView={setView}
        />
      )
    case "contacts":
      return (
        <Contacts 
          setView={setView}
        />
      )
    case "tutorial":
      return (
        <Tutorial />
      )
  }
}