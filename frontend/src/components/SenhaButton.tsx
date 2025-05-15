import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View, TextInput, Image } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    value: string;
    onChangeText: (text: string) => void;
};

const { width } = Dimensions.get('window');

const SenhaButton = ({ title, onPress, value, onChangeText }: Props) => {
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Digite sua senha aqui"
                placeholderTextColor="#7C7C7C"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!senhaVisivel}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <TouchableOpacity onPress={toggleSenhaVisivel}>
                <Image
                    source={
                        senhaVisivel
                            ? require('../../assets/images/OlhoAberto.png')
                            : require('../../assets/images/OlhoFechado.png')
                    }
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    passwordContainer: {
        backgroundColor: '#eee',
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.7,
        height: width * 0.13,
    },
    input: {
        backgroundColor: '#eee',
        color: '#000', // <- Certifique-se de definir a cor do texto
        height: width * 0.12,    // <- Aumente a altura para algo razoável
        paddingHorizontal: width * 0.01,
        fontSize: 16,  // <- Deixe legível
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});


export default SenhaButton;
