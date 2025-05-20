import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


const Carregamento = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/TESTE.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default Carregamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '120%',
  },
});
