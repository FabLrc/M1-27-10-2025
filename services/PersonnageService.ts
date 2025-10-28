import Personnage from "@/model/Personnage";

interface UserAPI {
  firstName: string;
  lastName: string;
  image: string;
}

interface ApiResponse {
  users: UserAPI[];
}

class PersonnageService {
  static async loadPersonnages(): Promise<Personnage[]> {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data: ApiResponse = await response.json();

      const personnagesList: Personnage[] = data.users.map((user: UserAPI) => {
        return new Personnage(user.lastName, user.firstName, user.image);
      });

      return personnagesList;
    } catch (error) {
      console.error("Erreur lors du chargement des personnages:", error);
      throw error;
    }
  }
}

export default PersonnageService;
