import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission de localisation refusée");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (err) {
        setErrorMsg("Impossible de récupérer la localisation");
        console.error("Location error:", err);
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission caméra refusée");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        // expo-image-picker v14+ returns an array in result.assets
        // fallback to result.uri for older versions
        const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
        setPhotoUri(uri ?? null);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setErrorMsg("Impossible d'accéder à la caméra");
    }
  };

  return (
    <View style={styles.viewStyle}>
      <View style={styles.buttonsRow}>
        <Button onPress={() => router.push("/page1")} title="Page 1" />
        <Button onPress={() => router.push("/tab1")} title="Page 2" />
      </View>

      <View style={styles.positionContainer}>
        <Text style={styles.positionLabel}>Position de l'appareil:</Text>
        {errorMsg ? (
          <Text style={styles.positionText}>{errorMsg}</Text>
        ) : location ? (
          <Text style={styles.positionText}>
            Lat: {location.coords.latitude.toFixed(6)} • Lon:{" "}
            {location.coords.longitude.toFixed(6)}
          </Text>
        ) : (
          <Text style={styles.positionText}>Obtention de la position...</Text>
        )}
      </View>

      <View style={styles.photoSection}>
        <Button title="Prendre une photo" onPress={takePhoto} />
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.preview} />
        ) : null}
      </View>

      {/* <Link href="/page1">PAGE1</Link>
      <Link href="/tab1">PAGE2</Link>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 16,
  },
  positionContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  positionLabel: {
    fontWeight: "600",
    marginBottom: 6,
  },
  positionText: {
    color: "#333",
  },
  photoSection: {
    marginTop: 16,
    alignItems: "center",
    width: "100%",
  },
  preview: {
    width: 240,
    height: 240,
    marginTop: 12,
    borderRadius: 8,
  },
});
