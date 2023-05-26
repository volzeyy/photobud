import globalStyles from "../../styles";

import AnimatedView from "../../components/AnimatedView";
import NavigateBack from "../../components/NavigateBack";

const Menu = (props) => {
  const { setView } = props;

  return (
    <AnimatedView
      style={globalStyles.container}
      animationType='speed-in-left'
      duration={200}
    >
        <NavigateBack 
          currentView="MENU"
          navigateTo={() => setView("main")}
        />
    </AnimatedView>
  );
};

export default Menu;
