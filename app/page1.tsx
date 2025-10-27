import Card from "@/components/Card";
import DisplayText from "@/components/DisplayDate";
import Personnage from "@/model/Personnage";
import PersonnageService from "@/services/PersonnageService";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

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
    <ScrollView>
      <View>
        <Text> BONJOUR </Text>
        <DisplayText />
        {loading ? (
          <Text>Chargement...</Text>
        ) : (
          personnages.map((personnage, index) => (
            <Card key={index} personnage={personnage} />
          ))
        )}
      </View>
    </ScrollView>
  );
}
