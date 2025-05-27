import { TouchableOpacity, Image, SafeAreaView, Text, StyleSheet, View} from 'react-native';
import { Dimensions } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
    onDelete: () => void;
};

const { width } = Dimensions.get('window');

const EdicaoButton = ({ title, onPress, onDelete}: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <SafeAreaView style={styles.innerContent}>
                <Text style={styles.text}>{title}</Text>
                <SafeAreaView style={styles.iconGroup}>
                    <TouchableOpacity onPress={onDelete} style={{ marginLeft: 10 }}>
                        <Image source={require('../../assets/images/IconDeletar.png')} style={styles.image}/>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        width: width * 0.7,
        height: width * 0.15,
      },
      innerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
      },
      image: {
        width: width * 0.085,
        height: width * 0.1,
        resizeMode: 'contain',
        marginBottom: 0, 
      },
});

export default EdicaoButton;
