import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from "react-native";

// Pegando a largura da tela
const { width } = Dimensions.get("window");

interface OptionButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onPress: (value: string) => void;
}

export default function OptionButton({ label, value, isSelected, onPress }: OptionButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPress(value)}
       activeOpacity={0.8}
    >
      <Text style={styles.text}>{label}</Text>
      <View style={styles.radioOuter}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.045,
    marginVertical: width * 0.06,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    width: width * 0.75,
    height: width * 0.16,
  },
  text: {
    color: "#000000",
    fontSize: 24,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000000",
  },
});
