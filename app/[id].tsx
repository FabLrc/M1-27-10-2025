import Personnage from "@/model/Personnage";
import PersonnageService from "@/services/PersonnageService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PersonnageDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [personnage, setPersonnage] = useState<Personnage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonnage = async () => {
      try {
        const personnages = await PersonnageService.loadPersonnages();
        const found = personnages.find((p) => p.id === parseInt(id as string));
        if (found) {
          setPersonnage(found);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du personnage:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPersonnage();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Chargement...</Text>
      </View>
    );
  }

  if (!personnage) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Personnage non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Image source={{ uri: personnage.image }} style={styles.image} />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>
              {personnage.prenom} {personnage.nom}
            </Text>
            <Text style={styles.subtitle}>{personnage.profession}</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Âge:</Text>
            <Text style={styles.detailValue}>{personnage.age} ans</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Genre:</Text>
            <Text style={styles.detailValue}>
              {personnage.genre === "male" ? "Homme" : "Femme"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{personnage.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Téléphone:</Text>
            <Text style={styles.detailValue}>{personnage.phone}</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Adresse</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rue:</Text>
            <Text style={styles.detailValue}>{personnage.adresse}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ville:</Text>
            <Text style={styles.detailValue}>{personnage.ville}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pays:</Text>
            <Text style={styles.detailValue}>{personnage.pays}</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Éducation & Carrière</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Université:</Text>
            <Text style={styles.detailValue}>{personnage.universite}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Profession:</Text>
            <Text style={styles.detailValue}>{personnage.profession}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  backButton: {
    marginBottom: 20,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#0066cc",
    fontWeight: "600",
  },
  headerSection: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#636e72",
  },
  detailsSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#00b894",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#636e72",
    flex: 0.4,
  },
  detailValue: {
    fontSize: 14,
    color: "#2d3436",
    flex: 0.6,
    textAlign: "right",
  },
  loading: {
    fontSize: 18,
    color: "#636e72",
    textAlign: "center",
    marginTop: 40,
  },
  error: {
    fontSize: 18,
    color: "#d63031",
    textAlign: "center",
    marginTop: 40,
  },
});
