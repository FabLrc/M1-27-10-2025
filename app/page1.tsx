import Card from "@/components/Card";
import DisplayText from "@/components/DisplayDate";
import Personnage from "@/model/Personnage";
import PersonnageService from "@/services/PersonnageService";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function page1() {
  const [personnages, setPersonnages] = useState<Personnage[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>BONJOUR</Text>
        <DisplayText />
        {loading ? (
          <Text style={styles.loading}>Chargement...</Text>
        ) : (
          <View style={styles.cardContainer}>
            {personnages.map((personnage, index) => (
              <View key={index} style={styles.cardWrapper}>
                <Card personnage={personnage} />
              </View>
            ))}
          </View>
        )}
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 16,
    letterSpacing: 2,
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
    width: "32%",
    marginBottom: 20,
    alignItems: "center",
  },
});
