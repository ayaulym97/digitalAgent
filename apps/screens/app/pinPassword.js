import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  Platform,
  Alert,
  StyleSheet
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

import { Theme } from "../../configs/theme";
import { StylePanel } from "../../configs/styles";
import PinView from "../../components/PinView";

import axios from "axios";
import { base_url } from "../../configs/const";
export default class PinPassword extends Component {
  state = {
    modalVisible: false,
    viewRef: null
  };
  async handlePinCode(val) {
    const user_id = await AsyncStorage.getItem("user_id");
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [NavigationActions.navigate({ routeName: "SelectVedom" })]
    });
    console.log(val, "code", user_id);
    axios
      .post(base_url + "/api/auth/code", {
        code: val,
        id: user_id
      })
      .then(response => {
        console.log("RESPONSE", response.data);
        if (response.data) {
          this.props.navigation.dispatch(resetAction);
        } else {
          Alert.alert("Неверно введен ПИН-код!");
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Неверно введен ПИН-код!");
      });
  }

  render() {
    return (
      <View style={StylePanel.container}>
        <Modal
          onRequestClose={() => this.setState({ modalVisible: false })}
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modal}>
            <View style={styles.subModal}>
              <Text style={[styles.sendBtnTxt, { color: "white" }]}>
                Востановить код доступа?
              </Text>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 24 }}>
                <TouchableOpacity
                  style={[
                    styles.sendBtn,
                    { backgroundColor: Theme.colors.yellow }
                  ]}
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  <Text
                    style={[
                      styles.sendBtnTxt,
                      { color: Theme.colors.bcground }
                    ]}
                  >
                    Да
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sendBtn,
                    { borderColor: Theme.colors.yellow, borderWidth: 1 }
                  ]}
                  onPress={() => this.setState({ modalVisible: false })}
                >
                  <Text
                    style={[styles.sendBtnTxt, { color: Theme.colors.yellow }]}
                  >
                    Нет
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.logoView}>
          <Image
            resizeMode={"contain"}
            style={styles.image}
            source={require("../../assets/logo.png")}
          />
          <Text
            style={{
              color: Theme.colors.yellow,
              fontFamily:
                Platform.OS === "android" ? "sans-serif-light" : undefined,
              textAlign: "center",
              fontWeight: "100",
              fontSize: Theme.fonts.sizes.p6
            }}
          >
            Введите код доступа
          </Text>
        </View>

        <View style={styles.downView}>
          <PinView
            onComplete={(val, clear) => this.handlePinCode(val)}
            pinLength={4}
          />
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true })}
          >
            <Text
              style={{
                marginVertical: 30,
                color: "white",
                fontSize: Theme.fonts.sizes.p4
              }}
            >
              Забыли пароль?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  subModal: {
    paddingTop: 34,
    width: "70%",
    height: "21%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.checkboxGray
  },
  logoView: {
    flex: 1.5,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  downView: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 30,
    marginBottom: 30
  },
  footerStyle: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%"
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground,
    justifyContent: "center",
    alignItems: "center"
  },
  sendBtnTxt: {
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  },
  sendBtnTxtNo: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  },
  sendBtn: {
    width: "40%",
    height: 45,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
