import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Text, useWindowDimensions, View } from "react-native";
import Flashcard from "../components/Flashcard";
import CustomButton from "../components/CustomButton";

export default function edicao() {

    const { width, height } = Dimensions.get('window');

    const stripeWidth = width * 2.4;
    const stripeHeight = 150;
    const leftOffset = -width * 0.7;

    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        cardRef.current?.flipCard();
        setIsFlipped(prev => !prev);
    };
    // responsividae para listras
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                position: "absolute",
                width: stripeWidth,
                height: stripeHeight,
                transform: [{ rotate: "45deg" }],
                left: leftOffset,
                top: 0,
                backgroundColor: "#faa526",
            }} />
            <View style={{
                position: "absolute",
                width: stripeWidth,
                height: stripeHeight,
                transform: [{ rotate: "45deg" }],
                left: leftOffset,
                top: stripeHeight * 1.2,
                backgroundColor: "#ea2e57",
            }} />
            <View style={{
                position: "absolute",
                width: stripeWidth,
                height: stripeHeight,
                transform: [{ rotate: "45deg" }],
                left: leftOffset,
                top: stripeHeight * 2.4,
                backgroundColor: "#37b1bf",
            }} />
            <Flashcard
                frontText="Pergunta de Edição"
                backText="Resposta de Edição"
                width={300}
                height={400}
                borderRadius={10}
                editable={true}
                flashcardType="edicao"
                showFlipButton={true}
            />
            <CustomButton
                title="Salvar"
                onPress={() => alert("Salvando o card")}
                width={200}
                height={60}
                borderRadius={12}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    arrowText: {
        fontSize: 24,
        color: 'white',
    },
    arrowLeft: {
        position: 'absolute',
        left: '30%',
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
    },
    arrowRight: {
        position: 'absolute',
        right: '30%',
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
    },
});
