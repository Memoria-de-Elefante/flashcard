// components/ListrasDeFundo.tsx
import React from 'react';
import { View, useWindowDimensions } from 'react-native';

export default function ListrasDeFundo() {
  const { width: windowWidth } = useWindowDimensions();
  const stripeWidth = windowWidth * 2.2;
  const stripeHeight = 150;
  const leftOffset = -windowWidth * 0.7;

  const cores = ['#faa526', '#ea2e57', '#37b1bf'];

  return (
    <>
      {cores.map((cor, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            width: stripeWidth,
            height: stripeHeight,
            transform: [{ rotate: "45deg" }],
            left: leftOffset,
            top: stripeHeight * 1.2 * i,
            backgroundColor: cor,
            zIndex: -1, // importante para não ficar por cima dos inputs
          }}
        />
      ))}
    </>
  );
}
