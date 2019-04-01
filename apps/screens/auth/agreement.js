import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
} from "react-native";
import Pdf from "react-native-pdf";
//import { WebView } from "react-native-webview";
import { StylePanel } from "../../configs/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { base_url } from "../../configs/const";

export default class Agreement extends Component {
  constructor(props) {
    super(props);
    this.pdf = null;
  }
  render() {
    const source = {
      uri: base_url + "/oferta",
      cache: true
    };
    // firebase.analytics().setCurrentScreen("sms code");
    return (
      <View style={StylePanel.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <Icon
            name={"ios-arrow-round-back"}
            size={32}
            color="white"
            style={{
              marginLeft: 15
            }}
          />
        </TouchableOpacity>

        <Pdf
          ref={pdf => {
            this.pdf = pdf;
          }}
          source={source}
          style={{ flex: 1 }}
          onError={error => {
            console.log(error);
          }}
        />
        {/* <WebView  
     //   style={{width:200,height:200}}
         source={{ uri: base_url + "/oferta" }} /> */}
      </View>
    );
  }
}
