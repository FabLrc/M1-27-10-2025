class Personnage {
  id: number;
  nom: string;
  prenom: string;
  image: string;
  email: string;
  phone: string;
  age: number;
  genre: string;
  adresse: string;
  ville: string;
  pays: string;
  universite: string;
  profession: string;

  constructor(
    id: number,
    nom: string,
    prenom: string,
    image: string,
    email: string,
    phone: string,
    age: number,
    genre: string,
    adresse: string,
    ville: string,
    pays: string,
    universite: string,
    profession: string
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.image = image;
    this.email = email;
    this.phone = phone;
    this.age = age;
    this.genre = genre;
    this.adresse = adresse;
    this.ville = ville;
    this.pays = pays;
    this.universite = universite;
    this.profession = profession;
  }
}

export default Personnage;
