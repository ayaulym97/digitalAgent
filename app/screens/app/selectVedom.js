import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet
} from "react-native";
import axios from "axios";
import { Theme } from "../../configs/theme";
import { base_url } from "../../configs/const";
//import firebase from "react-native-firebase";
import stringsoflanguages from "../../locale";
import { StylePanel } from "../../configs/styles";
import { Footer, LogoView } from "../../components";
export default class SelectVedom extends Component {
  state = {
    img: [
      require("../../assets/university.png"),
      require("../../assets/bank.png"),
      require("../../assets/businessman.png")
    ]
  };
  componentDidMount() {
    //firebase.analytics().setCurrentScreen("Выберите Ведомство");
    axios.get(base_url + `/api/saveagency/agencytypes`, {}).then(res => {
      this.setState({ vedom: res.data });
      console.log("Vedom", res.data, this.state.vedom);
    });
  }
  chooseVedom = vedom => {
    console.log(vedom, "VEDOM");
    if (vedom === "mtszn") {
      this.props.navigation.navigate("Mtszn", { vedom });
    } else {
      this.props.navigation.navigate("SelectCity", { vedom });
    }
    // firebase.analytics().logEvent("selectvedom", {
    //   vedom: vedom
    // });
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />
        <View style={styles.mainView}>
          <Text style={styles.header}>
            {stringsoflanguages.select_vedom.header}
          </Text>
          {this.state.vedom ? (
            <ScrollView>
              {/* <TouchableOpacity
                style={styles.vedom}
                onPress={() => this.chooseVedom("con")}
              >
                <Image
                  style={styles.vedomIcon}
                  source={require("../../assets/university.png")}
                />
                <Text style={styles.vedomText}>
                  {stringsoflanguages.select_vedom.service_center}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.vedom}
                onPress={() => this.chooseVedom("kgd")}
              >
                <Image
                  style={styles.vedomIcon}
                  source={require("../../assets/bank.png")}
                />
                <Text style={styles.vedomText}>
                  {stringsoflanguages.select_vedom.ministry_of_finance}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.vedom}
                onPress={() => this.chooseVedom("mtszn")}
              >
                <Image
                  style={styles.vedomIcon}
                  source={require("../../assets/businessman.png")}
                />
                <Text style={styles.vedomText}>
                  {stringsoflanguages.select_vedom.ministry_of_labor}
                </Text>
              </TouchableOpacity> */}
              <FlatList
                data={this.state.vedom}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.vedom}
                    onPress={() => this.chooseVedom(item.short_name)}
                  >
                    <Image
                      style={styles.vedomIcon}
                      source={this.state.img[Math.floor(Math.random() * 3)]}
                    />
                    <Text style={styles.vedomText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color={Theme.colors.yellow} />
          )}
        </View>

        <Footer footerStyle={StylePanel.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    //marginBottom: 95
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  mainView: {
    flex: 4
  },
  header: {
    textAlign: "center",
    fontSize: Theme.fonts.sizes.h2,
    color: Theme.colors.yellow,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100",
    marginBottom: 20
  //  marginBottom: 32
  },
  vedom: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginHorizontal: "5%",
    marginBottom: 10,
    backgroundColor: Theme.colors.gray26
  },
  vedomIcon: {
    width: 22,
    height: 22,
    margin: 14
  },
  vedomText: {
    width: "85%",
    color: "white",
    fontSize: Theme.fonts.sizes.p5
  }
});
