import Personnage from "@/model/Personnage";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CardProps {
  personnage: Personnage;
  onDelete?: (id: number) => void;
}

export default function Card({ personnage, onDelete }: CardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/${personnage.id}` as any);
  };

  const handleDelete = () => {
    if (onDelete && personnage.id) {
      onDelete(personnage.id);
    }
  };

  return (
    <View style={styles.cardWrapper}>
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
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <MaterialIcons name="close" size={20} color="#d63031" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    position: "relative",
    margin: "auto",
  },
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
  },
  deleteButton: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
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
