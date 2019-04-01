import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '../configs/theme';
const Button = ({ disable, onPress, sendBtn, textStyle,text }) => {
  return (
    <TouchableOpacity disabled={disable} style={sendBtn} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  sendBtnTxt: {
    color: Theme.colors.bcground,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: 'center',
  },
});
export default Button;