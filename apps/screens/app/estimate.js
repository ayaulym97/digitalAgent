import React, { Component } from "react";
import {
  Alert,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import { base_url } from "../../configs/const";
import { Theme } from "../../configs/theme";
import { Button, Complaint, Footer, ModalDropdown } from "../../components";
import { StylePanel } from "../../configs/styles";
import stringsoflanguages from "../../locale";
const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true
  }
};
export default class Estimate extends Component {
  state = {
    selectedStar: 0,
    staffIncompetence: false,
    waitTime: false,
    terribleWaitRoom: false,
    invalid: false,
    complaint: [],
    comment: "",
    imgUrl: "",
    height: 0
  };

  cons = this.props.navigation.getParam("cons", "default");
  vedom = this.props.navigation.getParam("vedom", "default");
  componentDidMount() {
    console.log("complaint", this.vedom, this.cons._id);
  }
  handleStar = selectedStar => {
    this.setState({
      selectedStar
    });
  };
  handleSendBtn = () => {
    if (this.state.selectedStar === 0) {
      Alert.alert("Оцените учреждения по 5 шкaле перед отпрaвкой жaлобы");
    } else {
      this.postReview();
    }
  };
  async postReview() {
    const { selectedStar, imgUrl, comment, complaint } = this.state;
    const token = await AsyncStorage.getItem("id_token");
    const user_id = await AsyncStorage.getItem("user_id");
    console.log("USER_ID", user_id, "TOKEN_REVIEW", token);
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    console.log(
      "CON_ID",
      this.cons._id,
      "SELECTED_STAR",
      selectedStar,
      "IMG",
      imgUrl,
      "COMP",
      complaint,
      "COMMENT",
      comment,
      "Vedom",
      this.vedom
    );
    axios
      .post(
        base_url + "/api/review/add",
        {
          user_id: user_id,
          con_id: this.cons._id,
          rating: selectedStar,
          photos: [imgUrl],
          complaints: complaint,
          comment: comment,
          to: this.vedom
        },
        { headers: { Authorization: token } }
      )
      .then(response => {
        this.setState({
          review_id: response.data._id
        });
        console.log(this.state.review_id, "REVIEW78");
        if (currentHour >= 8 && currentHour <= 20) {
          if (selectedStar === 5) {
            this.props.navigation.navigate("Called");
          } else if (selectedStar === 4) {
            this.props.navigation.navigate("WannaBeContacted", {
              review: this.state.review_id
            });
          } else {
            this.props.navigation.navigate("WaitForResponse", {
              review: this.state.review_id
            });
          }
        } else {
          Alert.alert("Жалобы вне рабочее время не принимаются!");
          //  this.props.navigation.navigate("AfterEightPm");
        }
      })
      .catch(error => {
        console.log(error, 66);
      });
  }
  //takePhoto
  chooseImage = () => {
    ImagePicker.showImagePicker(options, response => {
      this.setState({
        avatarSource: response.uri
      });
      console.log("Response = ", response, new Date());

      console.log(this.state.avatarSource, 110);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        let formData = new FormData();
        formData.append("file", {
          uri: response.uri,
          name: "image.png",
          type: "image/jpeg"
        });
        axios
          .post(base_url + "/upload/image", formData)
          .then(response => {
            this.setState({
              imgUrl: response.data.data.url
            });

            console.log(this.state.imgUrl, new Date());
          })
          .catch(err => {
            console.log(err.response, 136);
          });
      }
    });
  };
  ///checkbox

  checkBoxPress = (type, value) => {
    const {
      staffIncompetence,
      complaint,
      invalid,
      waitTime,
      terribleWaitRoom
    } = this.state;
    switch (value) {
      case "Некомпетентность персонала":
        this.setState({
          staffIncompetence: !staffIncompetence
        });
        //P.S здесь должно было === но так как когда нажимаешь он еще false
        if (staffIncompetence != true) {
          complaint.push(value);
        } else {
          complaint.splice(complaint.findIndex(e => e === value), 1);
        }
        break;

      case "Время ожидания в очереди":
        this.setState({
          waitTime: !waitTime
        });
        if (waitTime != true) {
          complaint.push(value);
        } else {
          complaint.splice(complaint.findIndex(e => e === value), 1);
        }
        break;
      case "Ужасные условия в зале ожидания":
        this.setState({
          terribleWaitRoom: !terribleWaitRoom
        });
        if (terribleWaitRoom != true) {
          complaint.push(value);
        } else {
          complaint.splice(complaint.findIndex(e => e === value), 1);
        }

        break;
      case "Отсутствие условий для инвалидов":
        this.setState({
          invalid: !invalid
        });
        if (invalid != true) {
          complaint.push(value);
        } else {
          complaint.splice(complaint.findIndex(e => e === value), 1);
        }
        break;
      default:
        break;
    }
    console.log("complaint", complaint);
  };

  render() {
    const {
      avatarSource,
      selectedStar,
      staffIncompetence,
      waitTime,
      terribleWaitRoom,
      invalid
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
            <View style={styles.headerView}>
              <Text style={[StylePanel.centerTextHeader, styles.header]}>
                {stringsoflanguages.estimate.header}
              </Text>
              <Text style={styles.subHeader}>
                {this.cons.name || this.cons.name_of_agency}
              </Text>
              {this.cons.photo ? (
                <Image
                  style={{
                    width: "100%",
                    height: 100,
                    marginTop: 16,
                    resizeMode: "contain"
                  }}
                  source={{
                    uri: base_url + "/" + this.cons.photo
                  }}
                />
              ) : null}
              <StarRating
                maxStars={5}
                rating={selectedStar}
                starSize={35}
                containerStyle={styles.starContainer}
                fullStarColor={Theme.colors.yellow}
                emptyStarColor={Theme.colors.yellow}
                selectedStar={selectedStar => this.handleStar(selectedStar)}
              />
            </View>

            <View style={styles.contentView}>
              {selectedStar != 0 ? (
                <React.Fragment>
                  <React.Fragment>
                    {selectedStar === 5 ? null : ( // </Text> //   Что понравилось? // <Text style={styles.complaintHeader}>
                      <Text style={styles.complaintHeader}>
                        {selectedStar < 4
                          ? stringsoflanguages.estimate.disappoint
                          : stringsoflanguages.estimate.do_not_like}
                      </Text>
                    )}
                  </React.Fragment>
                  {selectedStar === 5 ? null : (
                    <Complaint
                      selectedStar={selectedStar}
                      staffIncompetence={staffIncompetence}
                      waitTime={waitTime}
                      terribleWaitRoom={terribleWaitRoom}
                      invalid={invalid}
                      checkBoxPress={(type, value) =>
                        this.checkBoxPress(type, value)
                      }
                    />
                  )}
                </React.Fragment>
              ) : null}
              <Text style={styles.commentTxt}>
                {stringsoflanguages.estimate.comment}
              </Text>

              <TextInput
                multiline={true}
                placeholder={stringsoflanguages.estimate.placeholder_txt}
                placeholderTextColor={Theme.colors.gray63}
                onChangeText={comment => this.setState({ comment })}
                value={this.state.comment}
                onContentSizeChange={event => {
                  this.setState({
                    height: event.nativeEvent.contentSize.height
                  });
                }}
                style={[
                  styles.commentInput,
                  { height: Math.max(80, this.state.height) }
                ]}
              />

              <TouchableOpacity
                style={styles.takePhoto}
                onPress={() => this.chooseImage()}
              >
                {this.state.imgUrl !== "" ? (
                  <React.Fragment>
                    {avatarSource ? (
                      <Image
                        source={{ uri: avatarSource }}
                        style={{
                          width: 40,
                          height: 40
                        }}
                        resizeMode="contain"
                      />
                    ) : (
                      <ActivityIndicator
                        size="large"
                        color={Theme.colors.yellow}
                      />
                    )}
                  </React.Fragment>
                ) : (
                  <Icon
                    name="ios-camera"
                    size={35}
                    color={Theme.colors.yellow}
                    style={{
                      paddingRight: 16
                    }}
                  />
                )}
                <Text style={styles.takePhotoTxt}>
                  {stringsoflanguages.estimate.attach_photo}
                </Text>
              </TouchableOpacity>
              <Button
                text={stringsoflanguages.send_btn_txt}
                sendBtn={StylePanel.sendBtn}
                textStyle={StylePanel.sendBtnTxt}
                onPress={() => this.handleSendBtn()}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <Footer footerStyle={[styles.footerStyle]} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bcground
  },
  headerView: {
    flex: 1
  },
  header: {
    fontSize: Theme.fonts.sizes.h1,
    marginTop: 25
  },
  subHeader: {
    width: "92%",
    color: "white",
    textAlign: "center",
    marginHorizontal: "4%",
    fontSize: Theme.fonts.sizes.p5,
    marginTop: 10
  },
  starContainer: {
    marginVertical: 20,
    width: "60%",
    marginHorizontal: "20%"
  },
  contentView: {
    flex: 2,
    backgroundColor: Theme.colors.checkboxGray,
    marginHorizontal: "4%"
  },
  commentTxt: {
    width: "90%",
    marginHorizontal: "4%",
    color: Theme.colors.gray63,
    fontSize: Theme.fonts.sizes.p6,
    marginTop: 16,
    marginBottom: 10
  },
  takePhotoTxt: {
    marginVertical: 24,
    color: "white",
    fontSize: Theme.fonts.sizes.p6
  },
  commentInput: {
    color: "white",
    marginBottom: 10,
    fontSize: Theme.fonts.sizes.p6,
    backgroundColor: Theme.colors.bcground,
    paddingLeft: 10,
    marginHorizontal: "4%",
    borderColor: Theme.colors.gray63,
    borderWidth: 1
  },
  takePhoto: {
    marginHorizontal: "4%",
    flexDirection: "row",
    alignItems: "center"
  },
  complaintHeader: {
    textAlign: "center",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.h6,
    fontWeight: "100",
    marginTop: 24,
    marginBottom: 14
  },
  footerStyle: {
    height: 45,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%"
  }
});
