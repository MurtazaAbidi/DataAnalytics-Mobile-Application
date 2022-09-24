import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = props => {
  const {text, onPress, type = 'PRIMARY', bgColor, fgColor} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: {bgColor}} : {},
      ]}>
      <Text
        style={[
          styles.input,
          styles[`text_${type}`],
          fgColor ? {color: {fgColor}} : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {
    // backgroundColor: '#0000',
    // color:'grey'
  },

  text_PRIMARY: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    fontWeight: 'bold',
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
    // textDecorationLine: 'underline',
  },
});
export default CustomButton;
