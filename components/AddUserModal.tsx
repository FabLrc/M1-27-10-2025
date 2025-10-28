import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
  onUserAdded?: () => void;
}

interface SubmitResponse {
  success: boolean;
  message: string;
}

export default function AddUserModal({
  visible,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SubmitResponse | null>(null);

  const handleAddUser = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setResponse({
        success: false,
        message: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse({
          success: true,
          message: data.message || "Utilisateur ajouté avec succès",
        });
        setFirstName("");
        setLastName("");
        onUserAdded?.();
      } else {
        setResponse({
          success: false,
          message: data.message || "Erreur lors de l'ajout de l'utilisateur",
        });
      }
    } catch (error) {
      setResponse({
        success: false,
        message: "Erreur de connexion",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setResponse(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Ajouter un utilisateur</Text>
            <TouchableOpacity onPress={handleClose}>
              <MaterialIcons name="close" size={24} color="#2d3436" />
            </TouchableOpacity>
          </View>

          {/* Contenu */}
          {response === null ? (
            <>
              {/* Champs de saisie */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Prénom *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez le prénom"
                  value={firstName}
                  onChangeText={setFirstName}
                  editable={!loading}
                />

                <Text style={styles.label}>Nom *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrez le nom"
                  value={lastName}
                  onChangeText={setLastName}
                  editable={!loading}
                />
              </View>

              {/* Bouton d'ajout */}
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleAddUser}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Ajouter</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            // Affichage du résultat
            <View style={styles.resultContainer}>
              {response.success ? (
                <MaterialIcons name="check-circle" size={64} color="#00b894" />
              ) : (
                <MaterialIcons name="cancel" size={64} color="#d63031" />
              )}
              <Text style={styles.resultMessage}>{response.message}</Text>
              <TouchableOpacity style={styles.button} onPress={handleClose}>
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "85%",
    maxWidth: 400,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3436",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#2d3436",
  },
  button: {
    backgroundColor: "#0984e3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  resultMessage: {
    fontSize: 14,
    color: "#2d3436",
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center",
  },
});
