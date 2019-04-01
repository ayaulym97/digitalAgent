import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet
} from "react-native";
import Swiper from "react-native-swiper";
import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import { Button, IntroPage, Footer } from "../components";
import { scale } from "../configs/index";
import deviceStorage from "../service/deviceStorage";
import { LogoView } from "../components";
import stringsoflanguages from "../locale";
//import firebase from "react-native-firebase";
export default class AppIntro extends React.Component {
  state = {
    index: 0,
    lang: "ru",
    modalVisible: true
  };
  swiper = null;

  swipe = () => {
    const { index } = this.state;
    this.swiper.scrollBy(1);
    if (index === 2) {
      this.onBoard();
      this.props.navigation.navigate("ApplicationSwitch");
    } else {
      this.setState({
        index: index + 1
      });
    }
  };
  onIndexChanged = index => {
    this.setState({
      index
    });
  };

  onBoard = async () => {
    try {
      deviceStorage.saveKey("onboarding", "true");
    } catch (error) {
      console.log(error.message);
    }
  };
  handleLangChange = () => {
    stringsoflanguages.setLanguage(this.state.lang);
    this.setState({ modalVisible: false });
    this.props.navigation.navigate(this.props.navigation.state.routeName, {});
  };
  changeLang = lang => {
    this.setState({
      lang
    });
  };
  render() {
    //firebase.analytics().setCurrentScreen("tutorial");
    return (
      <View style={StylePanel.container}>
        <LogoView logostyle={styles.logoView} />
        <View style={styles.upView}>
          <Swiper
            loop={false}
            showsButtons={false}
            ref={swiper => {
              this.swiper = swiper;
            }}
            dot={<View style={[styles.dotStyle, styles.passive]} />}
            activeDot={<View style={[styles.dotStyle, styles.active]} />}
            onIndexChanged={index => this.onIndexChanged(index)}
          >
            <IntroPage
              img={require("../assets/onboardIconOne.png")}
              header={stringsoflanguages.tutorial.page_first.header}
              txt={stringsoflanguages.tutorial.page_first.content}
            />
            <IntroPage
              img={require("../assets/onboardIconTwo.png")}
              header={stringsoflanguages.tutorial.page_second.header}
              txt={stringsoflanguages.tutorial.page_second.content}
            />
            <IntroPage
              img={require("../assets/onboardIconThree.png")}
              header={stringsoflanguages.tutorial.page_third.header}
              txt={stringsoflanguages.tutorial.page_third.content}
            />
          </Swiper>
        </View>
        <View style={[StylePanel.xyCenter, { flex: 1 }]}>
          {this.state.index === 2 ? (
            <TouchableOpacity
              style={[
                StylePanel.defaultBtn,
                { backgroundColor: Theme.colors.green }
              ]}
              onPress={() => this.swipe()}
            >
              <Text style={styles.sendBtnTxt}>
                {stringsoflanguages.tutorial.button.done}
              </Text>
            </TouchableOpacity>
          ) : (
            <Button
              text={stringsoflanguages.tutorial.button.next}
              onPress={() => this.swipe()}
              sendBtn={[
                StylePanel.defaultBtn,
                { backgroundColor: Theme.colors.yellow }
              ]}
              textStyle={StylePanel.sendBtnTxt}
            />
          )}
        </View>
        <Footer footerStyle={StylePanel.footerStyle} />
        <Modal
          onRequestClose={() => this.setState({ modalVisible: false })}
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modal}>
            <View style={styles.subModal}>
              <Text style={styles.modalHeader}>Выберите язык:</Text>

              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  this.state.lang === "kz"
                    ? { borderColor: Theme.colors.yellow }
                    : { borderColor: Theme.colors.gray74 }
                ]}
                onPress={() => this.changeLang("kz")}
              >
                <Image
                  resizeMode={"contain"}
                  style={styles.flag}
                  source={require("../assets/kz.png")}
                />
                <Text
                  style={[
                    styles.sendBtnTxt,
                    this.state.lang === "kz"
                      ? { color: Theme.colors.yellow }
                      : { color: Theme.colors.gray74 }
                  ]}
                >
                  Қaзaқшa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  this.state.lang === "ru"
                    ? { borderColor: Theme.colors.yellow }
                    : { borderColor: Theme.colors.gray74 }
                ]}
                onPress={() => this.changeLang("ru")}
              >
                <Image
                  resizeMode={"contain"}
                  style={styles.flag}
                  source={require("../assets/ru.png")}
                />
                <Text
                  style={[
                    styles.sendBtnTxt,
                    this.state.lang === "ru"
                      ? { color: Theme.colors.yellow }
                      : { color: Theme.colors.gray74 }
                  ]}
                >
                  Русский
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  this.state.lang === "eng"
                    ? { borderColor: Theme.colors.yellow }
                    : { borderColor: Theme.colors.gray74 }
                ]}
                onPress={() => this.changeLang("eng")}
              >
                <Image
                  resizeMode={"contain"}
                  style={styles.flag}
                  source={require("../assets/en.png")}
                />
                <Text
                  style={[
                    styles.sendBtnTxt,
                    this.state.lang === "eng"
                      ? { color: Theme.colors.yellow }
                      : { color: Theme.colors.gray74 }
                  ]}
                >
                  English
                </Text>
              </TouchableOpacity>
              <Button
                text="Готово"
                sendBtn={styles.sendBtnYellow}
                textStyle={StylePanel.sendBtnTxt}
                onPress={() => this.handleLangChange()}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  upView: {
    flex: 7
  },
  logoView: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center"
  },
  passive: {
    backgroundColor: "#444444"
  },
  active: {
    backgroundColor: "white"
  },
  dotStyle: {
    width: scale(5),
    height: scale(5),
    borderRadius: scale(5),
    marginHorizontal: scale(6),
    marginTop: scale(5)
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  subModal: {
    paddingTop: "8%",
    width: "80%",
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.checkboxGray
  },
  modalHeader: {
    color: "white",
    fontSize: Theme.fonts.sizes.h6,
    marginBottom: 15,
    textAlign: "center"
  },
  flag: {
    height: 20,
    width: 20,
    marginHorizontal: 10
  },
  sendBtn: {
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    height: 45,
    borderWidth: 1,
    marginHorizontal: "10%",
    marginVertical: 5
  },
  sendBtnYellow: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 45,
    backgroundColor: Theme.colors.yellow,
    marginHorizontal: "10%",
    marginVertical: 5
  },
  sendBtnTxt: {
    //color: Theme.colors.gray74,
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center"
  }
});
