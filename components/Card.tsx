import Personnage from "@/model/Personnage";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card({ personnage }: { personnage: Personnage }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/${personnage.id}` as any);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.title}>
          {personnage.nom} {personnage.prenom}
        </Text>
      </View>
      <Image
        source={
          typeof personnage.image === "string"
            ? { uri: personnage.image }
            : personnage.image
        }
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    gap: 12,
    margin: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 8,
  },
});
