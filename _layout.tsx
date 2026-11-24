import { LinearGradient } from "expo-linear-gradient";
import {
  DarkTheme,
  DefaultTheme,
  Slot,
  ThemeProvider,
  usePathname,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/mobile-navigation";
import { ProgressProvider } from "@/hooks/use-progress";

SplashScreen.preventAutoHideAsync().catch(() => {});

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
    topPercent: 0.14,
    startX: 0.08,
    duration: 7500,
    delay: 0,
    tailWidth: 65,
  },
  {
    id: "c2",
    topPercent: 0.19,
    startX: 0.22,
    duration: 8500,
    delay: 1200,
    tailWidth: 75,
  },
  {
    id: "c3",
    topPercent: 0.44,
    startX: 0.66,
    duration: 6800,
    delay: 600,
    tailWidth: 60,
  },
  {
    id: "c4",
    topPercent: 0.55,
    startX: 0.78,
    duration: 7200,
    delay: 2000,
    tailWidth: 70,
  },
  {
    id: "c5",
    topPercent: 0.65,
    startX: 0.84,
    duration: 8000,
    delay: 900,
    tailWidth: 65,
  },
  {
    id: "c6",
    topPercent: 0.7,
    startX: 0.76,
    duration: 7600,
    delay: 2800,
    tailWidth: 72,
  },
];

export default function RootLayout(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const [isSplashActive, setIsSplashActive] = useState<boolean>(true);
  const twinkleAnim = useRef(new Animated.Value(0.55)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const hideNativeSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.log("Error hiding splash screen:", e);
      }
    };
    hideNativeSplash();

    const timer = setTimeout(() => {
      setIsSplashActive(false);
    }, 3000);

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
          toValue: -5,
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
      clearTimeout(timer);
      twinkleLoop.stop();
      floatLoop.stop();
    };
  }, [floatAnim, twinkleAnim]);

  const isWelcomeOrAuth =
    pathname === "/" ||
    pathname === "/welcome" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verifyEmail" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-code" ||
    pathname === "/new-password";

  const isParentRoute =
    pathname.includes("/parent-dashboard") || pathname.startsWith("/parent");

  const isStudentTabRoute =
    pathname.includes("/home") ||
    pathname.includes("/courses") ||
    pathname.includes("/games") ||
    pathname.includes("/profile") ||
    pathname === "/(tabs)/home" ||
    pathname === "/(tabs)/courses" ||
    pathname === "/(tabs)/games" ||
    pathname === "/(tabs)/profile";

  const customTheme = {
    ...(colorScheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: "transparent",
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <ProgressProvider>
        <StatusBar style="light" />
        <LinearGradient
          colors={["#1a113b", "#261e63", "#184673", "#117c94", "#1799ad"]}
          locations={[0, 0.28, 0.58, 0.84, 1]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.background}
        >
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

            <Animated.View
              style={[
                styles.bottomAccentWrapper,
                { transform: [{ translateY: floatAnim }] },
              ]}
            >
              <View style={styles.turtleHalo}>
                <View style={styles.turtleShell} />
              </View>
            </Animated.View>
          </View>

          {isSplashActive ? (
            <AnimatedSplashOverlay />
          ) : isWelcomeOrAuth || isParentRoute || !isStudentTabRoute ? (
            <AnimatedRoute />
          ) : (
            <AppTabs />
          )}
        </LinearGradient>
      </ProgressProvider>
    </ThemeProvider>
  );
}

function ShootingComet({ config }: { config: CometConfig }): React.JSX.Element {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    const travelDistance = SCREEN_WIDTH * 0.35;

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

function AnimatedRoute(): React.JSX.Element {
  const pathname = usePathname();
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    entrance.setValue(0);
    Animated.spring(entrance, {
      toValue: 1,
      useNativeDriver: true,
      tension: 55,
      friction: 9,
    }).start();
  }, [entrance, pathname]);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        opacity: entrance,
        transform: [
          {
            translateY: entrance.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 0],
            }),
          },
        ],
      }}
    >
      <Slot />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
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
  bottomAccentWrapper: {
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
    borderColor: "rgba(110, 231, 183, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  turtleShell: {
    width: 12,
    height: 7,
    borderRadius: 6,
    backgroundColor: "#34d399",
  },
});
