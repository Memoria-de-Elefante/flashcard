import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, StyleProp, ViewStyle } from "react-native";
import CustomButton from "./CustomButton";
import Card from "./Card";

// Pegando a largura da tela
const { width } = Dimensions.get('window');

// const router = useRouter();

type Props = {
    frontText: string;
    backText: string;
    width: number;
    height: number;
    borderRadius: number;
    flashcardType?: "aleatorio" | "desafio" | "dificuldade"; // Agora é opcional
    showFlipButton?: boolean;
    editable? : boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export default function Flashcard({ frontText, backText, width, height, borderRadius, flashcardType, showFlipButton, onPress, editable, style }: Props) {
    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false); // Estado para controlar se o cartão foi virado

    const renderButtons = () => {
        if (!isFlipped || !flashcardType) return null;

        switch (flashcardType) {
            case "aleatorio":
                return (
                    <View style={styles.buttonRowAleatorio}>
                        <CustomButton title="Fácil" onPress={() => console.log("Fácil")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Médio" onPress={() => console.log("Médio")} width={80} height={45} borderRadius={10} />
                        <CustomButton title="Difícil" onPress={() => console.log("Difícil")} width={80} height={45} borderRadius={10} />
                    </View>
                );
            case "desafio":
            case "dificuldade":
                return (
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
        setIsFlipped(prev => !prev); // Inverte o estado de flip
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
});
