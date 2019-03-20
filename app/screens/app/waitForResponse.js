window.navigator.userAgent = "ReactNative";
import React from "react";
import {
  View,
  Text,
  AppState,
  TouchableOpacity,
  Easing,
  Platform,
  StyleSheet,
  AsyncStorage
} from "react-native";
import axios from "axios";
import { StackActions, NavigationActions } from "react-navigation";

import firebase from "react-native-firebase";
import PushNotification from "react-native-push-notification";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Footer, YesOrNo } from "../../components";
import { Theme } from "../../configs/theme";
import stringsoflanguages from "../../locale";
import { base_url } from "../../configs/const";
import { StylePanel } from "../../configs/styles";
export default class WaitForResponse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      minute: 5,
      seconds: 0,
      fill: 0,
      solved: false,
      time: 300000,
      device_token: ""
    };
  }
  componentDidMount() {
    const time_in_minutes = 5;
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + time_in_minutes * 60 * 1000);
    this.run_clock(deadline);
    this.getToken();
    this.circularProgress.animate(100, this.state.time, Easing.quad);
    AppState.addEventListener("change", this.handleAppStateChange);
    PushNotification.configure({
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
      onNotification: function(notification) {
        if (notification.foreground) {
          console.log("notification.foreground", notification);
          // this.props.navigation.navigate("WaitForResponse");
        }
      },
      onNotificationOpened:(notification)=>{
        this.props.navigation.navigate("WaitForResponse");
      }
    });
    console.log("REVIEW_ID",this.review);
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const notification = notificationOpen.notification;
        console.log("NOTIF", notification._data.review_id);
        this.props.navigation.navigate("WaitForResponse",{review:notification._data.review_id});

      });
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
    this.notificationOpenedListener();
  }
  static navigationOptions = ({ navigation }) => ({
    headerRight: null
  });
  getToken = () => {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          firebase
            .messaging()
            .getToken()
            .then(token => {
              console.log("token: ,", token);
              this.setState({
                device_token: token
              });
            });
          // user has permissions
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              alert("User Now Has Permission");
              firebase
                .messaging()
                .getToken()
                .then(token => {
                  console.log("token: ", token);

                  this.setState({
                    device_token: token
                  });
                });
            })
            .catch(error => {
              console.log(error);
            //  alert("Error", error);
            });
        }
      });
  };

  handleAppStateChange = appState => {
    if (appState === "background") {
      console.log("BACKGROUND", new Date().toLocaleString());
      let remainingTime = (this.state.minute * 60 + this.state.seconds) * 1000;
      console.log(
        "this.state.minute",
        remainingTime,
        this.state.minute,
        this.state.seconds
      );
      if (remainingTime !== 0) {
        let date = new Date(Date.now() + remainingTime);
        PushNotification.localNotificationSchedule({
          message: "Вам позвонили?",
          date,
          soundName: "rush"
        });
      }
    } else {
      console.log("FOREGROUND", new Date().toLocaleString());
    }
  };
  review = this.props.navigation.getParam("review", "default");
  run_clock = deadline => {
    clearInterval(timeinterval);
    var timeinterval = setInterval(() => {
      var t = Date.parse(deadline) - Date.parse(new Date());
      this.setState({
        time: t
      });
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      if (seconds >= 0 && minutes >= 0) {
        this.setState({
          minute: minutes,
          seconds: seconds
        });
      } else {
        this.setState({
          minute: 0,
          seconds: 0
        });
      }
    }, 1000);
  };
  handleCalled = called => {
    this.setState({ solved: true, called: called });
  };
  handleSolved = solved => {
    this.postUpdate(solved);

    if (solved === "0") {
      this.postAdgs();
      this.props.navigation.navigate("Uncalled");
    } else {
      this.props.navigation.navigate("Called");
    }
  };
  async postUpdate(solved) {
    const token = await AsyncStorage.getItem("id_token");
    console.log("  this.review", this.review, this.state.called, solved);

    axios
      .put(
        base_url +
          "/api/review/updateStatus/" +
          this.review +
          "/" +
          this.state.called +
          "/" +
          solved,
        { device_token: this.state.device_token },
        { headers: { Authorization: token } }
      )
      .then(response => {
        console.log("/api/review/updateStatus/", response);
      })
      .catch(error => {
        console.log(error, 66);
      });
  }
  async postAdgs() {
    const token = await AsyncStorage.getItem("id_token");
    console.log("TOKEN_ADGS", token, this.review);
    axios
      .post(
        base_url + "/api/review/sendtoadgs/" + this.review,
        {},
        { headers: { Authorization: token } }
      )
      .then(response => {
        console.log("postadgs", response);
      })
      .catch(function(error) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  }
  render() {
    const { minute, seconds, fill, solved } = this.state;
    return (
      <View style={StylePanel.container}>
        <View style={styles.upView}>
          <AnimatedCircularProgress
            style={{ marginTop: 30, marginHorizontal: "15%" }}
            ref={ref => (this.circularProgress = ref)}
            size={250}
            width={18}
            rotation={0}
            fill={fill}
            tintColor={Theme.colors.yellow}
            backgroundColor={Theme.colors.gray26}
          >
            {() => (
              <Text style={styles.timeTxt}>
                0{minute}:{seconds < 10 ? 0 : null}
                {seconds}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>

        <View style={styles.downView}>
          {seconds === 0 && minute === 0 ? (
            <View styles={styles.subDownView}>
              {solved ? (
                <YesOrNo
                  header={stringsoflanguages.wait_5_minute.called}
                  headerStyle={styles.subDownTxt}
                  yesStyle={styles.sendBtnYes}
                  noStyle={styles.sendBtnNo}
                  yesTitleStyle={styles.sendBtnTxtYes}
                  noTitleStyle={styles.sendBtnTxtNo}
                  onPressYes={() => this.handleSolved("1")}
                  onPressNo={() => this.handleSolved("0")}
                />
              ) : (
                <YesOrNo
                  header={stringsoflanguages.wait_5_minute.solved_problem}
                  headerStyle={styles.subDownTxt}
                  yesStyle={styles.sendBtnYes}
                  noStyle={styles.sendBtnNo}
                  yesTitleStyle={styles.sendBtnTxtYes}
                  noTitleStyle={styles.sendBtnTxtNo}
                  onPressYes={() => this.handleCalled("1")}
                  onPressNo={() => this.handleCalled("0")}
                />
              )}
            </View>
          ) : (
            <View styles={styles.subDownView}>
              <Text style={styles.subDownTxt}>
                {stringsoflanguages.wait_5_minute.header}
              </Text>
              <Text style={styles.waitTxt}>
                {stringsoflanguages.wait_5_minute.content}
              </Text>
            </View>
          )}
        </View>
        <Footer footerStyle={styles.footerStyle} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground
  },
  upView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  downView: {
    flex: 1,
    paddingTop: 60
  },
  subDownView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  footerStyle: {
    position: "absolute",
    bottom: 20,
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: "5%"
  },
  timeTxt: {
    fontSize: 36,
    color: Theme.colors.yellow,
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "200"
  },
  subDownTxt: {
    fontSize: 26,
    textAlign: "center",
    color: Theme.colors.yellow,
    width: "90%",
    marginHorizontal: "5%",
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined,
    fontWeight: "100"
  },
  answerContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10
  },
  waitTxt: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20
  },
  sendBtnYes: {
    width: "40%",
    height: 45,
    backgroundColor: Theme.colors.yellow,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtnNo: {
    width: "40%",
    height: 45,
    borderColor: Theme.colors.yellow,
    borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  sendBtnTxtYes: {
    color: Theme.colors.bcground,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  },
  sendBtnTxtNo: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  }
});
