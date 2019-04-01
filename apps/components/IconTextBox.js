import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { Theme } from "../configs/theme";
const IconTextBox = ({
  boxStyle,
  imgStyle,
  img,
  titleStyle,
  onPress,
  title
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity style={boxStyle} onPress={onPress}>
        <Image resizeMode={"contain"} style={imgStyle} source={img} />
      </TouchableOpacity>
      <Text style={titleStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32
  },
});
export default IconTextBox;
