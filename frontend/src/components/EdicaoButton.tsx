import { TouchableOpacity, Image, SafeAreaView, Text, StyleSheet, useWindowDimensions } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  onDelete: () => void;
};

const EdicaoButton = ({ title, onPress, onDelete }: Props) => {

  const { width: windowWidth } = useWindowDimensions();

  
  const padding_button = windowWidth < 600 ? windowWidth * 0.05 : 40;
  const borderRadius_button = windowWidth < 600 ? windowWidth * 0.02 : 5;
  const marginVertical_button = windowWidth < 600 ? windowWidth * 0.03 : 30;
  const width_button = windowWidth < 600 ? windowWidth * 0.77 : 550;
  const height_button = windowWidth < 600 ? windowWidth * 0.18 : 70;

 
  const fontSize_text = windowWidth < 600 ? windowWidth * 0.06 : 30;

 
  const width_imagem = windowWidth < 600 ? windowWidth * 0.1 : 40;
  const height_imagem = windowWidth < 600 ? windowWidth * 0.1 : 40;
  const marginBottom_imagem = windowWidth < 600 ? windowWidth * 0 : 0;

  return (
    <TouchableOpacity
      style={[
        styles.button, {
          padding: padding_button,
          borderRadius: borderRadius_button,
          marginVertical: marginVertical_button,
          width: width_button,
          height: height_button,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <SafeAreaView style={styles.innerContent}>
        <Text
          style={[
            styles.text, {
              fontSize: fontSize_text,
            }
          ]}>{title}</Text>
        <SafeAreaView style={styles.iconGroup}>
          <TouchableOpacity onPress={onDelete}>
            <Image
              source={require('../../assets/images/IconDeletar.png')}
              style={[
                styles.image, {
                  width: width_imagem,
                  height: height_imagem,
                  marginBottom: marginBottom_imagem,
                }
              ]} />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F5F5F5',
  },
  innerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    height: '100%', 
  },

  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
  },
  image: {
    resizeMode: 'contain',
  },
});

export default EdicaoButton;
