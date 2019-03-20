import React, { Component } from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
//import firebase from "react-native-firebase";
import { scale } from "../../configs/index";
import { Theme } from "../../configs/theme";
import { StylePanel } from "../../configs/styles";
import { Footer, Button } from "../../components";

import stringsoflanguages from "../../locale";
export default class Uncalled extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: null
  });
  handlePress = () => {
    this.props.navigation.navigate("SelectVedom");
  };
  render() {
    // firebase.analytics().setCurrentScreen("ADGS PAGE");
    return (
      <View style={StylePanel.container}>
        <View style={styles.slide}>
          <Image
            resizeMode={"contain"}
            style={styles.image}
            source={require("../../assets/adgsIcon.png")}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 45,
            alignItems: "center"
          }}
        >
          <Text style={styles.title}>{stringsoflanguages.uncalled.header}</Text>
          <Text style={styles.subTitle}>
            {stringsoflanguages.uncalled.content}
            <Text style={{ color: "#FCB415" }}>{stringsoflanguages.uncalled.content_1
            }</Text>) !
          </Text>
          <Text style={styles.subTitle}>
          {stringsoflanguages.uncalled.content_2}
          </Text>
        </View>
        <Button
          text={stringsoflanguages.uncalled.back_to_main_page}
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

  slide: {
    flex: 1,
    paddingTop: Platform.OS==="ios"? 36:10,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: scale(90 * 2.5),
    height: scale(80 * 2.5)
  },
  text: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center"
  },
  title: {
    fontSize:  Platform.OS==="ios"? Theme.fonts.sizes.h1:Theme.fonts.sizes.h2,
    color: Theme.colors.yellow,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  subTitle: {
    // marginTop: 16,
    fontSize: scale(13),
    color: "white",
    textAlign: "center",
    width: "98%",
    marginHorizontal: 14
  }
});
