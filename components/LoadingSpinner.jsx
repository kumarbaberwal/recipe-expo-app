import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export default function LoadingSpinner({ message = "Loading...", size = "large" }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size={size} color={colors.primary} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: colors.background,
  },
  content: {
    alignItems: "center",
    gap: 16,
  },
  message: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
  },
});
