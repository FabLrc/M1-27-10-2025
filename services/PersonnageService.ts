import Personnage from "@/model/Personnage";

interface UserAPI {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: {
    address: string;
    city: string;
    country: string;
  };
  university: string;
  company: {
    title: string;
  };
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
        return new Personnage(
          user.id,
          user.lastName,
          user.firstName,
          user.image,
          user.email,
          user.phone,
          user.age,
          user.gender,
          user.address.address,
          user.address.city,
          user.address.country,
          user.university,
          user.company.title
        );
      });

      return personnagesList;
    } catch (error) {
      console.error("Erreur lors du chargement des personnages:", error);
      throw error;
    }
  }
}

export default PersonnageService;
