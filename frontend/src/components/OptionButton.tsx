import React from "react";
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions, View } from "react-native";

interface OptionButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onPress: (value: string) => void;
}

export default function OptionButton({ label, value, isSelected, onPress }: OptionButtonProps) {

  const { width: windowWidth } = useWindowDimensions();

  // responsividade para o button 
  const padding_button = windowWidth < 600 ? windowWidth * 0.05 : 40;
  const marginVertical_button = windowWidth < 600 ? windowWidth * 0.03 : 30;
  const borderRadius_button = windowWidth < 600 ? windowWidth * 0.2 : 5;
  const width_button = windowWidth < 600 ? windowWidth * 0.77 : 550;
  const height_button = windowWidth < 600 ? windowWidth * 0.18 : 25;

  // responsividade para o text 
  const fontSize_button = windowWidth < 600 ? windowWidth * 0.075 : 30;

  // responsividade para o radioOuter 
  const width_radioOuter = windowWidth < 600 ? windowWidth * 0.05 : 24;  
  const height_radioOuter = windowWidth < 600 ? windowWidth * 0.05 : 24;
  const borderRadius_radioOuter = windowWidth < 600 ? (windowWidth * 0.05) / 2 : 12; // para manter circular
  const borderWidth_radioOuter = windowWidth < 600 ? 2 : 3;

  // responsividade para o radioInner 
  const width_radioInner = windowWidth < 600 ? windowWidth * 0.025 : 12;  
  const height_radioInner = windowWidth < 600 ? windowWidth * 0.025 : 12;
  const borderRadius_radioInner = windowWidth < 600 ? (windowWidth * 0.025) / 2 : 6; 

  return (
    <TouchableOpacity
      style={[
        styles.button, {
          padding: padding_button,
          marginVertical: marginVertical_button,
          borderRadius: borderRadius_button,
          width: width_button,
          height: height_button,
        }
      ]}
      onPress={() => onPress(value)}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.text, {
          fontSize: fontSize_button,
        }
      ]}
      >{label}</Text>
      <View
        style={[
          styles.radioOuter, {
            width: width_radioOuter,
            height: height_radioOuter,
            borderRadius: borderRadius_radioOuter,
            borderWidth: borderWidth_radioOuter,
          }
        ]}>
        {isSelected && <View style={[
          styles.radioInner, {
            width: width_radioInner,
            height: height_radioInner,
            borderRadius: borderRadius_radioInner,
          }
        ]} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
  },
  radioOuter: {
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    backgroundColor: "#000000",
  },
});
