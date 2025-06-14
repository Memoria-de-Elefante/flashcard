import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Animated, TouchableWithoutFeedback, useWindowDimensions, Image, TouchableOpacity} from "react-native";
import Flashcard from "./Flashcard";

type Props = {
    frontText: string;
    backText: string;
    onChangeFrontText?: (text: string) => void;
    onChangeBackText?: (text: string) => void;
    width: number;
    height: number;
    borderRadius: number;
    paddingTop?: number;
    cardType?: "edicao";
    editable?: boolean;
    onPress?: () => void;
    onDelete?: () => void;
    onPickImage?: () => void,
    imageURI: string;
	backImage: string;
	flipped: boolean;
};

export type CardRef = {
    flipCard: () => void;
}

const Card = forwardRef(function Card(
    props: Props,
    ref: React.ForwardedRef<{ flipCard: () => void }>
) {
    const { frontText, backText, width: cardWidth, height: cardHeight, borderRadius, paddingTop: cardPaddingTop, cardType, editable, onPress, onPickImage, onDelete, imageURI, backImage } = props;

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

    const renderEdicao = () => {
        if (!cardType) return null;
        switch (cardType) {
            case "edicao":
                return (
                    <View style={styles.iconRow}>
                        <TouchableOpacity onPress={onPickImage} style={{ marginLeft: 10 }}>
                            <Image source={require('../../assets/images/camera.png')} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete} style={{ marginLeft: 10 }}>
                            <Image source={require('../../assets/images/IconDeletar.png')} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;

        }
    }

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

    const { width: windowWidth } = useWindowDimensions();

    
    const borderRadius_cardFace = windowWidth < 600 ? windowWidth * 0.02 : 5;
    const padding_cardFace = windowWidth < 600 ? windowWidth * 0 : 0;

    
    const padding_clickableArea = windowWidth < 600 ? windowWidth * 0.028 : 30; 

    
    const fontSize_text = windowWidth < 600 ? windowWidth * 0.05 : 20;

    
    const fontSize_input = windowWidth < 600 ? windowWidth * 0.05 : 25;
    const padding_input = windowWidth < 600 ? windowWidth * 0.028 : 30; 
    const borderRadius_input = windowWidth < 600 ? windowWidth * 0.02 : 5;
    const minWidth_input = windowWidth < 600 ? windowWidth * 0.28 : 30;

    
    const paddingBottom_scrollContent = windowWidth < 600 ? windowWidth * 0.28 : 30;

     
    const maxHeight_inputContainer = windowWidth < 600 ? windowWidth * 0.6 : 30;

    
    const top_sideLabel = windowWidth < 600 ? windowWidth * 0.028 : 0;
    const left_sideLabel = windowWidth < 600 ? windowWidth * 0.028 : 5;
    const fontSize_sideLabel = windowWidth < 600 ? windowWidth * 0.045 : 20;

    useEffect(() => {
        setFront(frontText);
    }, [frontText]);

    useEffect(() => {
        setBack(backText);
    }, [backText]);
    
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (!editable && !cardType && onPress) onPress();
            }}
        >
            <View style={[styles.card, { width: cardWidth, height: cardHeight, borderRadius, paddingTop: cardPaddingTop }]}>
                
                <Animated.View
                    pointerEvents={flipped ? 'none' : 'auto'}
                    style={[styles.cardFace,
                    {
                        opacity: frontOpacity,
                        transform: [{ rotateY: interpolatedRotation }],
                        borderRadius: borderRadius_cardFace,
                        padding: padding_cardFace,
                    }
                    ]}
                >
                    <TouchableWithoutFeedback onPress={() => editable && cardType && cardType ? setEditingFront(true) : props.onPress?.()}>
                        <View style={styles.clickableArea}>
                            <Text style={[styles.sideLabel, {
                                top: top_sideLabel,
                                left: left_sideLabel,
                                fontSize: fontSize_sideLabel,
                            }
                            ]}>FRONT</Text>
                            {renderEdicao()}
                            {editingFront ? (
                                <ScrollView
                                    style={[
                                        styles.inputContainer,
                                        {
                                            maxHeight: maxHeight_inputContainer,
                                        }
                                    ]}
                                    contentContainerStyle={{
                                        paddingBottom: paddingBottom_scrollContent,
                                    }
                                    }>
                                    <TextInput
                                        value={front}
                                        onChangeText={(text) => {
                                            setFront(text)
                                            props.onChangeFrontText?.(text)
                                        }}
                                        onBlur={() => setEditingFront(false)}
                                        style={[styles.input, {
                                            fontSize: fontSize_input,
                                            padding: padding_input,
                                            borderRadius: borderRadius_input,
                                            minWidth: minWidth_input,
                                        }
                                        ]}
                                        autoFocus
                                        multiline
                                        textAlignVertical="top"
                                    />
                                </ScrollView>
                            ) : (
                                <View style={styles.textWrapper}>
                                    <Text style={[styles.text,
                                    {
                                        fontSize: fontSize_text,
                                    }
                                    ]}>{front}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <Image source={{ uri: imageURI }} style={styles.imageCard} />
                </Animated.View>

                {/* Back do card */}
                <Animated.View
                    pointerEvents={flipped ? 'auto' : 'none'}
                    style={[styles.cardFace,
                    {
                        opacity: 1,
                        transform: [{ rotateY: backRotation }],
                        borderRadius: borderRadius_cardFace,
                        padding: padding_cardFace,
                    }
                    ]}
                >
                    <TouchableWithoutFeedback onPress={() => editable && cardType ? setEditingBack(true) : props.onPress?.()}>
                        <View style={[styles.clickableArea,
                        {
                            padding: padding_clickableArea,
                        }
                        ]}>
                            <Text style={[styles.sideLabel, {
                                top: top_sideLabel,
                                left: left_sideLabel,
                                fontSize: fontSize_sideLabel,
                            }
                            ]}>BACK</Text>
                            {renderEdicao()}
                            {editingBack ? (
                                <ScrollView
                                    style={[
                                        styles.inputContainer,
                                        {
                                            maxHeight: maxHeight_inputContainer,
                                        }
                                    ]}
                                    contentContainerStyle={{
                                        paddingBottom: paddingBottom_scrollContent,
                                    }
                                    }>
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
                                    <Text style={[styles.text,
                                    {
                                        fontSize: fontSize_text,
                                    }
                                    ]}>{back}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <Image source={{ uri: backImage }} style={styles.imageCard} />
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
    },
    text: {
        color: "#000000",
        fontWeight: 'bold',
        textAlign: 'left',
    },
    input: {
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'top',
    },
    sideLabel: {
        position: 'absolute',
        color: '#888888',
        fontWeight: 'bold',
        zIndex: 1,
    },
    inputContainer: {
        width: '100%',
    },
    clickableArea: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconRow: {
        position: 'absolute',
        top: 30,
        right: 10,
        flexDirection: 'row',
        gap: 10,
        zIndex: 2,
    },
    imageCard: {
        marginBottom: 5,
        width: 100,
        height: 100,
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginBottom: 0,
    }
});

export default Card;
