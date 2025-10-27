import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="page1" />
      <Stack.Screen
        name="(page2)"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Feather
              style={styles.iconStyle}
              name="home"
              size={24}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 0,
    paddingLeft: 10,
  },
});
