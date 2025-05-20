// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';

// // Prevent native splash screen from autohiding before App component declaration
// SplashScreen.preventAutoHideAsync()
//   .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
//   .catch(console.warn); // it's good to explicitly catch and inspect any error

// export default class App extends React.Component {
//   componentDidMount() {
//     // Hides native splash screen after 2s
//     setTimeout(async () => {
//       await SplashScreen.hideAsync();
//     }, 2000);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>SplashScreen Demo! 👋</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#aabbcc',
//   },
//   text: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });