import React, { PureComponent } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../configs/theme";
import { StylePanel } from "../configs/styles";
class Tout extends PureComponent {
  state = {
    toutSubcategoriesVisible: false
  };
  handlePressTout = item => {
    const isActive = this.props.activeTab === this.props.toutIndex;
    console.log("TOUT", isActive, this.props.activeTab, this.props.toutIndex);
    this.props.handleDistricts();
  };
  setToutRef = node => {
    //store a reference to the tout so we can measure it
    if (node) {
      this.toutRef = node;
    }
  };
  handleInstitution=(item)=>{
    if (this.props.vedom==="so") {
      this.props.navigation.navigate("EstimateSO", {
        cons: item,
        vedom: this.props.vedom
      })
    } else {
      this.props.navigation.navigate("Estimate", {
        cons: item,
        vedom: this.props.vedom
      })
    }
  }

  render() {
    let categoryLinks;
    if (this.props.cons.length > 0) {
      categoryLinks = (
        <Animated.View>
          {this.props.cons.map(item => {
            return (
              <TouchableOpacity
                key={item._id}
                style={styles.advancedcityContainer}
                onPress={()=>this.handleInstitution(item)}
              >
                <View style={styles.content}>
                  <Text style={styles.cityTxt}>{item.name}</Text>
                  {this.props.vedom === "con" ? null : (
                    <Text style={styles.addressTxt}>{item.address}</Text>
                  )}
                </View>
                <Icon
                  name={"ios-arrow-forward"}
                  size={24}
                  color={Theme.colors.gray63}
                />
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      );
    } else {
      categoryLinks = (
        <Animated.View style={styles.advancedcityContainer}>
          <Text style={styles.addressTxt}>Учреждение проходит модерaцию</Text>
        </Animated.View>
      );
    }

    return (
      <View>
        <TouchableOpacity
          style={
            this.props.item.name === "Специализированный отдел" &&
            this.props.vedom === "con"
              ? styles.specotdel
              : StylePanel.cityContainer
          }
          ref={this.setToutRef}
          onPress={() =>
            this.handlePressTout(this.props.item, this.props.toutIndex)
          }
        >
          <Text
            style={StylePanel.cityTxt} //text is wrapped by image so it can be easily centered
          >
            {this.props.item.name}
          </Text>
        </TouchableOpacity>
        {this.props.isOpenTab && categoryLinks}
      </View>
    );
  }
}
export default withNavigation(Tout);

const styles = StyleSheet.create({
  cityContainer: {
    width: "92%",
    marginHorizontal: "4%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray42
  },
  upView: {
    flex: 1
  },
  advancedcityContainer: {
    flex: 1,
    backgroundColor: Theme.colors.gray26,
    paddingHorizontal: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray42
  },
  cityTxt: {
    color: "white",
    fontWeight: "500",
    fontSize: Theme.fonts.sizes.p6
  },
  addressTxt: {
    paddingTop: 10,
    color: "#727272",
    fontSize: Theme.fonts.sizes.p4
  },
  content: {
    width: "95%"
  },
  specotdel: {
    backgroundColor: Theme.colors.yellow,
    paddingVertical: 12,
    paddingLeft: "4%"
  }
});
