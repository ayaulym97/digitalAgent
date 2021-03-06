import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  Animated,
  Alert,
  TextInput,
  Text,
  Platform,
  StyleSheet
} from "react-native";
import axios from "axios";
import { base_url } from "../../configs/const";
import { LogoView } from "../../components";
import { Theme } from "../../configs/theme";
import { StylePanel } from "../../configs/styles";
import InputView from "../../components/PinView/InputView";
import Styles from "../../components/PinView/styles";
import deviceStorage from "../../service/deviceStorage";
export default class RepeatPin extends Component {
  state = {
    animatedInputIndex: "",
    pinViewAnim: new Animated.Value(0)
  };
  code = this.props.navigation.getParam("code", "default");
  handleCode = animatedInputIndex => {
    this.setState({
      animatedInputIndex
    });
    console.log("INDEX", animatedInputIndex);
    if (animatedInputIndex.length === 4) {
      if (this.code === animatedInputIndex) {
        deviceStorage.saveKey("pincode", this.code);
        this.createPin();
        setTimeout(() => {
          this.props.navigation.navigate("App");
        }, 500);
      } else {
        this.setState({
          animatedInputIndex: ""
        });
        Alert.alert("Ваш пароль и пароль подтверждения не совпадают");
      }
    }
  };
  async createPin() {
    const user_id = await AsyncStorage.getItem("user_id");
    console.log(user_id, "USER_ID");
    axios
      .put(base_url + "/api/auth/" + user_id, {
        code: this.code
      })
      .then(response => {
        console.log("RESPONSE", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log("CODe", this.code);
    const { animatedInputIndex, pinViewAnim } = this.state;
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />

        <View style={styles.downView}>
          <Text style={styles.header}>Повторите код доступа</Text>
          <InputView
            bgOpacity={0.1}
            pinLength={4}
            activeBgColor={"#333"}
            animatedInputIndex={animatedInputIndex}
            pinViewAnim={pinViewAnim}
            bgColor={"#333"}
            styles={[
              Styles.passwordInputView,
              Styles.passwordInputViewItem,
              Styles.passwordInputViewItemActive
            ]}
          />
          <TextInput
            autoFocus={true}
            blurOnSubmit={true}
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={animatedInputIndex =>
              this.handleCode(animatedInputIndex)
            }
            value={animatedInputIndex}
            placeholder="EEE"
            style={styles.input}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  downView: {
    flex: 5
  },
  logoView: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    width: "100%",
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  subtitle: {
    paddingTop: 32,
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  input: {
    backgroundColor: "red",
    position: "absolute",
    right: -99,
    top: 24
  }
});
