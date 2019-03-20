import React from "react";
import { View, TextInput,Platform, StyleSheet } from "react-native";
import { Theme } from "../configs/theme";
import { scale, scaleModerate, scaleVertical } from "../configs/index";
import Icon from "react-native-vector-icons/Ionicons";
import stringsoflanguages from "../locale";
const SearchInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Icon
        name={"ios-search"}
        size={20}
        color={Theme.colors.gray63}
        style={{
          marginHorizontal: 7
        }}
      />
      <TextInput
      
        style={styles.input}
        placeholder={stringsoflanguages.search}
        value={value}
        placeholderTextColor={Theme.colors.gray63}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "92%",
    marginTop:Platform.OS ==="ios"? scaleVertical(0):scaleVertical(15),
    height:Platform.OS ==="ios"? scaleVertical(35):scaleVertical(47),
    marginHorizontal: "4%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Theme.colors.gray63,
    borderWidth: 1
  },
  input: {
    flex: 1,
    color: "white"
  }
});
export default SearchInput;
