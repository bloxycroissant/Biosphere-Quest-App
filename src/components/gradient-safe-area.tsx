import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const STARS = [
  { top: "5%", left: "12%", size: 2.5, opacity: 0.8 },
  { top: "8%", left: "41%", size: 3, opacity: 0.95 },
  { top: "6%", left: "78%", size: 3, opacity: 0.9 },
  { top: "14%", left: "26%", size: 2, opacity: 0.6 },
  { top: "18%", left: "65%", size: 2.5, opacity: 0.85 },
  { top: "22%", left: "88%", size: 2, opacity: 0.7 },
  { top: "28%", left: "15%", size: 2.5, opacity: 0.9 },
  { top: "32%", left: "34%", size: 2, opacity: 0.65 },
  { top: "36%", left: "74%", size: 2.5, opacity: 0.8 },
  { top: "44%", left: "8%", size: 2, opacity: 0.75 },
  { top: "48%", left: "92%", size: 2.5, opacity: 0.85 },
  { top: "54%", left: "22%", size: 2, opacity: 0.6 },
  { top: "60%", left: "36%", size: 2.5, opacity: 0.9 },
  { top: "68%", left: "14%", size: 2, opacity: 0.7 },
  { top: "72%", left: "82%", size: 2.5, opacity: 0.8 },
  { top: "80%", left: "28%", size: 2, opacity: 0.65 },
  { top: "85%", left: "66%", size: 2, opacity: 0.7 },
];

const BUBBLES = [
  { bottom: "11%", left: "66%", size: 12, opacity: 0.22 },
  { bottom: "8%", left: "73%", size: 7, opacity: 0.28 },
  { bottom: "16%", left: "32%", size: 9, opacity: 0.18 },
];

interface CometConfig {
  id: string;
  topPercent: number;
  startX: number;
  duration: number;
  delay: number;
  tailWidth: number;
}

const COMETS: CometConfig[] = [
  {
    id: "c1",
    topPercent: 0.36,
    startX: 0.34,
    duration: 7200,
    delay: 0,
    tailWidth: 65,
  },
  {
    id: "c2",
    topPercent: 0.41,
    startX: 0.27,
    duration: 8200,
    delay: 1100,
    tailWidth: 72,
  },
  {
    id: "c3",
    topPercent: 0.46,
    startX: 0.2,
    duration: 6800,
    delay: 500,
    tailWidth: 68,
  },
  {
    id: "c4",
    topPercent: 0.46,
    startX: 0.69,
    duration: 7500,
    delay: 1600,
    tailWidth: 70,
  },
  {
    id: "c5",
    topPercent: 0.52,
    startX: 0.64,
    duration: 7900,
    delay: 800,
    tailWidth: 64,
  },
  {
    id: "c6",
    topPercent: 0.72,
    startX: 0.77,
    duration: 7400,
    delay: 2200,
    tailWidth: 68,
  },
];

function ShootingComet({ config }: { config: CometConfig }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    const travelDistance = SCREEN_WIDTH * 0.32;

    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(config.delay),
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: -travelDistance,
            duration: config.duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 1,
              duration: config.duration * 0.2,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: config.duration * 0.8,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    anim.start();
    return () => anim.stop();
  }, [config, opacity, translateX]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.cometContainer,
        {
          top: SCREEN_HEIGHT * config.topPercent,
          left: SCREEN_WIDTH * config.startX,
          opacity,
          transform: [{ translateX }],
        },
      ]}
    >
      <View style={styles.cometHeadOuter}>
        <View style={styles.cometHeadCore} />
      </View>
      <LinearGradient
        colors={[
          "rgba(180, 248, 255, 0.95)",
          "rgba(72, 219, 251, 0.45)",
          "rgba(72, 219, 251, 0)",
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.cometTail, { width: config.tailWidth }]}
      />
    </Animated.View>
  );
}

