import personnagesData from "@/assets/personnages.json";
import Personnage from "@/model/Personnage";

interface PersonnageData {
  nom: string;
  prenom: string;
  image: string;
}

class PersonnageService {
  static async loadPersonnages(): Promise<Personnage[]> {
    try {
      const data: PersonnageData[] = personnagesData;

      const personnagesList: Personnage[] = data.map((p: PersonnageData) => {
        const imageUri = `@/assets/images/${p.image}`;
        return new Personnage(p.nom, p.prenom, imageUri);
      });

      return personnagesList;
    } catch (error) {
      console.error("Erreur lors du chargement des personnages:", error);
      throw error;
    }
  }
}

export default PersonnageService;
