import React, { PureComponent } from "react";
import { AsyncStorage } from "react-native";
import root from "./app/route";
import { SignUpNew } from "./app/screens/auth";
import Auth from "./app/route/authRoute";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onboarding: "false"
    };
  }
  async componentDidMount() {
    try {
      const item = await AsyncStorage.getItem("onboarding");
      if (item === null || item === "false") {
        this.setState({ onboarding: "false" });
      } else {
        await AsyncStorage.setItem("onboarding", "true");
        this.setState({ onboarding: "true" });
      }
      console.log("####", item);
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    const { onboarding } = this.state;
    const Layout = root(onboarding);
    return <Layout />;
  }
}
//original
//
