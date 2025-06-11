import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import {
    View, Text, TextInput, StyleSheet, ScrollView,
    Animated, TouchableWithoutFeedback
} from "react-native";

type Props = {
    frontText: string;
    backText: string;
    onChangeFrontText?: (text: string) => void;
    onChangeBackText?: (text: string) => void;
    width: number;
    height: number;
    borderRadius: number;
    paddingTop?: number;
    editable?: boolean;
    onPress?: () => void;
};

export type CardRef = {
    flipCard: () => void;
}

const Card = forwardRef(function Card(
    props: Props,
    ref: React.ForwardedRef<{ flipCard: () => void }>
) {
    const { frontText, backText, width: cardWidth, height: cardHeight, borderRadius, paddingTop: cardPaddingTop, editable, onPress } = props;

    const [front, setFront] = useState(frontText);
    const [back, setBack] = useState(backText);
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

    useEffect(() => {
    setFront(frontText);
    }, [frontText]);

    useEffect(() => {
    setBack(backText);
    }, [backText]);
    // Envolve tudo com Touchable para permitir navegação quando não for editable
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (!editable && onPress) onPress();
            }}
        >
            <View style={[styles.card, { width: cardWidth, height: cardHeight, borderRadius, paddingTop: cardPaddingTop }]}>
                {/* Front do card */}
                <Animated.View
                    pointerEvents={flipped ? 'none' : 'auto'}
                    style={[styles.cardFace, { opacity: frontOpacity, transform: [{ rotateY: interpolatedRotation }] }]}
                >
                    <TouchableWithoutFeedback onPress={() => editable ? setEditingFront(true) : props.onPress?.()}>
                        <View style={styles.clickableArea}>
                            <Text style={styles.sideLabel}>FRONT</Text>
                            {editingFront ? (
                                <ScrollView style={styles.inputContainer} contentContainerStyle={styles.scrollContent}>
                                    <TextInput
                                        value={front}
                                        onChangeText={(text) => {
                                            setFront(text)
                                            props.onChangeFrontText?.(text)
                                        }}
                                        onBlur={() => setEditingFront(false)}
                                        style={styles.input}
                                        autoFocus
                                        multiline
                                        textAlignVertical="top"
                                    />
                                </ScrollView>
                            ) : (
                                <View style={styles.textWrapper}>
                                    <Text style={styles.text}>{front}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>



                {/* Back do card */}
                <Animated.View
                    pointerEvents={flipped ? 'auto' : 'none'}
                    style={[styles.cardFace, { opacity: 1, transform: [{ rotateY: backRotation }] }]}
                >
                    <TouchableWithoutFeedback onPress={() => editable ? setEditingBack(true) : props.onPress?.()}>
                        <View style={styles.clickableArea}>
                            <Text style={styles.sideLabel}>BACK</Text>
                            {editingBack ? (
                                <ScrollView style={styles.inputContainer} contentContainerStyle={styles.scrollContent}>
                                    <TextInput
                                        value={back}
                                        onChangeText={(text) => {
                                            setBack(text)
                                            props.onChangeBackText?.(text)
                                        }}
                                        onBlur={() => setEditingBack(false)}
                                        style={styles.input}
                                        autoFocus
                                        multiline
                                        textAlignVertical="top"
                                    />
                                </ScrollView>
                            ) : (
                                <View style={styles.textWrapper}>
                                    <Text style={styles.text}>{back}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>


            </View>
        </TouchableWithoutFeedback>
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
        borderRadius: 5,
        minWidth: 100,
        minHeight: 190,
        maxHeight: 100,
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
    inputContainer: {
        maxHeight: 200,
        width: '100%',
    },
    scrollContent: {
        paddingBottom: 10,
    },
    clickableArea: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    textWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Card;
