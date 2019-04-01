import React, { Component } from "react";
import { AsyncStorage, View } from "react-native";
import axios from "axios";
//import firebase from "react-native-firebase";
import { base_url } from "../../configs/const";
import stringsoflanguages from "../../locale";
import { SelectPage, ModalDropdown } from "../../components";
export default class SelectCity extends Component {
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
    console.log("USER_ID",this.vedom, user_id, "TOKEN_ID", token);
    axios
      .get(base_url + `/api/city/all`, {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ cities: res.data.cities });
        console.log("CITY", this.state.cities);
      });
  }
  handleSearchBar = searchTxt => {
    this.setState({ searchTxt });
  };
  handleCity = item => {
    this.props.navigation.navigate("Accordion", {
      city: item,
      vedom: this.vedom,
    });
  };
  render() {
    const { cities, searchTxt } = this.state;
    // firebase.analytics().setCurrentScreen("выберите регион");
    var data = cities;
    var searchString = searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    return (
      <SelectPage
        type={"city"}
        vedom={this.vedom}
        searchTxt={searchTxt}
        onChangeSearchTxt={searchTxt => this.handleSearchBar(searchTxt)}
        header={stringsoflanguages.select_region.header}
        data={data}
        onPressCity={item => this.handleCity(item._id)}
      />
    );
  }
}
