import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import stringsoflanguages from "../locale";
const YesOrNo = ({
  header,
  headerStyle,
  yesStyle,
  yesTitleStyle,
  noTitleStyle,
  onPressYes,
  onPressNo,
  noStyle
}) => {
  return (
    <React.Fragment>
      <Text style={headerStyle}>{header}</Text>
      <View style={styles.answerContainer}>
        <TouchableOpacity style={yesStyle} onPress={onPressYes}>
          <Text style={yesTitleStyle}>{stringsoflanguages.yes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={noStyle} onPress={onPressNo}>
          <Text style={noTitleStyle}>{stringsoflanguages.no}</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};
export default YesOrNo;

const styles = StyleSheet.create({
  answerContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10
  }
});
