import globalStyles from "../../styles";
import styles from "./styles";

import { View } from "react-native";

import AnimatedView from "../../components/AnimatedView";
import NavigateBack from "../../components/NavigateBack";
import ModelOption from "../../components/ModelOption";

const Models = (props) => {
  const { setView, setChat, chat } = props;

  return (
    <AnimatedView
      style={globalStyles.container}
      animationType='speed-in-left'
      duration={200}
    >
        <NavigateBack 
          currentView="MODELS"
          navigateTo={() => setView("main")}
        />
        <View style={styles.models}>
          <ModelOption 
            name="Fast model"
            model="fast"
            price="1"
            description="Faster response with lower accuracy. Good enough for most tasks."
            isSelected={chat.model === "fast"}
            setChat={setChat}
          />
          <ModelOption 
            name="Slow model"
            model="slow"
            price="10"
            description="Slower response with higher accuracy. Good for more complex tasks."
            isSelected={chat.model === "slow"}
            setChat={setChat}
          />
        </View>
    </AnimatedView>
  );
};

export default Models;