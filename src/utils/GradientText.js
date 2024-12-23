import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText = ({ text, fontSize, fontWeight }) => {
  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
     
          <Text style={[styles.text, { fontSize: fontSize, fontWeight: fontWeight }]}>
            {text}
          </Text>
     
      }
    >
      <LinearGradient
        colors={['#FF4D9A', '#5C0B9E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
   
  },
});

export default GradientText;
