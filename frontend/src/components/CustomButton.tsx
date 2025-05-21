import React from 'react';
import { TouchableOpacity, Text, Dimensions, StyleSheet, TextStyle } from 'react-native';

type Props = {
    title?: string;
    onPress: () => void;
    width?: number;
    height?: number;
    borderRadius?: number;
    marginVertical?: number;
    marginTop?: number;
    padding?: number;
    textStyle?: TextStyle;
};

const { width: screenWidth } = Dimensions.get('window');

const CustomButton = ({ title, onPress, width, height, borderRadius, marginVertical, marginTop, padding, textStyle }: Props) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    width: width ?? screenWidth * 0.45,
                    height: height ?? screenWidth * 0.15,
                    borderRadius: borderRadius ?? 15,
                    marginVertical: marginVertical ?? screenWidth * 0.045,
                    marginTop: marginTop ?? screenWidth * 0.1,
                    padding: padding ?? screenWidth * 0.02,
                }
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default CustomButton;
