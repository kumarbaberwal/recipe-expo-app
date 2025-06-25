import { colors } from "@/constants/colors";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Stack screenOptions={{ headerShown: false }} />
        {/* <StatusBar backgroundColor={colors.background} /> */}
      </SafeAreaView>
    </ClerkProvider>
  );
}
