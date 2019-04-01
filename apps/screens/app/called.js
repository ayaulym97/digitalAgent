import React, { Component } from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
//import firebase from "react-native-firebase";
import { Theme } from "../../configs/theme";
import { StylePanel } from "../../configs/styles";
import { Footer, Button } from "../../components";
import { scale } from "../../configs";
import stringsoflanguages from "../../locale";
export default class Called extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: null
  });
  handlePress = () => {
    this.props.navigation.navigate("SelectVedom");
  };
  render() {
    //firebase.analytics().setCurrentScreen("CALLED PAGE");
    return (
      <View style={styles.container}>
        <Image
          resizeMode={"contain"}
          style={styles.image}
          source={require("../../assets/thanksIcon.png")}
        />
        <View style={styles.txtView}>
          <Text style={styles.title}>{stringsoflanguages.called.header}</Text>
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
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Theme.colors.bcground
  },
  footerStyle: {
    height: 45,
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%"
  },
  txtView: {
    flex: 2,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    width: "90%",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 220,
    height: 193,
    marginTop: Platform.OS === "ios" ? 85 : 40
  },
  title: {
    fontSize:
      Platform.OS === "ios" ? Theme.fonts.sizes.h3 : Theme.fonts.sizes.h5,
    color: Theme.colors.yellow,
    textAlign: "center",
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  }
});
