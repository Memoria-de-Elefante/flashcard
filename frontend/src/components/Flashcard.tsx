import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    useWindowDimensions,
    TouchableWithoutFeedback,
    Keyboard,
    StyleProp,
    ViewStyle,
} from "react-native";
import CustomButton from "./CustomButton";
import Card from "./Card";

type Props = {
    frontText: string;
    backText: string;
    width: number;
    height: number;
    borderRadius: number;
    flashcardType?: "aleatorio" | "desafio" | "dificuldade";
    showFlipButton?: boolean;
    editable?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export default function Flashcard({
    frontText,
    backText,
    width,
    height,
    borderRadius,
    flashcardType,
    showFlipButton,
    onPress,
    editable,
    style,
}: Props) {
    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const { width: windowWidth } = useWindowDimensions();

    // responsividade para o buttonRowAleatorio 
    const marginBottom_buttonRowAleatorio = windowWidth < 600 ? windowWidth * -0.1 : -60;
    const marginTop_buttonRowAleatorio = windowWidth < 600 ? windowWidth * -0.04 : -25;
    const marginLeft_buttonRowAleatorio = windowWidth < 600 ? 0 : 0;
    const marginRight_buttonRowAleatorio = windowWidth < 600 ? 40 : 0;

    // responsividade para o buttonRow
    const marginBottom_buttonRow = windowWidth < 600 ? windowWidth * -0.1 : -60;
    const marginTop_buttonRow = windowWidth < 600 ? windowWidth * -0.04 : -25;
    const marginLeft_buttonRow = windowWidth < 600 ? 0 : 0;
    const marginRight_buttonRow = windowWidth < 600 ? 70 : 0;

    const renderButtons = () => {
        if (!isFlipped || !flashcardType) return null;

        const commonStyle = {
            marginTop: flashcardType === "aleatorio" ? marginTop_buttonRowAleatorio : marginTop_buttonRow,
            marginBottom: flashcardType === "aleatorio" ? marginBottom_buttonRowAleatorio : marginBottom_buttonRow,
            marginLeft: flashcardType === "aleatorio" ? marginLeft_buttonRowAleatorio : marginLeft_buttonRow,
            marginRight: flashcardType === "aleatorio" ? marginRight_buttonRowAleatorio : marginRight_buttonRow,
        };

        switch (flashcardType) {
            case "aleatorio":
                return (
                    <View style={[styles.buttonRow, commonStyle]}>
                        <CustomButton title="Fácil" onPress={() => console.log("Fácil")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Médio" onPress={() => console.log("Médio")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Difícil" onPress={() => console.log("Difícil")} width={80} height={45} borderRadius={10} />
                    </View>
                );
            case "desafio":
            case "dificuldade":
                return (
                    <View style={[styles.buttonRow, commonStyle]}>
                        <CustomButton title="Acertei" onPress={() => console.log("Acertei")} width={90} height={45} borderRadius={10} />
                        <CustomButton title="Errei" onPress={() => console.log("Errei")} width={90} height={45} borderRadius={10} />
                    </View>
                );
            default:
                return null;
        }
    };

    const handleFlip = () => {
        cardRef.current?.flipCard();
        setIsFlipped(prev => !prev);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, style]}>
                <Card
                    ref={cardRef}
                    frontText={frontText}
                    backText={backText}
                    width={width}
                    height={height}
                    borderRadius={borderRadius}
                    onPress={onPress}
                    editable={editable}
                />

                {/* Botões de feedback */}
                {renderButtons()}

                {/* Botão Flip sempre por último */}
                {showFlipButton && (
                    <View style={styles.flipButtonWrapper}>
                        <CustomButton
                            title="Flip"
                            onPress={handleFlip}
                            width={250}
                            height={50}
                            borderRadius={25}
                        />
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 15,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    flipButtonWrapper: {
        marginTop: 20,
    },
});
