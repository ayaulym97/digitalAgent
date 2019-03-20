import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Text,
  View
} from "react-native";
import axios from "axios";
//import firebase from "react-native-firebase";
import { Theme } from "../../configs/theme";
import { StylePanel } from "../../configs/styles";
import { Footer, SearchInput, Tout } from "../../components";
import { base_url } from "../../configs/const";
import stringsoflanguages from "../../locale";
export default class Accordion extends PureComponent {
  state = {
    activeTab: 0,
    cons: [],
    searchTxt: "",
    token: ""
  };
  measurements = [];
  city = this.props.navigation.getParam("city", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  async componentDidMount() {
    const token = await AsyncStorage.getItem("id_token");
    this.setState({ token });
    console.log("City", this.city, "TOKEN", this.state.token);
    try {
      axios
        .get(base_url + "/api/region/bycity/" + this.vedom + "/" + this.city, {
          headers: { Authorization: token }
        })
        .then(res => {
          this.setState({ districts: res.data.regions });
          console.log("region",res.data.regions);
        });
    } catch (error) {
      console.log("err", error);
    }
  }

  handleDistricts = (item, index) => {
    console.log(item._id, this.vedom);
    this.setState(prevState => ({
      activeTab: prevState.activeTab === index ? -1 : index
    }));
    let api;
    switch (this.vedom) {
      case "con":
        api = "/api/con/byregion/";
        break;
      case "kgd":
        api = "/api/kgd/";
        break;
      default:
        break;
      //we don't need mtszn because it goes to another page
    }
    if (this.vedom === "so" || this.vedom === "mz" || this.vedom === "akimat") {
      try {
        axios
          .get(
            base_url +
              "/api/saveagency/veryfied/" +
              item._id +
              "/" +
              this.vedom,
            {}
          )
          .then(res => {
            this.setState({ cons: res.data });
            console.log("CONS", this.state.cons);
          });
      } catch (error) {
        console.log("err", error.res);
      }
    } else {
      try {
        axios
          .get(base_url + api + item._id, {
            headers: { Authorization: this.state.token }
          })
          .then(res => {
            if (this.vedom === "con") {
              this.setState({ cons: res.data.cons });
            } else {
              this.setState({ cons: res.data });
            }
          });
      } catch (error) {
        console.log("err", error);
      }
    }
  };
  setScrollRef = node => {
    //store a reference to the scroll view so we can call its scrollTo method
    if (node) {
      this.scrollViewRef = node;
    }
  };

  handleLayout = (measurements, toutIndex) => {
    //this process is expensive, so we only want to measure when necessary. Probably could be optimized even further...
    if (!this.measurements[toutIndex]) {
      //if they dont already exist...
      this.measurements[toutIndex] = measurements; //...put the measurements of each tout into its proper place in the array
    }
  };
  handleSearchBar = searchTxt => {
    this.setState({
      searchTxt
    });
  };
  render() {
    const { districts, searchTxt, activeTab, cons } = this.state;
    var data = districts;
    var searchString = searchTxt.trim().toLowerCase();
    if (searchString.length > 0) {
      data = data.filter(i => {
        return i.name.toLowerCase().match(searchString);
      });
    }
    // firebase.analytics().setCurrentScreen("выберите регион и учреждение");
    return (
      <View style={StylePanel.selectContainer}>
        <View style={StylePanel.upView}>
          <SearchInput
            value={searchTxt}
            onChangeText={searchTxt => this.handleSearchBar(searchTxt)}
          />
          <Text style={StylePanel.header}>
            {stringsoflanguages.select_district.header}
          </Text>
        </View>
        <View style={StylePanel.downView}>
          {data ? (
            <ScrollView scrollEventThrottle={20} ref={this.setScrollRef}>
              {data.map((item, index) => {
                return (
                  <Tout
                    key={index}
                    vedom={this.vedom}
                    toutIndex={index} //tout index will help us know which tout we are clicking on
                    item={item}
                    cons={cons}
                    activeTab={activeTab}
                    isOpenTab={item._id === activeTab}
                    handleDistricts={() => this.handleDistricts(item, item._id)}
                    handleLayout={() => this.handleLayout()} //when layout is triggered for touts, we can measure them
                  />
                );
              })}
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
