import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  Layout,
  LightSpeedInLeft,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  LightSpeedInRight,
} from "react-native-reanimated";

const AnimatedView = (props) => {
  const { style, children, animationType, duration } = props;

  switch (animationType) {
    case "speed-in-left":
      return (
        <Animated.View
          style={{ ...style }}
          entering={LightSpeedInLeft.duration(duration)}
          exiting={LightSpeedOutLeft.duration(duration)}
          layout={Layout.springify()}
        >
          {children}
        </Animated.View>
      );
    case "speed-in-left_fade-out":
      return (
        <Animated.View
          style={{ ...style }}
          entering={LightSpeedInLeft.duration(duration)}
          exiting={FadeOut.duration(duration)}
          layout={Layout.springify()}
        >
          {children}
        </Animated.View>
      )
    case "speed-in-right":
      return (
        <Animated.View
          style={{ ...style }}
          entering={LightSpeedInRight.duration(duration)}
          exiting={LightSpeedOutRight.duration(duration)}
          layout={Layout.springify()}
        >
          {children}
        </Animated.View>
      );
    case "speed-in-left-right":
      return (
        <Animated.View
          style={{ ...style }}
          entering={LightSpeedInLeft.duration(duration)}
          exiting={LightSpeedOutRight.duration(duration)}
          layout={Layout.springify()}
        >
          {children}
        </Animated.View>
      );
    case "slide-left":
      return (
        <Animated.View
          style={{ ...style }}
          entering={SlideInLeft.duration(duration)}
          exiting={SlideOutLeft.duration(duration)}
          layout={Layout.springify()}
        >
          {children}
        </Animated.View>
      );
    case "slide-right":
      return (
        <Animated.View
          style={{ ...style }}
          entering={SlideInRight.duration(duration)}
          exiting={SlideOutRight.duration(duration)}
          layout={Layout.springify()}
        >
          {children}
        </Animated.View>
      );
    case "fade":
      return (
        <Animated.View
          style={{ ...style }}
          entering={FadeIn.duration(duration)}
          exiting={FadeOut.duration(duration)}
          layout={Layout.springify()}
        >
          {children}
        </Animated.View>
      );
    case "custom":
      return (
        <Animated.View
          style={{ ...style }}
          entering={LightSpeedInLeft.duration(duration)}
          layout={Layout.springify()}
        >
          {children}
        </Animated.View>
      )
  }
};

export default AnimatedView;
