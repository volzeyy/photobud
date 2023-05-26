import { LinearGradient } from "expo-linear-gradient";

const GradientView = ({children, style}) => {
  return (
    <LinearGradient
      colors={["#0047FF", "#8F00FF"]}
      style={{...style}}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientView;