export function GradientSafeAreaView({
  style,
  children,
  ...props
}: SafeAreaViewProps) {
  const twinkleAnim = useRef(new Animated.Value(0.55)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const twinkleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(twinkleAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(twinkleAnim, {
          toValue: 0.45,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    twinkleLoop.start();
    floatLoop.start();

    return () => {
      twinkleLoop.stop();
      floatLoop.stop();
    };
  }, [floatAnim, twinkleAnim]);

  return (
    <View style={styles.root}>
      {/* Cosmic Purple -> Deep Indigo -> Oceanic Cyan Gradient */}
      <LinearGradient
        colors={["#1a113b", "#281e66", "#164d7a", "#11829c", "#1ca0b5"]}
        locations={[0, 0.28, 0.56, 0.82, 1]}
        start={{ x: 0.25, y: 0 }}
        end={{ x: 0.75, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient Stars, Comets, Sea Creatures & Bubbles */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {STARS.map((star, idx) => (
          <Animated.View
            key={`star-${idx}`}
            style={[
              styles.star,
              {
                top: star.top as any,
                left: star.left as any,
                width: star.size,
                height: star.size,
                borderRadius: star.size / 2,
                opacity: idx % 2 === 0 ? twinkleAnim : star.opacity,
              },
            ]}
          />
        ))}

        {COMETS.map((comet) => (
          <ShootingComet key={comet.id} config={comet} />
        ))}

        {/* Glowing Purple Jellyfish Accent (Right Mid-Bottom) */}
        <Animated.View
          style={[
            styles.jellyfishWrapper,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <View style={styles.jellyfishBell} />
          <View style={styles.jellyfishTentacles}>
            <View style={styles.tentacle} />
            <View style={[styles.tentacle, { height: 9 }]} />
            <View style={styles.tentacle} />
          </View>
        </Animated.View>

        {/* Glowing Green Sea Turtle Accent (Bottom Left-Center) */}
        <Animated.View
          style={[
            styles.turtleWrapper,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <View style={styles.turtleHalo}>
            <View style={styles.turtleShell} />
          </View>
        </Animated.View>

        {/* Floating Underwater Bubbles */}
        {BUBBLES.map((bubble, idx) => (
          <View
            key={`bubble-${idx}`}
            style={[
              styles.bubble,
              {
                bottom: bubble.bottom as any,
                left: bubble.left as any,
                width: bubble.size,
                height: bubble.size,
                borderRadius: bubble.size / 2,
                opacity: bubble.opacity,
              },
            ]}
          />
        ))}
      </View>

      <SafeAreaView {...props} style={[style, styles.transparentSafeArea]}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1a113b",
  },
  transparentSafeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  star: {
    position: "absolute",
    backgroundColor: "#ffffff",
    shadowColor: "#a5f3fc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 2,
  },
  cometContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  cometHeadOuter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(251, 191, 36, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  cometHeadCore: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#fbbf24",
  },
  cometTail: {
    height: 2.5,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    marginLeft: -2,
  },
  jellyfishWrapper: {
    position: "absolute",
    top: "68%",
    left: "63%",
    alignItems: "center",
  },
  jellyfishBell: {
    width: 16,
    height: 11,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: "rgba(167, 139, 250, 0.55)",
    borderWidth: 1,
    borderColor: "#c4b5fd",
  },
  jellyfishTentacles: {
    flexDirection: "row",
    gap: 2.5,
    marginTop: 1,
  },
  tentacle: {
    width: 1.5,
    height: 7,
    borderRadius: 1,
    backgroundColor: "rgba(196, 181, 253, 0.7)",
  },
  turtleWrapper: {
    position: "absolute",
    bottom: "10%",
    left: "39%",
  },
  turtleHalo: {
    width: 24,
    height: 14,
    borderRadius: 12,
    backgroundColor: "rgba(52, 211, 153, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(110, 231, 183, 0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  turtleShell: {
    width: 12,
    height: 7,
    borderRadius: 6,
    backgroundColor: "#34d399",
  },
  bubble: {
    position: "absolute",
    backgroundColor: "rgba(165, 243, 252, 0.35)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.45)",
  },
});
