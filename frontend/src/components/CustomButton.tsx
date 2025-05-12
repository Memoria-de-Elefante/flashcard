import React from 'react';
import { TouchableOpacity, Text, Dimensions, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';

type Props = {
    title?: string;
    textStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
};

const { width } = Dimensions.get('window');

const CustomButton = ({ title, onPress, style, textStyle}: Props) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F5F5F5",
        padding: 5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 0.005,
        width: width * 0.20,
        height: width * 0.05,
        marginTop: 10,
    },
    text: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default CustomButton;
