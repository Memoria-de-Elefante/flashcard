import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, useWindowDimensions } from 'react-native';

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

const CustomButton = ({ title, onPress, width, height, borderRadius, marginVertical, marginTop, padding, textStyle }: Props) => {
    const { width: windowWidth } = useWindowDimensions(); 
    
    // responsividade do button
    const width_button = windowWidth < 600 ? windowWidth * 0.5 : 200;
    const height_button = windowWidth < 600 ? windowWidth * 0.15 : 70;
    const borderRadius_button = windowWidth < 600 ? windowWidth * 0.02 : 10;
    const marginVertical_button = windowWidth < 600 ? windowWidth * 0.03 : 10;
    const marginTop_button = windowWidth < 600 ? windowWidth * 0.12 : 50;
    const padding_button = windowWidth < 600 ? windowWidth * 0 : 5;

    // responsividade do texto
    const fontSize_text = windowWidth < 600 ? windowWidth * 0.06 : 20;

    // Colocar condição nas telas TelaOpcoesDificuldade e TelaModoAleatorio que só irá ir para a proxima página caso o usuário tenha selecionado algum deck e exibir feedback ao usuario

    // arrumar o input do login e cadastro

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    width: width ?? width_button,
                    height: height ?? height_button,
                    borderRadius: borderRadius ?? borderRadius_button,
                    marginVertical: marginVertical ?? marginVertical_button,
                    marginTop: marginTop ?? marginTop_button,
                    padding: padding ?? padding_button,
                }
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, {
                fontSize: fontSize_text,
            }, textStyle]}>{title}</Text>
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
    },
});

export default CustomButton;
