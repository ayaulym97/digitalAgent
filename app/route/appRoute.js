import React from "react";
import { createStackNavigator } from "react-navigation";
import {
  Accordion,
  PinPassword,
  SelectVedom,
  SelectCity,
  Estimate,
  EstimateSO,
  WaitForResponse,
  WannaBeContacted,
  AfterEightPm,
  Called,
  Uncalled,
  Mtszn
} from "../screens/app";
import { Image, View, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../configs/theme";
import {  ModalDropdown} from "../components";
const app = createStackNavigator(
  {
    Accordion: {
      screen: Accordion
    },
    PinPassword: {
      screen: PinPassword,
      navigationOptions: {
        header: null
      }
    },
    SelectVedom: {
      screen: SelectVedom,
      navigationOptions: {
        header: null
      }
    },
    Mtszn: {
      screen: Mtszn
    },
    SelectCity: {
      screen: SelectCity
    },
    Estimate: {
      screen: Estimate
    },
    EstimateSO: {
      screen: EstimateSO
    },
    WannaBeContacted: {
      screen: WannaBeContacted,
      navigationOptions: {
        headerLeft: null
      }
    },
    AfterEightPm: {
      screen: AfterEightPm
    },
    WaitForResponse: {
      screen: WaitForResponse,
      navigationOptions: {
        headerLeft: null
      }
    },
    Called: {
      screen: Called,
      navigationOptions: {
        headerLeft: null
      }
    },
    Uncalled: {
      screen: Uncalled,
      navigationOptions: {
        headerLeft: null
      }
    }
  },
  {
    initialRouteName: "SelectVedom",
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Theme.colors.gray26,
        borderBottomWidth: 0
      },

      headerBackImage: (
        <Icon
          name={"ios-arrow-round-back"}
          size={32}
          color="white"
          style={{
            marginLeft: Platform.OS === "ios" ? 16 : 0
          }}
        />
      ),
      headerTitle: (
        <Image
          resizeMode={"contain"}
          style={{
            width: "0.186%",
            height: 20,
            flex: 1
          }}
          source={require("../assets/logo.png")}
        />
      ),
      headerRight: (
        <View style={{ marginRight: 20 }}>
          <ModalDropdown
            onSelect={() => navigation.navigate(navigation.state.routeName, {})}
            options={["eng", "ru", "kz"]}
          />
        </View>
      )
    })
  }
);

export default app;
