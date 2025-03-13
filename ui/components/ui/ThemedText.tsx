import { Text, type TextProps, StyleSheet } from "react-native";
import { Platform } from "react-native";

export type ThemedTextProps = TextProps & {
  type?:
    | "displayLarge"
    | "displayMedium"
    | "displaySmall"
    | "headlineLarge"
    | "headlineMedium"
    | "headlineSmall"
    | "titleLarge"
    | "titleMedium"
    | "titleSmall"
    | "labelLarge"
    | "labelMedium"
    | "labelSmall"
    | "bodyLarge"
    | "bodyMedium"
    | "bodySmall"
    | "overline"
    | "caption";
};

export function ThemedText({
  style,
  type = "bodyLarge",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        type === "displayLarge" && styles.displayLarge,
        type === "displayMedium" && styles.displayMedium,
        type === "displaySmall" && styles.displaySmall,
        type === "headlineLarge" && styles.headlineLarge,
        type === "headlineMedium" && styles.headlineMedium,
        type === "headlineSmall" && styles.headlineSmall,
        type === "titleLarge" && styles.titleLarge,
        type === "titleMedium" && styles.titleMedium,
        type === "titleSmall" && styles.titleSmall,
        type === "labelLarge" && styles.labelLarge,
        type === "labelMedium" && styles.labelMedium,
        type === "labelSmall" && styles.labelSmall,
        type === "bodyLarge" && styles.bodyLarge,
        type === "bodyMedium" && styles.bodyMedium,
        type === "bodySmall" && styles.bodySmall,
        // type === "overline" && styles.overline,
        // type === "caption" && styles.caption,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  displayLarge: {
    fontSize: 64,
    lineHeight: 72,
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  displayMedium: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  displaySmall: {
    fontSize: 40,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  headlineLarge: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  headlineMedium: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  headlineSmall: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  titleMedium: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  titleSmall: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Switzer-Bold",
  },
  labelMedium: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Switzer-Bold",
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Switzer-Bold",
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Switzer-Medium",
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Switzer-Medium",
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Switzer-Medium",
  },
});
