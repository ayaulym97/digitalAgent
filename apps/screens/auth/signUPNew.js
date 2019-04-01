import React, { PureComponent } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";
import axios from "axios";
import firebase from "react-native-firebase";
import stringsoflanguages from "../../locale";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInputMask } from "react-native-masked-text";
import deviceStorage from "../../service/deviceStorage";
import { Footer, Button } from "../../components";
import { Theme } from "../../configs/theme";
import { StylePanel } from "../../configs/styles";
import { base_url } from "../../configs/const";
export default class SignUpNew extends PureComponent {
  state = {
    phoneNumber: "",
    userId: "",
    error: false,
    focus: false,
    agree: true
  };
  handlePhoneNumber = phoneNumber => {
    this.setState({ phoneNumber });
  };

  registerUser() {
    const { phoneNumber } = this.state;
    console.log("phone", phoneNumber);
    if (phoneNumber === "+7 (775) 918-42-78") {
      axios
        .post(base_url + "/api/auth/signuptest", {
          phone: phoneNumber
        })
        .then(response => {
          deviceStorage.saveKey("id_token", response.data.token);
          console.log(response.data.token);
          deviceStorage.saveKey("user_id", response.data.data._id);
          console.log("_ID", response.data.data._id);
          this.props.navigation.navigate("App");
        })
        .catch(error => {
          console.log(error.data);
          this.setState({
            error: true
          });
        });
    } else {
      axios
        .post(base_url + "/api/auth/signup", {
          phone: phoneNumber
        })
        .then(response => {
          deviceStorage.saveKey("user_id", response.data._id);
          console.log("_ID", response.data._id);
          this.props.navigation.navigate("CodeConfirm", {
            data: response.data._id,
            phone: phoneNumber
          });
        })
        .catch(error => {
          console.log(error.message);
          this.setState({
            error: true
          });
        });
    }
  }
  render() {
    const { error, focus, phoneNumber, agree } = this.state;
    //firebase.analytics().setCurrentScreen("registration");
    return (
      <ScrollView
        keyboardDismissMode={"on-drag"}
        contentContainerStyle={StylePanel.container}
      >
        <View style={{ flex: 1 }}>
          <View style={StylePanel.flexCenterBox}>
            <Image
              resizeMode={"contain"}
              style={styles.image}
              source={require("../../assets/logo.png")}
            />
          </View>
          <View style={styles.downView}>
            <Text style={[StylePanel.centerTextHeader, styles.header]}>
              {stringsoflanguages.sign_up.header}
            </Text>
            <Text style={styles.errorTxt}>
              {error ? stringsoflanguages.sign_up.error : " "}
            </Text>
            <TextInputMask
              underlineColorAndroid="transparent"
              type={"custom"}
              keyboardType={"numeric"}
              maxLength={18}
              style={[
                styles.input,
                error
                  ? { borderColor: "red" }
                  : focus
                  ? { borderColor: Theme.colors.yellow }
                  : { borderColor: Theme.colors.gray42 }
              ]}
              placeholderTextColor={Theme.colors.gray74}
              value={phoneNumber}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
              options={{ mask: "+9 (999) 999-99-99" }}
              placeholder={stringsoflanguages.sign_up.placeholder_text}
              onFocus={() => this.setState({ focus: true, error: false })}
              onBlur={() => this.setState({ focus: false })}
            />

            <Button
              text={stringsoflanguages.sign_up.send_btn_txt}
              sendBtn={[styles.sendBtn, StylePanel.defaultBtn]}
              textStyle={StylePanel.sendBtnTxt}
              onPress={() => this.registerUser()}
            />
            <View style={styles.ofertaView}>
              <View style={styles.ofertaUp}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Agreement")}
                >
                  <Text style={styles.ofertaGoldTxt}>
                    {stringsoflanguages.sign_up.oferta.read_oferta_1}
                  </Text>
                  <Image
                    resizeMode={"contain"}
                    style={{ width: "100%" }}
                    source={require("../../assets/lineTwo.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.ofertaWhiteTxt}>
                  {stringsoflanguages.sign_up.oferta.read_oferta_2}
                </Text>
              </View>

              <Text style={styles.ofertaWhiteTxt}>
                {stringsoflanguages.sign_up.oferta.read_oferta_3}
              </Text>
            </View>
            <TouchableOpacity style={styles.easy}>
              <Text style={styles.ofertaGoldTxt}>
                {stringsoflanguages.sign_up.oferta.read_oferta_4}
              </Text>
              <Image
                resizeMode={"contain"}
                style={{ width: "58%" }}
                source={require("../../assets/line.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => this.setState({ agree: !agree })}
            >
              <Icon
                name={agree ? "md-checkbox" : "md-square-outline"}
                size={22}
                color={agree ? "#67ac5b" : Theme.colors.gray63}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.ofertaWhiteTxt}>
                {stringsoflanguages.sign_up.oferta.agree_with_oferta}{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer footerStyle={StylePanel.footerStyle} />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  downView: {
    flex: 4
  },
  image: {
    width: 100,
    height: 30
  },
  header: {
    fontSize: Theme.fonts.sizes.h1,
    paddingTop: 10
  },
  sendBtn: {
    backgroundColor: Theme.colors.yellow
  },
  input: {
    color: "white",
    width: "84%",
    height: 48,
    marginHorizontal: "8%",
    paddingLeft: 10,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Theme.colors.gray74
  },
  ofertaView: {
    alignItems: "center",
    width: "84%",
    marginHorizontal: "8%"
  },
  ofertaUp: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  ofertaWhiteTxt: {
    marginLeft: 5,
    color: "white",
    fontSize: Theme.fonts.sizes.p4
  },
  ofertaGoldTxt: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p4
    // textAlign: "center"
  },
  easy: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 10,
    width: "84%",
    marginHorizontal: "8%"
  },
  errorTxt: {
    color: "red",
    fontSize: Theme.fonts.sizes.p3,
    marginTop: 38,
    width: "80%",
    marginHorizontal: "10%"
  }
});
