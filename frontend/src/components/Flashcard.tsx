import React, { useRef, useState } from "react";
import { View, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, Keyboard, StyleProp, ViewStyle, TouchableOpacity, Image } from "react-native";
import CustomButton from "./CustomButton";
import Card from "./Card";

type Props = {
    frontText: string;
    backText: string;
    width: number;
    height: number;
    borderRadius: number;
    flashcardType?: "edicao" | "aleatorio" | "desafio" | "dificuldade"; 
    showFlipButton?: boolean;
    cardType?: "edicao";
    editable?: boolean;
    onChangeFrontText?: (text: string) => void
    onChangeBackText?: (text: string) => void
    onChangeDificuldade?: (dificuldade: string) => void
    onChangeAcerto?: (acerto: boolean) => void
    onPress?: () => void;
    onDelete?: () => void
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
    onDelete,
    cardType,    
    editable,
    style,
    onChangeFrontText,
    onChangeBackText,
    onChangeDificuldade,
    onChangeAcerto
}: Props) {
    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const { width: windowWidth } = useWindowDimensions();

    
    const marginBottom_buttonRowAleatorio = windowWidth < 600 ? windowWidth * -0.1 : -60;
    const marginTop_buttonRowAleatorio = windowWidth < 600 ? windowWidth * -0.04 : -25;
    const marginLeft_buttonRowAleatorio = windowWidth < 600 ? 0 : 0;
    const marginRight_buttonRowAleatorio = windowWidth < 600 ? 40 : 0;

    
    const marginBottom_buttonRow = windowWidth < 600 ? windowWidth * -0.1 : -60;
    const marginTop_buttonRow = windowWidth < 600 ? windowWidth * -0.04 : -25;
    const marginLeft_buttonRow = windowWidth < 600 ? 0 : 0;
    const marginRight_buttonRow = windowWidth < 600 ? 70 : 0;

    const [dificuldade, setDificuldade] = useState("médio")
    const [acerto, setAcerto] = useState(false)

    const renderButtons = () => {
        if (!flashcardType) return null;

        const commonStyle = {
            marginTop: flashcardType === "aleatorio" ? marginTop_buttonRowAleatorio : marginTop_buttonRow,
            marginBottom: flashcardType === "aleatorio" ? marginBottom_buttonRowAleatorio : marginBottom_buttonRow,
            marginLeft: flashcardType === "aleatorio" ? marginLeft_buttonRowAleatorio : marginLeft_buttonRow,
            marginRight: flashcardType === "aleatorio" ? marginRight_buttonRowAleatorio : marginRight_buttonRow,
        };

        switch (flashcardType) {
            case "edicao":
                return (
                    <View style={styles.buttonRowAleatorio}>
                        <CustomButton title="Fácil" onPress={() => handleSetDificuldade("fácil")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Médio" onPress={() => handleSetDificuldade("médio")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Difícil" onPress={() => handleSetDificuldade("difícil")} width={80} height={45} borderRadius={10} />
                    </View>
                );
            case "aleatorio":
                if (isFlipped) return (
                    <View style={[styles.buttonRowAleatorio, commonStyle]}>
                        <CustomButton title="Fácil" onPress={() => handleSetDificuldade("fácil")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Médio" onPress={() => handleSetDificuldade("médio")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Difícil" onPress={() => handleSetDificuldade("difícil")} width={80} height={45} borderRadius={10} />
                    </View>
                );
            case "dificuldade":
            case "desafio":
                if (isFlipped) return (
                    <View style={[styles.buttonRow, commonStyle]}>
                        <CustomButton title="Acertei" onPress={() => handleSetAcerto(true)} width={90} height={45} borderRadius={10} />
                        <CustomButton title="Errei" onPress={() => handleSetAcerto(false)} width={90} height={45} borderRadius={10} />
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

    const handleSetDificuldade = (dificuldade: string) => {
        setDificuldade(dificuldade)
        onChangeDificuldade?.(dificuldade)
    }

    const handleSetAcerto = (acerto: boolean) => {
        setAcerto(acerto)
        onChangeAcerto?.(acerto)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, style]}>
                <Card
                    ref={cardRef}
                    frontText={frontText}
                    backText={backText}
                    onChangeFrontText={onChangeFrontText}
                    onChangeBackText={onChangeBackText}
                    width={width}
                    height={height}
                    borderRadius={borderRadius}
                    onPress={onPress}
                    onDelete={onDelete}
                    cardType={cardType}
                    editable={editable}
                />

                
                {renderButtons()}

                
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
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 15,
    },
    buttonRowAleatorio: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: -15,
        marginTop: 5,
        marginLeft: -15,
        marginRight: 15,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    flipButtonWrapper: {
        marginTop: 20,
    },
    iconRow: {
        position: 'absolute',
        top: 30,
        right: 10,
        flexDirection: 'row',
        gap: 10,
        zIndex: 2,
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginBottom: 0,
    },
});
