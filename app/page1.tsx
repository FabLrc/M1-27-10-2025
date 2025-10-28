import AddUserModal from "@/components/AddUserModal";
import Card from "@/components/Card";
import DisplayText from "@/components/DisplayDate";
import Personnage from "@/model/Personnage";
import PersonnageService from "@/services/PersonnageService";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function page1() {
  const [personnages, setPersonnages] = useState<Personnage[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const fetchPersonnages = async () => {
      try {
        const personnagesList = await PersonnageService.loadPersonnages();
        setPersonnages(personnagesList);
      } catch (error) {
        console.error("Erreur lors du chargement des personnages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonnages();
  }, []);

  const handleDeletePersonnage = async (id: number) => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("Réponse API (DELETE):", data);

      if (response.ok) {
        setPersonnages(
          personnages.filter((personnage) => personnage.id !== id)
        );
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  const toggleFilterAgeOver30 = async () => {
    const newState = !filterActive;
    setFilterActive(newState);
    setLoading(true);
    try {
      // Simpler & more reliable: always fetch the full list then filter client-side
      const all = await PersonnageService.loadPersonnages();
      if (newState) {
        const filtered = all.filter((p) => p.age > 30);
        console.log("Filter ON: found", filtered.length, "users > 30");
        setPersonnages(filtered);
      } else {
        console.log("Filter OFF: loading all users", all.length);
        setPersonnages(all);
      }
    } catch (error) {
      console.error("Erreur lors du filtrage:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>BONJOUR</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterActive ? styles.filterButtonActive : undefined,
              ]}
              onPress={toggleFilterAgeOver30}
            >
              <MaterialIcons
                name="filter-list"
                size={20}
                color={filterActive ? "#fff" : "#2d3436"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <DisplayText />
        {loading ? (
          <Text style={styles.loading}>Chargement...</Text>
        ) : (
          <View style={styles.cardContainer}>
            {personnages.map((personnage, index) => (
              <Card
                key={index}
                personnage={personnage}
                onDelete={handleDeletePersonnage}
              />
            ))}
          </View>
        )}
      </View>
      <AddUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 24,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3436",
    letterSpacing: 2,
  },
  addButton: {
    backgroundColor: "#0984e3",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#dfe6e9",
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#00b894",
  },
  loading: {
    fontSize: 18,
    color: "#636e72",
    marginTop: 24,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  cardWrapper: {
    maxWidth: "90%",
    marginBottom: 20,
    alignItems: "center",
    gap: 12,
  },
});
