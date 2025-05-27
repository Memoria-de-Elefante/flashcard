import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, StyleProp, ViewStyle, TouchableOpacity, Image } from "react-native";
import CustomButton from "./CustomButton";
import Card from "./Card";

const { width } = Dimensions.get('window');


type Props = {
    frontText: string;
    backText: string;
    width: number;
    height: number;
    borderRadius: number;
    flashcardType?: "edicao" | "aleatorio" | "desafio" | "dificuldade"; // Agora é opcional
    showFlipButton?: boolean;
    editable?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export default function Flashcard({ frontText, backText, width, height, borderRadius, flashcardType, showFlipButton, onPress, editable, style }: Props) {
    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false); // Estado para controlar se o cartão foi virado

    const renderButtons = () => {
        if (!flashcardType) return null;

        switch (flashcardType) {
            case "edicao":
                return(
                    <><View style={styles.iconRow}>
                        <TouchableOpacity onPress={() => alert('Adiciona imagem')} style={{ marginLeft: 10 }}>
                            <Image source={require('../../assets/images/camera.png')} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert('Exclui deck')} style={{ marginLeft: 10 }}>
                            <Image source={require('../../assets/images/IconDeletar.png')} style={styles.image} />
                        </TouchableOpacity>
                    </View><View style={styles.buttonRowAleatorio}>
                            <CustomButton title="Fácil" onPress={() => console.log("Fácil")} width={80} height={45} borderRadius={10} />
                            <CustomButton title="Médio" onPress={() => console.log("Médio")} width={80} height={45} borderRadius={10} />
                            <CustomButton title="Difícil" onPress={() => console.log("Difícil")} width={80} height={45} borderRadius={10} />
                        </View></>
                );
            case "aleatorio":
                if(isFlipped) return (
                    <View style={styles.buttonRowAleatorio}>
                        <CustomButton title="Fácil" onPress={() => console.log("Fácil")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Médio" onPress={() => console.log("Médio")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Difícil" onPress={() => console.log("Difícil")} width={80} height={45} borderRadius={10} />
                    </View>
                );
            case "dificuldade":
            case "desafio":
                if(isFlipped) return (
                    <View style={styles.buttonRow}>
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
                {/* Renderiza os botões de acordo com o tipo de flashcard, apenas se o cartão estiver virado */}
                {renderButtons()}
                {showFlipButton && (
                    <CustomButton
                        title="Flip"
                        onPress={handleFlip}
                        width={250}
                        height={50}
                        borderRadius={25}
                        marginVertical={52}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: -15,
        marginTop: 5,
        marginLeft: -60,
        marginRight: 15,
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
