import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions, View, TextInput, Image } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    value: string;
    onChangeText: (text: string) => void;
};

const SenhaButton = ({ title, onPress, value, onChangeText }: Props) => {
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const { width: windowWidth } = useWindowDimensions();

    
    const borderRadius_passwordContainer = windowWidth < 600 ? windowWidth * 10 : 30;
    const padding_passwordContainer = windowWidth < 600 ? windowWidth * 0.01 : 25;
    const marginBottom_passwordContainer = windowWidth < 600 ? windowWidth * 0.04 : 10;
    const width_passwordContainer = windowWidth < 600 ? windowWidth * 0.7 : 500;
    const height_passwordContainer = windowWidth < 600 ? windowWidth * 0.1 : 30;
    const marginTop_passwordContainer = windowWidth < 600 ? windowWidth * 0.04 : 10;

    
    const height_input = windowWidth < 600 ? windowWidth * 0.09 : 48;
    const paddingHorizontal_input = windowWidth < 600 ? windowWidth * 0.025 : 0; 
    const fontSize_input = windowWidth < 600 ? windowWidth * 0.05 : 25;
    const marginTop_input = windowWidth < 600 ? windowWidth * 0 : 0;
    const borderRadius_input = windowWidth < 600 ? windowWidth * 10 : 30;

    
    const width_imagemEdicao = windowWidth < 600 ? windowWidth * 0.1 : 35;
    const height_imagemEdicao = windowWidth < 600 ? windowWidth * 1 : 35;

    return (
        <View style={[
                styles.passwordContainer,
                {
                    borderRadius: borderRadius_passwordContainer,
                    padding: padding_passwordContainer,
                    marginBottom: marginBottom_passwordContainer,
                    width: width_passwordContainer,
                    height: height_passwordContainer,
                    marginTop: marginTop_passwordContainer,
                }
            ]}>
            <TextInput
                style={[
                    styles.input, 
                    { 
                        flex: 1,
                        height: height_input,   
                        paddingHorizontal: paddingHorizontal_input,
                        fontSize: fontSize_input, 
                        marginTop: marginTop_input,
                        borderRadius: borderRadius_input,
                    }
                ]}
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

                    style={[
                        styles.image, 
                        {
                            width: width_imagemEdicao,
                            height: height_imagemEdicao,
                        }
                    ]}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    passwordContainer: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#eee',
        color: '#000',
    },
    image: {
        resizeMode: 'contain',
    },
});


export default SenhaButton;
