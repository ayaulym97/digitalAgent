import React, { Component } from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { scale } from "../../configs/index";
import { Theme } from "../../configs/theme";
import { StylePanel } from "../../configs/styles";
import { Footer, YesOrNo } from "../../components";
import stringsoflanguages  from "../../locale"
export default class WannaBeContacted extends Component {
  review = this.props.navigation.getParam("review", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  
  render() {
    console.log("VEDOM",this.vedom)
    return (
      <View style={StylePanel.container}>
        <View style={styles.upView}>
          <Image
            resizeMode={"contain"}
            style={styles.image}
            source={require("../../assets/thanksIcon.png")}
          />
        </View>
        <View style={StylePanel.flexCenterBox}>
          <Text style={styles.title}>{stringsoflanguages.wanna_be_connected.thanks}</Text>
          <Text style={styles.title}>{stringsoflanguages.wanna_be_connected.subheader}</Text>
          <YesOrNo
            header={stringsoflanguages.wanna_be_connected.wanna_be_contacted}
            headerStyle={styles.subDownTxt}
            yesStyle={styles.sendBtnYes}
            noStyle={styles.sendBtnNo}
            yesTitleStyle={styles.sendBtnTxtYes}
            noTitleStyle={styles.sendBtnTxtNo}
            onPressYes={() =>
              this.props.navigation.navigate("WaitForResponse", {
                review: this.review,
                vedom:this.vedom
                
              })
            }
            onPressNo={() => this.props.navigation.navigate("Called")}
          />
        </View>

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
  upView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  image: {
    width: "58%",
    height: scale(193),
    marginHorizontal: "21%"
  },
  subDownView: {
    justifyContent: "center",
    alignContent: "center"
  },
  title: {
    fontSize: Theme.fonts.sizes.p6,
    color: Theme.colors.yellow,
    textAlign: "center",
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  subDownTxt: {
    marginTop: 10,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center",
    color: Theme.colors.yellow,
    width: "90%",
    marginHorizontal: "5%",
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  waitTxt: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20
  },
  sendBtnYes: {
    width: "40%",
    height: 45,
    backgroundColor: Theme.colors.yellow,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtnNo: {
    width: "40%",
    height: 45,
    borderColor: Theme.colors.yellow,
    borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtnTxtYes: {
    color: Theme.colors.bcground,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  },
  sendBtnTxtNo: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  }
});
