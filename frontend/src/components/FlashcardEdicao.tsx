import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import CustomButton from "./CustomButton";
import Card, { CardRef } from "./Card";

const { width } = Dimensions.get('window');

type Props = {
    frontText: string;
    backText: string;
    width: number;
    height: number;
    borderRadius: number;
    flashcardType: "edicao" | "aleatorio" | "desafio" | "dificuldade";
};

const Flashcard = forwardRef<CardRef, Props>(({
    frontText,
    backText,
    width,
    height,
    borderRadius,
    flashcardType
}, ref) => {
    const cardRef = useRef<CardRef>(null);

    // Permitir que pai (edicao.tsx) acesse flipCard
    useImperativeHandle(ref, () => ({
        flipCard: () => {
            cardRef.current?.flipCard();
        },
    }));

    const renderButtons = () => {
        const handleFlip = () => cardRef.current?.flipCard();

        switch (flashcardType) {
            case "edicao":
            case "aleatorio":
                return (
                    <View style={styles.buttonRowAleatorio}>
                        <CustomButton title="Fácil" onPress={handleFlip} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Médio" onPress={handleFlip} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Difícil" onPress={handleFlip} width={80} height={45} borderRadius={10} />
                    </View>
                );
            case "desafio":
            case "dificuldade":
                return (
                    <View style={styles.buttonRow}>
                        <CustomButton title="Acertei" onPress={handleFlip} width={90} height={45} borderRadius={10} />
                        <CustomButton title="Errei" onPress={handleFlip} width={90} height={45} borderRadius={10} />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Card
                    ref={cardRef}
                    frontText={frontText}
                    backText={backText}
                    width={width}
                    height={height}
                    borderRadius={borderRadius}
                    paddingTop={30}
                />
                {renderButtons()}
            </View>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: "#000000",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '30%',
    },
    buttonRowAleatorio: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        height: 0,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});

export default Flashcard;