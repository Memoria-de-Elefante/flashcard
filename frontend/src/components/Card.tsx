import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Animated, TouchableWithoutFeedback, TouchableOpacity, Image } from "react-native";

type Props = {
    frontText: string;
    backText: string;
    width: number;
    height: number;
    paddingTop?: number;
    borderRadius: number;
};

export type CardRef = {
    flipCard: () => void;
}

const Card = forwardRef(function Card(
    props: Props,
    ref: React.ForwardedRef<{ flipCard: () => void }>
) {
    const { width: cardWidth, height: cardHeight, borderRadius, paddingTop: cardPaddingTop } = props;

    const [front, setFront] = useState(props.frontText);
    const [back, setBack] = useState(props.backText);
    const [editingFront, setEditingFront] = useState(false);
    const [editingBack, setEditingBack] = useState(false);

    const [flipped, setFlipped] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;

    const flipCard = () => {
        Animated.timing(rotation, {
            toValue: flipped ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setFlipped(!flipped);
    };

    useImperativeHandle(ref, () => ({
        flipCard,
    }));

    const interpolatedRotation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const frontOpacity = rotation.interpolate({
        inputRange: [0, 0.5],
        outputRange: [1, 0],
    });

    const backRotation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    const renderVerticalText = (text: string) => {
        return text.split("").map((char, index) => (
            <Text key={index} style={styles.verticalChar}>
                {char}
            </Text>
        ));
    };

    return (
        <View style={[styles.card, { width: cardWidth, height: cardHeight, borderRadius, paddingTop: cardPaddingTop }]}>
            {/* Front do card */}
            <Animated.View
                pointerEvents={flipped ? 'none' : 'auto'}
                style={[styles.cardFace, { opacity: frontOpacity, transform: [{ rotateY: interpolatedRotation }] }]}
            >
                <Text style={styles.sideLabel}>FRONT</Text>
                <View style={styles.iconRow}>
                    <TouchableOpacity onPress={() => alert('Adiciona imagem')} style={{ marginLeft: 10 }}>
                        <Image source={require('../../assets/images/camera.png')} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Exclui deck')} style={{ marginLeft: 10 }}>
                        <Image source={require('../../assets/images/Deletar.png')} style={styles.image} />
                    </TouchableOpacity>                
                </View>
                <TouchableWithoutFeedback onPress={() => setEditingFront(true)}>
                    {editingFront ? (
                        <ScrollView style={styles.inputContainer} contentContainerStyle={styles.scrollContent}>
                            <TextInput
                                value={front}
                                onChangeText={setFront}
                                onBlur={() => setEditingFront(false)}
                                style={styles.input}
                                autoFocus
                                multiline
                                textAlignVertical="top"
                            />
                        </ScrollView>
                    ) : (
                        <View>
                            <Text style={styles.text}>{front}</Text>
                        </View>
                    )}
                </TouchableWithoutFeedback>
            </Animated.View>

            {/* Back do card */}
            <Animated.View
                pointerEvents={flipped ? 'auto' : 'none'}
                style={[styles.cardFace, { opacity: 1, transform: [{ rotateY: backRotation }] }]}
            >
                <Text style={styles.sideLabel}>BACK</Text>
                <View style={styles.iconRow}>
                    <TouchableOpacity onPress={() => alert('Adiciona imagem')} style={{ marginLeft: 10 }}>
                        <Image source={require('../../assets/images/camera.png')} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Exclui deck')} style={{ marginLeft: 10 }}>
                        <Image source={require('../../assets/images/Deletar.png')} style={styles.image} />
                    </TouchableOpacity>                
                </View>
                <TouchableWithoutFeedback onPress={() => setEditingBack(true)}>
                    {editingBack ? (
                        <ScrollView style={styles.inputContainer} contentContainerStyle={styles.scrollContent}>
                            <TextInput
                                value={back}
                                onChangeText={setBack}
                                onBlur={() => setEditingBack(false)}
                                style={styles.input}
                                autoFocus
                                multiline
                                textAlignVertical="top"
                            />
                        </ScrollView>
                    ) : (
                        <View>
                            <Text style={styles.text}>{back}</Text>
                        </View>
                    )}
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    cardFace: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 10,
    },
    text: {
        color: "#000000",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: '#FFFFFF',
        padding: 6,
        borderRadius: 5,
        minWidth: 100,
        textAlignVertical: 'top',
    },
    sideLabel: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: '#888888',
        fontSize: 18,
        fontWeight: 'bold',
        zIndex: 1,
    },
    verticalChar: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        lineHeight: 24,
    },
    inputContainer: {
        maxHeight: 200,
        width: '100%',
    },
    scrollContent: {
        paddingBottom: 10,
    },
    iconRow: {
        position: 'absolute',
        top: 10,
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

export default Card;
