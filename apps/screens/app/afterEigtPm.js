import React, { Component } from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
//import firebase from "react-native-firebase";
import { Theme } from "../../configs/theme";
import { StylePanel } from "../../configs/styles";
import { Footer, Button } from "../../components";
import stringsoflanguages from "../../locale";
export default class AfterEightPm extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: null
  });
  handlePress = () => {
    this.props.navigation.navigate("SelectVedom");
  };
  render() {
    // firebase.analytics().setCurrentScreen("After 8 Pm");
    return (
      <View style={styles.container}>
        <Image
          resizeMode={"contain"}
          style={styles.image}
          source={require("../../assets/workhour.png")}
        />
        <View style={styles.txtView}>
          <Text style={styles.title}>
            {stringsoflanguages.after_eight_pm.header}
          </Text>
        </View>

        <Button
          text={stringsoflanguages.back}
          sendBtn={StylePanel.sendBtn}
          textStyle={StylePanel.sendBtnTxt}
          onPress={() => this.handlePress()}
        />
        <Footer footerStyle={styles.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  footerStyle: {
    height: 45,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.bcground,
    paddingTop: Platform.OS==="ios" ? 65 : 56
  },
  txtView: {
    flex: 1,
    marginHorizontal: "5%"
  },
  image: {
    width: 220,
    height: 193
  },
  title: {
    fontSize: Theme.fonts.sizes.p6,
    color: Theme.colors.yellow,
    textAlign: "center",
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100",
    marginTop: 15
  }
});
