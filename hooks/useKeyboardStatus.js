import { Keyboard } from "react-native"
import { useState, useEffect } from "react";

export function useKeyboardStatus() {
  const [keyboardStatus, setKeyboardStatus] = useState({
    isOn: false,
  });

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(prev => {
        return {...prev,
            isOn: true,
        }
      });
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(prev => {
        return {...prev,
            isOn: false,
        }
      });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardStatus;
}
