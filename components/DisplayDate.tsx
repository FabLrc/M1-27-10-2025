import React from "react";
import { Text } from "react-native";

export default function displayDate() {
  const currentDate = new Date();

  return <Text>{currentDate.toLocaleDateString()}</Text>;
}
