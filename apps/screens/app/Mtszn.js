import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import axios from "axios";
//import firebase from "react-native-firebase";
import { base_url } from "../../configs/const";
import { StylePanel } from "../../configs/styles";

import stringsoflanguages from "../../locale";
import { SelectPage, ModalDropdown } from "../../components";
export default class Mtszn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: ""
    };
  }
  vedom = this.props.navigation.getParam("vedom", "default");
  async componentDidMount() {
    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorage.getItem("id_token");
    console.log("USER_ID", user_id, "TOKEN_ID", token);
    axios
      .get(base_url + `/api/mtszn`, {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ cities: res.data });
        console.log("MTSZN", res.data);
      });
  }
  handleSearchBar = searchTxt => {
    this.setState({ searchTxt });
  };
  handleCity = item => {
    this.props.navigation.navigate("Estimate", {
      cons: item,
      vedom: this.vedom
    });
  };
  render() {
    console.log("MTSZN", this.vedom);
    const { cities, searchTxt } = this.state;
    var data = cities;
    var searchString = searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    //firebase.analytics().setCurrentScreen("MTSZN PAGE");
    return (
      <View style={StylePanel.selectContainer}>
        <SelectPage
          advanced={true}
          searchTxt={searchTxt}
          onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
          header={stringsoflanguages.select_institute.header}
          data={data}
          onPressCity={item => this.handleCity(item)}
        />
      </View>
    );
  }
}
