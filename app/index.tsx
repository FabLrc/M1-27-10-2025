import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.viewStyle}>
      <Button onPress={() => router.push("/page1")} title="Page 1" />
      <Button onPress={() => router.push("/tab1")} title="Page 2" />

      {/* <Link href="/page1">PAGE1</Link>
      <Link href="/tab1">PAGE2</Link>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
