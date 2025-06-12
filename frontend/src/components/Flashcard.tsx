import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, Keyboard, StyleProp, ViewStyle, TouchableOpacity, Image } from "react-native";
import CustomButton from "./CustomButton";
import Card from "./Card";

export type FlashcardHandle = {
    flipCard: () => void;
};

type Props = {
    frontText: string;
    backText: string;
    width: number;
    height: number;
    borderRadius: number;
    flashcardType?: "edicao" | "aleatorio" | "desafio" | "dificuldade";
    showFlipButton?: boolean;
    editable?: boolean;
    onChangeFrontText?: (text: string) => void;
    onChangeBackText?: (text: string) => void;
    onChangeDificuldade?: (dificuldade: string) => void;
    onChangeAcerto?: (acerto: boolean) => void;
    onPress?: () => void;
    onDelete?: () => void;
    style?: StyleProp<ViewStyle>;
};

const Flashcard = forwardRef<FlashcardHandle, Props>(({
    frontText,
    backText,
    width,
    height,
    borderRadius,
    flashcardType,
    showFlipButton,
    onPress,
    onDelete,
    editable,
    style,
    onChangeFrontText,
    onChangeBackText,
    onChangeDificuldade,
    onChangeAcerto
}, ref) => {
    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [dificuldade, setDificuldade] = useState("médio");
    const [acerto, setAcerto] = useState(false);
    const { width: windowWidth } = useWindowDimensions();

    useImperativeHandle(ref, () => ({
        flipCard: () => {
            cardRef.current?.flipCard();
            setIsFlipped(prev => !prev);
        }
    }));

    const marginBottom_buttonRowAleatorio = windowWidth < 600 ? windowWidth * -0.1 : -60;
    const marginTop_buttonRowAleatorio = windowWidth < 600 ? windowWidth * -0.04 : -25;
    const marginLeft_buttonRowAleatorio = windowWidth < 600 ? 0 : 0;
    const marginRight_buttonRowAleatorio = windowWidth < 600 ? 40 : 0;

    const marginBottom_buttonRow = windowWidth < 600 ? windowWidth * -0.1 : -60;
    const marginTop_buttonRow = windowWidth < 600 ? windowWidth * -0.04 : -25;
    const marginLeft_buttonRow = windowWidth < 600 ? 0 : 0;
    const marginRight_buttonRow = windowWidth < 600 ? 70 : 0;

    const handleFlip = () => {
        cardRef.current?.flipCard();
        setIsFlipped(prev => !prev);
    };

    const handleSetDificuldade = (dif: string) => {
        setDificuldade(dif);
        onChangeDificuldade?.(dif);
    };

    const handleSetAcerto = (value: boolean) => {
        setAcerto(value);
        onChangeAcerto?.(value);
    };

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
                    <>
                        <View style={styles.iconRow}>
                            <TouchableOpacity onPress={() => alert('Adiciona imagem')} style={{ marginLeft: 10 }}>
                                <Image source={require('../../assets/images/camera.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDelete} style={{ marginLeft: 10 }}>
                                <Image source={require('../../assets/images/IconDeletar.png')} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonRowAleatorio}>
                            <CustomButton title="Fácil" onPress={() => handleSetDificuldade("fácil")} width={80} height={45} borderRadius={10} />
                            <CustomButton title="Médio" onPress={() => handleSetDificuldade("médio")} width={80} height={45} borderRadius={10} />
                            <CustomButton title="Difícil" onPress={() => handleSetDificuldade("difícil")} width={80} height={45} borderRadius={10} />
                        </View>
                    </>
                );
            case "aleatorio":
                if (isFlipped) {
                    return (
                        <View style={[styles.buttonRowAleatorio, commonStyle]}>
                            <CustomButton title="Fácil" onPress={() => handleSetDificuldade("fácil")} width={80} height={45} borderRadius={10} />
                            <CustomButton title="Médio" onPress={() => handleSetDificuldade("médio")} width={80} height={45} borderRadius={10} />
                            <CustomButton title="Difícil" onPress={() => handleSetDificuldade("difícil")} width={80} height={45} borderRadius={10} />
                        </View>
                    );
                }
                return null;
            case "dificuldade":
            case "desafio":
                if (isFlipped) {
                    return (
                        <View style={[styles.buttonRow, commonStyle]}>
                            <CustomButton title="Acertei" onPress={() => handleSetAcerto(true)} width={90} height={45} borderRadius={10} />
                            <CustomButton title="Errei" onPress={() => handleSetAcerto(false)} width={90} height={45} borderRadius={10} />
                        </View>
                    );
                }
                return null;
            default:
                return null;
        }
    };

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
});

export default Flashcard;

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
