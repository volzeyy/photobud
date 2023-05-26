import { useEffect, useState } from "react";
import { Platform } from "react-native";

import Main from "./views/Main";
import Menu from "./views/Menu";
import Answer from "./views/Answer";
import Tutorial from "./views/Tutorial";
import AboutUs from "./views/AboutUs";
import Contacts from "./views/Contacts";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import Explanation from "./views/Explanation";
import Models from "./views/Models";
import Shop from "./views/Shop";
import uuid from "react-native-uuid";

import { db } from "./firebase/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState({
    name: "",
    tokens: null,
    joinDate: {},
  });
  const [view, setView] = useState("main");
  const [chat, setChat] = useState({
    image: "",
    question: "",
    answer: "",
    explanation: "",
    model: "fast",
    messages: [],
  });

  useEffect(() => {
    try {
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
      if (Platform.OS === "android") {
        async function checkLol() {
          Purchases.configure({ apiKey: "goog_WONGywBNRxPtGQvyQqcdDkSwXhB" });
        }
        checkLol();
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const value = await getData();
        if (value !== null) {
          setUser((prev) => ({
            ...prev,
            name: value,
          }));
          return;
        }

        await storeData();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user.name) {
      return;
    }

    (async () => {
      const docRef = doc(db, "users", user.name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser((prev) => ({
          ...docSnap.data(),
          name: prev.name,
        }));
      } else {
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, user.name), {
          name: user.name,
          tokens: 50,
          joinDate: new Date(),
        });
      }
    })();
  }, [user.name]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      return value;
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async () => {
    try {
      const userId = uuid.v4();
      await AsyncStorage.setItem("user", userId);
      setUser((prev) => ({
        ...prev,
        name: userId,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  switch (view) {
    case "main":
      return (
        <Main
          setView={setView}
          setChat={setChat}
          chat={chat}
          user={user}
          setUser={setUser}
        />
      );
    case "models":
      return <Models setView={setView} setChat={setChat} chat={chat} />;
    case "shop":
      return <Shop setView={setView} user={user} setUser={setUser} />;
    case "menu":
      return <Menu setView={setView} />;
    case "answer":
      return (
        <Answer
          chat={chat}
          setChat={setChat}
          setView={setView}
          user={user}
          setUser={setUser}
        />
      );
    case "explanation":
      return <Explanation chat={chat} setChat={setChat} setView={setView} />;
    case "aboutus":
      return <AboutUs setView={setView} />;
    case "contacts":
      return <Contacts setView={setView} />;
    case "tutorial":
      return <Tutorial />;
  }
}
