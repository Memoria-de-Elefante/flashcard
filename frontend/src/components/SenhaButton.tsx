import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View, TextInput, Image } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
};

const { width } = Dimensions.get('window');

const SenhaButton = ({ title, onPress }: Props) => {
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Digite sua senha aqui"
                // value={senha}
                // onChangeText={setSenha}
                secureTextEntry={!senhaVisivel}
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
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.5,
        height: width *0.027,
    },
    input: {
        backgroundColor: '#eee',
        height: width *0.02,
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});


export default SenhaButton;
