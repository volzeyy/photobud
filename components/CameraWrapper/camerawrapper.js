import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const CameraWrapper = (props) => {
  const { type, flash, cameraRef, children } = props;
  const {height, width, scale, fontScale} = useWindowDimensions();

  const [aspectRatio, setAspectRatio] = useState("4:3");

  useEffect(() => {
    console.log("Aspect Ratio: ", Math.round((height/width)*10))
    setAspectRatio(`${(Math.round(height/width)*10)}:${10}`)
  }, [])


  return (
    <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef} ratio={aspectRatio} >
      {children}
    </Camera>
  );
};

const styles = StyleSheet.create({
    camera: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        flex: 1,
    },
})

export default CameraWrapper;